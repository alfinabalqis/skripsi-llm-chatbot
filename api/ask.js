import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findDecision } from './decisionTree.js';
import { loadMetricsSnapshot } from '../functions/metrics.js';
import { buildFeatureArray, VALID_JENIS_SIGNER, PROVIDERS } from '../functions/features.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// [FIX] Timeout 30 detik agar request yang menggantung tidak memakan
// durasi maksimal serverless function.
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY, timeout: 30000 });

const SNAPSHOT_PATH = path.join(__dirname, '..', 'data', 'provider_metrics_snapshot.csv');
const docsDir = path.join(__dirname, '..', 'docs');

// [FIX] Origin dibatasi ke whitelist domain FE, bukan wildcard '*'.
// Tanpa trailing slash, tanpa path, dan skema (http/https) harus sama
// persis dengan yang muncul di address bar browser.
const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:8080',
  'https://dev-digital-sign.air.id',
  'https://digital-sign.air.id', // produksi nanti
];

// [FIX] Batas panjang pertanyaan untuk mencegah pembengkakan token cost.
const MAX_QUESTION_LENGTH = 1000;

// [FIX] Batas maksimal ronde tool call agar loop tidak berjalan tanpa henti
// dan client tidak pernah menerima answer: null.
const MAX_TOOL_ROUNDS = 3;

const DOC_META = [
  {
    file: 'FAQ_DSA_clean.md',
    keywords: ['error', 'aktivasi', 'terdaftar', 'pendaftaran', 'provider', 'email', 'status', 'gagal', 'support', 'perbaikan', 'faq', 'masalah', 'trouble', 'kendala'], // [FIX] typo 'troubble' + tambah 'kendala'
    always: true,
  },
  {
    file: 'Manual_Book_DSA_User_clean.md',
    keywords: ['cara', 'panduan', 'manual', 'tutorial', 'langkah', 'login', 'password', 'kata sandi', 'forgot', 'akun', 'organisasi', 'wna', 'passport'],
    // Manual book mencakup materi dokumen turunan di bawah; lihat 'supersedes'.
    supersedes: [
      'registrasi-portal-layanan-dsa.md',
      'registrasi-provider-pada-portal-layanan-dsa.md',
      'proses-top-up-saldo-pada-portal-layanan-dsa.md',
    ],
  },
  {
    file: 'registrasi-portal-layanan-dsa.md',
    keywords: ['registrasi', 'daftar', 'portal', 'formulir', 'otp', 'verifikasi', 'aktivasi akun', 'halaman registrasi'],
  },
  {
    file: 'registrasi-provider-pada-portal-layanan-dsa.md',
    keywords: ['provider', 'psre', 'penyelenggara sertifikat', 'add provider', 'sertifikat', 'settings', 'sidebar'],
  },
  {
    file: 'proses-top-up-saldo-pada-portal-layanan-dsa.md',
    keywords: ['top up', 'topup', 'top-up', 'saldo', 'balance', 'deposit', 'pembayaran', 'qris', 'virtual account', 'e-wallet', 'nominal'],
  },
  {
    file: 'proses-e-sign-dan-e-materai-pada-portal-layanan-dsa.md',
    keywords: ['e-sign', 'esign', 'e-materai', 'ematerai', 'tanda tangan', 'signature', 'dokumen', 'sign', 'stamp', 'upload', 'unggah'],
  },
  {
    file: 'ppt-tok-dsa.md',
    keywords: ['dsa', 'pln', 'icon plus', 'latar belakang', 'overview', 'tentang', 'transfer of knowledge', 'pain point', 'solusi', 'digitalisasi', 'harga', 'biaya', 'price', 'tarif', 'cost', 'fee', 'margin', 'registrasi', 'signing', 'sign', 'e-materai', 'otp', 're-registrasi'],
  },
];

// [FIX] Pre-load docs dengan error handling — jika ada file hilang setelah
// re-cleaning, error saat deploy langsung menyebutkan file mana yang gagal.
const docContents = {};
for (const meta of DOC_META) {
  const label = meta.file.replace(/\.md$/, '').replace(/-/g, ' ').toUpperCase();
  try {
    const content = fs.readFileSync(path.join(docsDir, meta.file), 'utf-8');
    docContents[meta.file] = `--- ${label} ---\n${content}`;
  } catch (err) {
    throw new Error(`Gagal memuat dokumen "${meta.file}" dari ${docsDir}: ${err.message}`);
  }
}

