import { OpenAI } from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';
import { findDecision } from './decisionTree.js';
import { loadMetricsSnapshot } from '../functions/metrics.js';
import { buildFeatureArray, VALID_JENIS_SIGNER, PROVIDERS } from '../functions/features.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SNAPSHOT_PATH = path.join(__dirname, '..', 'data', 'provider_metrics_snapshot.csv');

async function generateReasoning(recommendedProvider, jenisSigner, metricsUsed) {
  const metricsSummary = Object.entries(metricsUsed)
    .filter(([, m]) => m.registered)
    .map(([provider, m]) => (
      `${provider}: success rate ${(m.success_rate * 100).toFixed(1)}%, SLA rata-rata ${m.avg_sla_ms.toFixed(0)}ms`
    ))
    .join('; ');

  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: `Anda adalah asisten yang menjelaskan hasil rekomendasi vendor PSrE (Penyelenggara Sertifikasi Elektronik) pada platform Digital Signature Aggregator PT PLN Icon Plus.

Sistem sudah menentukan provider yang direkomendasikan menggunakan algoritma C4.5 berdasarkan data performa historis (success rate dan SLA/execution time). Tugas Anda HANYA merangkai alasan singkat (1-2 kalimat) mengapa provider tersebut direkomendasikan, berdasarkan data metrik yang diberikan. JANGAN mengubah atau membantah provider yang sudah ditentukan sistem. Gunakan gaya bahasa singkat, jelas, dan meyakinkan, mirip contoh berikut:

"Success rate 97% dan SLA tercepat (~350ms) untuk sign + e-materai dibanding provider lain yang terdaftar."`,
      },
      {
        role: 'user',
        content: `Provider yang direkomendasikan: ${recommendedProvider}
Jenis layanan: ${jenisSigner}
Data metrik provider yang terdaftar: ${metricsSummary}

Buatkan kalimat alasan rekomendasinya.`,
      },
    ],
  });

  return aiResponse.choices[0].message.content;
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const jenisSigner = req.method === 'GET' ? req.query.jenis_signer : req.body.jenis_signer;
    const providerTerdaftarRaw = req.method === 'GET' ? req.query.provider_terdaftar : req.body.provider_terdaftar;

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

    // 1. Bangun fitur & jalankan decision tree (murni JS, tanpa service lain)
    const metricsSnapshot = loadMetricsSnapshot(SNAPSHOT_PATH);
    const { featureArray, metricsUsed } = buildFeatureArray(jenisSigner, providerTerdaftar, metricsSnapshot);
    const recommendedProvider = findDecision(featureArray);

    // 2. Minta LLM merangkai alasannya dalam bahasa natural
    const reasoning = await generateReasoning(recommendedProvider, jenisSigner, metricsUsed);

    return res.status(200).json({
      recommended_provider: recommendedProvider,
      reasoning,
      jenis_signer: jenisSigner,
      provider_terdaftar: providerTerdaftar,
      metrics_used: metricsUsed,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}