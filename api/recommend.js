// LLM rekomendasi otomatis - recommend.js
// CATATAN BREAKING CHANGE: endpoint tidak lagi menerima GET. Pastikan FE
// memanggil dengan POST + JSON body.

import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { findDecision } from './decisionTree.js';
import { loadMetricsSnapshot } from '../functions/metrics.js';
import { buildFeatureArray, VALID_JENIS_SIGNER, PROVIDERS } from '../functions/features.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [PATCH] Timeout 30 detik, konsisten dengan ask.js.
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 30000 });

const SNAPSHOT_PATH = path.join(__dirname, '..', 'data', 'provider_metrics_snapshot.csv');

// [PATCH] Whitelist origin, identik dengan ask.js.
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'http://dev-digital-sign.air.id',
  'https://digital-sign.air.id',
];

// [PATCH] Rate limiting sederhana per IP (in-memory), identik dengan ask.js.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;
const rateBuckets = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const bucket = rateBuckets.get(ip) || [];
  const recent = bucket.filter(ts => now - ts < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    rateBuckets.set(ip, recent);
    return true;
  }
  recent.push(now);
  rateBuckets.set(ip, recent);
  if (rateBuckets.size > 10_000) rateBuckets.clear();
  return false;
}

async function generateReasoning(recommendedProvider, jenisSigner, metricsUsed, rulePath) {
  const metricsSummary = Object.entries(metricsUsed)
    .filter(([, m]) => m.registered)
    .map(([provider, m]) => (
      `${provider}: success rate ${(m.success_rate * 100).toFixed(1)}%, SLA rata-rata ${m.avg_sla_ms.toFixed(0)}ms`
    ))
    .join('; ');

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    // [PATCH] temperature rendah agar gaya penjelasan konsisten antar-request;
    // max_tokens membatasi panjang keluaran (1-2 kalimat) dan biaya.
    temperature: 0.3,
    max_tokens: 150,
    messages: [
      {
        role: 'system',
        content: `Anda adalah asisten yang menjelaskan hasil rekomendasi vendor PSrE (Penyelenggara Sertifikasi Elektronik) pada platform Digital Signature Aggregator PT PLN Icon Plus.

Sistem sudah menentukan provider yang direkomendasikan menggunakan algoritma C4.5 berdasarkan data performa historis (success rate dan SLA/execution time). Anda juga diberikan jalur aturan if-then pada pohon keputusan yang dilalui hingga menghasilkan rekomendasi tersebut.

Tugas Anda HANYA merangkai alasan singkat (1-2 kalimat) mengapa provider tersebut direkomendasikan, berdasarkan data metrik dan jalur aturan yang diberikan. JANGAN mengubah atau membantah provider yang sudah ditentukan sistem. Gunakan gaya bahasa singkat, jelas, dan meyakinkan, mirip contoh berikut:

"Success rate 97% dan SLA tercepat (~350ms) untuk sign + e-materai dibanding provider lain yang terdaftar."`,
      },
      {
        role: 'user',
        content: `Provider yang direkomendasikan: ${recommendedProvider}
Jenis layanan: ${jenisSigner}
Jalur aturan C4.5 yang dilalui: ${rulePath.join(' DAN ')}
Data metrik provider yang terdaftar: ${metricsSummary}

Buatkan kalimat alasan rekomendasinya.`,
      },
    ],
  });

  return aiResponse.choices[0].message.content;
}

export default async function handler(req, res) {
  // [PATCH] Hanya origin di whitelist yang mendapat header CORS.
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // [PATCH] Hanya POST — parameter tidak lagi tercatat di access log via query string.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Gunakan POST.' });
  }

  // [PATCH] Rate limiting per IP sebelum proses apa pun.
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar lagi.' });
  }

  try {
    const jenisSigner = req.body?.jenis_signer;
    const providerTerdaftarRaw = req.body?.provider_terdaftar;

    const providerTerdaftar = Array.isArray(providerTerdaftarRaw)
      ? providerTerdaftarRaw
      : typeof providerTerdaftarRaw === 'string'
        ? providerTerdaftarRaw.split(',').map(p => p.trim())
        : providerTerdaftarRaw;

    if (!jenisSigner || !VALID_JENIS_SIGNER.includes(jenisSigner)) {
      return res.status(400).json({
        error: `jenis_signer wajib diisi, salah satu dari: ${VALID_JENIS_SIGNER.join(', ')}`,
      });
    }

    if (!Array.isArray(providerTerdaftar) || providerTerdaftar.length === 0) {
      return res.status(400).json({ error: 'provider_terdaftar wajib diisi dan tidak boleh kosong.' });
    }

    const unknownProviders = providerTerdaftar.filter(p => !PROVIDERS.includes(p));
    if (unknownProviders.length > 0) {
      return res.status(400).json({
        error: `Provider tidak dikenali: ${unknownProviders.join(', ')}. Provider valid: ${PROVIDERS.join(', ')}`,
      });
    }

    // 1. Bangun fitur & jalankan decision tree (murni JS, tanpa service lain).
    //    loadMetricsSnapshot sudah melakukan caching internal di module scope.
    const metricsSnapshot = loadMetricsSnapshot(SNAPSHOT_PATH);
    const { featureArray, metricsUsed } = buildFeatureArray(jenisSigner, providerTerdaftar, metricsSnapshot);

    // [PATCH] Ambil label DAN jalur aturan dari pohon keputusan.
    const { provider: recommendedProvider, rulePath } = findDecision(featureArray);

    // 2. Minta LLM merangkai alasannya dalam bahasa natural.
    //    [PATCH] Jika pemanggilan LLM gagal, sistem tetap mengembalikan hasil
    //    C4.5 dengan fallback penjelasan berbasis rule path — rekomendasi
    //    tidak boleh gagal hanya karena layanan penjelasan tidak tersedia.
    let reasoning;
    try {
      reasoning = await generateReasoning(recommendedProvider, jenisSigner, metricsUsed, rulePath);
    } catch (err) {
      console.error('generateReasoning gagal:', err);
      reasoning = `Direkomendasikan berdasarkan aturan pohon keputusan C4.5: ${rulePath.join(' DAN ')}.`;
    }

    return res.status(200).json({
      recommended_provider: recommendedProvider,
      rule_path: rulePath, // [PATCH] aturan if-then yang menjadi dasar rekomendasi
      reasoning,
      jenis_signer: jenisSigner,
      provider_terdaftar: providerTerdaftar,
      metrics_used: metricsUsed,
    });

  } catch (error) {
    // [PATCH] Detail error hanya di log server, tidak dikirim ke client.
    console.error('Recommend handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}