// [FIX] Cache metrics snapshot di module scope, sama seperti docContents,
// alih-alih membaca dari disk setiap request.
let metricsSnapshotCache = null;
function getMetricsSnapshot() {
  if (!metricsSnapshotCache) {
    metricsSnapshotCache = loadMetricsSnapshot(SNAPSHOT_PATH);
  }
  return metricsSnapshotCache;
}

// [FIX] Rate limiting sederhana per IP (in-memory).
// Catatan: di serverless, memory hanya bertahan selama instance warm dan
// tidak dibagi antar-instance. Untuk proteksi penuh, ganti dengan store
// terpusat seperti @upstash/ratelimit (Redis).
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 menit
const RATE_LIMIT_MAX = 10; // maks 10 request per IP per menit
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
  // Bersihkan map agar tidak tumbuh tanpa batas
  if (rateBuckets.size > 10_000) rateBuckets.clear();
  return false;
}

/**
 * Filter dokumen berdasarkan pertanyaan user.
 * - Match keyword memakai word boundary agar 'sign' tidak cocok dengan 'design'. [FIX]
 * - Dokumen 'always: true' selalu disertakan.
 * - Dokumen turunan yang sudah tercakup manual book (supersedes) tidak
 *   dikirim dobel, untuk menghemat token. [FIX]
 * - Fallback: FAQ.
 */
function filterDocsByQuestion(question) {
  const q = question.toLowerCase();

  const matchKeyword = (kw) => {
    // Escape karakter regex pada keyword (mis. 'top-up')
    const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(q);
  };

  const matchedFiles = new Set();
  for (const meta of DOC_META) {
    if (meta.always || meta.keywords.some(matchKeyword)) {
      matchedFiles.add(meta.file);
    }
  }

  // Buang dokumen turunan jika dokumen induknya juga terpilih
  for (const meta of DOC_META) {
    if (matchedFiles.has(meta.file) && meta.supersedes) {
      for (const child of meta.supersedes) matchedFiles.delete(child);
    }
  }

  if (matchedFiles.size === 0) matchedFiles.add('FAQ_DSA_clean.md');

  return [...matchedFiles].map(f => docContents[f]).join('\n\n');
}

const tools = [
  {
    type: 'function',
    function: {
      name: 'get_vendor_recommendation',
      description:
        'Menjalankan model C4.5 untuk mendapatkan rekomendasi vendor PSrE yang sesungguhnya berdasarkan jenis layanan dan vendor yang terdaftar. WAJIB dipanggil setiap kali user menanyakan vendor mana yang direkomendasikan/sebaiknya dipilih. Jangan menjawab pertanyaan rekomendasi tanpa memanggil fungsi ini.',
      // [FIX] strict: true mengaktifkan structured outputs sehingga OpenAI
      // menjamin argumen sesuai schema (termasuk enum).
      strict: true,
      parameters: {
        type: 'object',
        properties: {
          jenis_signer: { type: 'string', enum: VALID_JENIS_SIGNER },
          provider_terdaftar: {
            type: 'array',
            items: { type: 'string', enum: PROVIDERS },
          },
        },
        required: ['jenis_signer', 'provider_terdaftar'],
        additionalProperties: false,
      },
    },
  },
];

// [FIX] Validasi argumen di sisi server sebagai lapisan kedua —
// jangan pernah percaya output LLM sepenuhnya.
function validateRecommendationArgs(args) {
  return (
    args &&
    typeof args.jenis_signer === 'string' &&
    VALID_JENIS_SIGNER.includes(args.jenis_signer) &&
    Array.isArray(args.provider_terdaftar) &&
    args.provider_terdaftar.length > 0 &&
    args.provider_terdaftar.every(p => PROVIDERS.includes(p))
  );
}

function runRecommendation(jenisSigner, providerTerdaftar) {
  const metricsSnapshot = getMetricsSnapshot();
  const { featureArray, metricsUsed } = buildFeatureArray(jenisSigner, providerTerdaftar, metricsSnapshot);
  const recommendedProvider = findDecision(featureArray);
  return { recommended_provider: recommendedProvider, metrics_used: metricsUsed };
}

