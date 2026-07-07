import { OpenAI } from 'openai';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const docsDir = path.join(__dirname, '..', 'docs');
const docFiles = [
  'Manual_Book_DSA_User_clean.md',
  'FAQ_DSA_clean.md',
  'registrasi-portal-layanan-dsa.md',
  'registrasi-provider-pada-portal-layanan-dsa.md',
  'proses-top-up-saldo-pada-portal-layanan-dsa.md',
  'proses-e-sign-dan-e-materai-pada-portal-layanan-dsa.md',
  'ppt-tok-dsa.md',
];

const docsContent = docFiles
  .map(f => {
    const label = f.replace(/\.md$/, '').replace(/-/g, ' ').toUpperCase();
    const content = fs.readFileSync(path.join(docsDir, f), 'utf-8');
    return `--- ${label} ---\n${content}`;
  })
  .join('\n\n');

const DOCS_CONTEXT = `Berikut adalah dokumentasi Digital Signature Aggregator (DSA):

${docsContent}`;

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const question = req.method === 'GET' ? req.query.question : req.body.question;
    if (!question) return res.status(400).json({ error: 'Pertanyaan tidak boleh kosong.' });

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: `Anda adalah asisten virtual untuk platform Digital Signature Aggregator (DSA) PT PLN Icon Plus.
Jawab pertanyaan user berdasarkan dokumentasi berikut. Jika informasi spesifik tidak ditemukan, berikan informasi umum yang relevan dari dokumentasi. Jika benar-benar tidak ada informasi sama sekali, katakan tidak tahu.

${DOCS_CONTEXT}`
        },
        { role: 'user', content: question }
      ]
    });

    return res.status(200).json({
      question,
      answer: aiResponse.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
