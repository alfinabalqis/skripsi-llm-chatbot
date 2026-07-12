import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { findDecision } from './decisionTree.js';
import { loadMetricsSnapshot } from '../functions/metrics.js';
import { buildFeatureArray, VALID_JENIS_SIGNER, PROVIDERS } from '../functions/features.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const SNAPSHOT_PATH = path.join(__dirname, '..', 'data', 'provider_metrics_snapshot.csv');

const docsDir = path.join(__dirname, '..', 'docs');

const DOC_META = [
  {
    file: 'FAQ_DSA_clean.md',
    keywords: ['error', 'aktivasi', 'terdaftar', 'pendaftaran', 'provider', 'email', 'status', 'gagal', 'support', 'perbaikan', 'faq', 'masalah', 'troubble'],
    always: true,
  },
  {
    file: 'Manual_Book_DSA_User_clean.md',
    keywords: ['cara', 'panduan', 'manual', 'tutorial', 'langkah', 'login', 'password', 'kata sandi', 'forgot', 'akun', 'organisasi', 'wna', 'passport'],
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
    keywords: ['dsa', 'pln', 'icon plus', 'latar belakang', 'overview', 'tentang', 'transfer of knowledge', 'pain point', 'solusi', 'digitalisasi'],
  },
];

// Pre-load all docs into memory
const docContents = {};
for (const meta of DOC_META) {
  const label = meta.file.replace(/\.md$/, '').replace(/-/g, ' ').toUpperCase();
  const content = fs.readFileSync(path.join(docsDir, meta.file), 'utf-8');
  docContents[meta.file] = `--- ${label} ---\n${content}`;
}

/**
 * Filter dokumen berdasarkan pertanyaan user.
 * Hanya dokumen yang keyword-nya match yang diikutsertakan.
 * Dokumen dengan `always: true` selalu disertakan.
 * Minimal 1 dokumen selalu ada (fallback: FAQ).
 */
function filterDocsByQuestion(question) {
  const q = question.toLowerCase();
  const selected = [];

  for (const meta of DOC_META) {
    if (meta.always) {
      selected.push(docContents[meta.file]);
      continue;
    }
    const matched = meta.keywords.some(kw => q.includes(kw));
    if (matched) selected.push(docContents[meta.file]);
  }

  if (selected.length === 0) selected.push(docContents['FAQ_DSA_clean.md']);

  return selected.join('\n\n');
}

// Tool ini memaksa LLM memanggil model C4.5 yang sesungguhnya, bukan
// menebak sendiri, setiap kali user bertanya soal rekomendasi vendor.
const tools = [
  {
    type: 'function',
    function: {
      name: 'get_vendor_recommendation',
      description:
        'Menjalankan model C4.5 untuk mendapatkan rekomendasi vendor PSrE yang sesungguhnya berdasarkan jenis layanan dan vendor yang terdaftar. WAJIB dipanggil setiap kali user menanyakan vendor mana yang direkomendasikan/sebaiknya dipilih. Jangan menjawab pertanyaan rekomendasi tanpa memanggil fungsi ini.',
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
      },
    },
  },
];

function runRecommendation(jenisSigner, providerTerdaftar) {
  const metricsSnapshot = loadMetricsSnapshot(SNAPSHOT_PATH);
  const { featureArray, metricsUsed } = buildFeatureArray(jenisSigner, providerTerdaftar, metricsSnapshot);
  const recommendedProvider = findDecision(featureArray);
  return { recommended_provider: recommendedProvider, metrics_used: metricsUsed };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const question = req.method === 'GET' ? req.query.question : req.body.question;
    if (!question) return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });

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
      { role: 'user', content: question },
    ];

    let aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages,
      tools,
      temperature: 0,
    });

    let responseMessage = aiResponse.choices[0].message;

    // Jika LLM meminta memanggil fungsi, jalankan C4.5 sungguhan lalu
    // kirim hasilnya kembali supaya jawaban akhir tidak hallucinate
    if (responseMessage.tool_calls) {
      messages.push(responseMessage);

      for (const toolCall of responseMessage.tool_calls) {
        const args = JSON.parse(toolCall.function.arguments);
        const result = runRecommendation(args.jenis_signer, args.provider_terdaftar);

        messages.push({
          role: 'tool',
          tool_call_id: toolCall.id,
          content: JSON.stringify(result),
        });
      }

      aiResponse = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        temperature: 0,
      });
      responseMessage = aiResponse.choices[0].message;
    }

    return res.status(200).json({
      question,
      answer: responseMessage.content,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}