// Mengeksekusi satu tool call dengan validasi; selalu mengembalikan
// tool message agar percakapan tetap valid meski argumen bermasalah.
function executeToolCall(toolCall) {
  let args;
  try {
    args = JSON.parse(toolCall.function.arguments);
  } catch {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ error: 'Argumen tidak valid (bukan JSON). Tanyakan kembali jenis layanan dan vendor terdaftar kepada user.' }),
    };
  }

  if (!validateRecommendationArgs(args)) {
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({
        error: 'Parameter di luar nilai yang diizinkan. Tanyakan kembali kepada user.',
        jenis_signer_valid: VALID_JENIS_SIGNER,
        provider_valid: PROVIDERS,
      }),
    };
  }

  try {
    const result = runRecommendation(args.jenis_signer, args.provider_terdaftar);
    return { role: 'tool', tool_call_id: toolCall.id, content: JSON.stringify(result) };
  } catch (err) {
    console.error('runRecommendation gagal:', err);
    return {
      role: 'tool',
      tool_call_id: toolCall.id,
      content: JSON.stringify({ error: 'Model rekomendasi sedang tidak dapat diakses. Sarankan user menghubungi tim support.' }),
    };
  }
}

export default async function handler(req, res) {
  // [FIX] Hanya origin yang ada di whitelist yang mendapat header CORS;
  // origin asing tidak mendapat header sama sekali (diblokir browser).
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS'); // [FIX] GET dihapus
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  // [FIX] Hanya POST — pertanyaan user tidak lagi tercatat di access log
  // via query string.
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Gunakan POST.' });
  }

  // [FIX] Rate limiting per IP sebelum menyentuh OpenAI.
  const ip =
    (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (isRateLimited(ip)) {
    return res.status(429).json({ error: 'Terlalu banyak permintaan. Coba lagi sebentar lagi.' });
  }

  try {
    const question = req.body?.question;

    // [FIX] Validasi tipe dan panjang input.
    if (typeof question !== 'string' || question.trim().length === 0) {
      return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });
    }
    if (question.length > MAX_QUESTION_LENGTH) {
      return res.status(400).json({ error: `Pertanyaan maksimal ${MAX_QUESTION_LENGTH} karakter.` });
    }

    const relevantDocs = filterDocsByQuestion(question);

    const messages = [
      {
        role: 'system',
        content: `Anda adalah asisten virtual untuk platform Digital Signature Aggregator (DSA) PT PLN Icon Plus.

ATURAN KETAT:
1. Jawab HANYA berdasarkan dokumentasi yang diberikan di bawah. JANGAN mengarang atau menambah informasi yang tidak ada di dokumentasi.
2. Jika informasi yang diminta tidak ditemukan dalam dokumentasi, katakan: "Maaf, saya tidak menemukan informasi tersebut dalam dokumentasi yang tersedia. Silakan hubungi tim support untuk bantuan lebih lanjut."
3. Jangan pernah menebak atau mengarang jawaban. Lebih baik mengatakan tidak tahu daripada memberikan informasi yang tidak akurat.

Untuk pertanyaan rekomendasi/vendor PSrE, WAJIB memanggil fungsi get_vendor_recommendation. Jika jenis layanan atau vendor terdaftar belum disebutkan, tanyakan dulu.

Dokumentasi:
${relevantDocs}`,
      },
      { role: 'user', content: question.trim() },
    ];

    let aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools,
      temperature: 0,
    });

    let responseMessage = aiResponse.choices[0].message;

    // [FIX] Loop tool call dengan batas ronde, bukan hanya satu ronde,
    // agar answer tidak pernah null jika model meminta tool berkali-kali.
    let rounds = 0;
    while (responseMessage.tool_calls && rounds < MAX_TOOL_ROUNDS) {
      rounds += 1;
      messages.push(responseMessage);

      for (const toolCall of responseMessage.tool_calls) {
        messages.push(executeToolCall(toolCall));
      }

      aiResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        tools,
        temperature: 0,
      });
      responseMessage = aiResponse.choices[0].message;
    }

    // [FIX] Fallback jika content tetap kosong setelah batas ronde tercapai.
    const answer =
      responseMessage.content ??
      'Maaf, terjadi kendala saat memproses jawaban. Silakan coba lagi atau hubungi tim support.';

    return res.status(200).json({ question, answer });
  } catch (error) {
    // [FIX] Detail error hanya di log server, tidak dikirim ke client.
    console.error('Chatbot handler error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}