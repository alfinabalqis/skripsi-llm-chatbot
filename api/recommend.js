// api/recommend.js
import { OpenAI } from 'openai';
import { evaluateC45Tree } from '../data/rules.js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  // Atur CORS agar Frontend bisa mengakses API
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  try {
    const message = req.method === 'GET' ? req.query.message : req.body.message;
    if (!message) return res.status(400).json({ error: 'Input pesan tidak boleh kosong.' });

    // 1. LLM STEP: Entity Extraction (Mentransformasikan bahasa alami menjadi parameter terstruktur)
    const extractionPrompt = `
      Anda adalah Entity Extraction Engine untuk platform Digital Signature Aggregator (DSA) PT PLN Icon Plus.
      Tugas Anda adalah mengekstrak kebutuhan pengguna dari teks bebas menjadi parameter data terstruktur.
      
      Input pengguna: "${message}"
      
      Ekstrak ke dalam format JSON dengan key berikut (jika tidak disebutkan di teks, isi dengan nilai default):
      - jenis_layanan: pilih antara "signing" atau "sign-ematerai"
      - harga_maksimal: angka batasan anggaran (default: 20000)
      - jenis_dokumen: jenis dokumen yang disebutkan (misal: "Nota Dinas", "Kontrak Vendor", dll. Default: "Umum")
    `;

    const aiResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: extractionPrompt }],
      response_format: { type: "json_object" } // Mengunci output wajib JSON
    });

    const extractedAttributes = JSON.parse(aiResponse.choices[0].message.content);

    // 2. DECISION ENGINE STEP: Eksekusi Logika Pohon Keputusan C4.5
    // Sesuai batasan skripsi Anda, LLM tidak mengambil keputusan akhir. Keputusan mutlak di tangan C4.5.
    const finalRecommendation = evaluateC45Tree(extractedAttributes);

    // 3. RESPONSE: Kembalikan hasil parameter terstruktur beserta hasil keputusan C4.5 ke frontend
    return res.status(200).json({
      input_terekstraksi: extractedAttributes,
      rekomendasi: finalRecommendation.vendor,
      penjelasan_ilmiah: finalRecommendation.alasan_c45
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}