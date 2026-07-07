# DSA LLM Backend

Backend serverless untuk platform **Digital Signature Aggregator (DSA) PT PLN Icon Plus** yang menggunakan **OpenAI GPT-4o-mini** untuk memberikan rekomendasi vendor tanda tangan digital dan menjawab pertanyaan pengguna.

## Fitur

- **Rekomendasi Vendor** — Menerima input bahasa alami, mengekstrak parameter kebutuhan (jenis layanan, budget, jenis dokumen) via LLM, lalu memprosesnya dengan **pohon keputusan C4.5** untuk merekomendasikan vendor terbaik (Vinotek, Peruri, Xignature, Privy).
- **Q&A Chatbot** — Menjawab pertanyaan seputar platform DSA berdasarkan dokumentasi resmi yang terdiri dari Manual Book, FAQ, dan panduan penggunaan portal.
- **Serverless** — Dibangun di atas Vercel Functions untuk skala otomatis tanpa manajemen server.

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET/POST` | `/api/ask` | Tanya jawab seputar DSA |
| `GET/POST` | `/api/recommend` | Rekomendasi vendor digital signature |

### `/api/recommend`

**Input:**
```json
{ "message": "Saya ingin sign e-materai dengan budget 20rb" }
```

**Response:**
```json
{
  "input_terekstraksi": {
    "jenis_layanan": "sign-ematerai",
    "harga_maksimal": 20000,
    "jenis_dokumen": "Umum"
  },
  "rekomendasi": "Vinotek",
  "penjelasan_ilmiah": "Berdasarkan pola historis transaksi DSA, Vinotek mendominasi volume transaksi sign-ematerai..."
}
```

### `/api/ask`

**Input:**
```json
{ "question": "Bagaimana cara upload dokumen?" }
```

**Response:**
```json
{
  "question": "Bagaimana cara upload dokumen?",
  "answer": "Untuk mengupload dokumen... [jawaban berdasarkan dokumentasi]"
}
```

## Tech Stack

- **Runtime:** Node.js (ESM)
- **Platform:** Vercel (Serverless Functions)
- **AI:** OpenAI GPT-4o-mini
- **Decision Engine:** C4.5 Decision Tree

## Lingkungan

Buat file `.env`:

```
OPENAI_API_KEY=sk-your-key-here
```

## Pengembangan Lokal

```bash
npx vercel dev
```

## Struktur Proyek

```
api/
  ask.js          # Q&A chatbot
  recommend.js    # Rekomendasi vendor
data/
  rules.js        # Pohon keputusan C4.5
docs/             # Dokumentasi & knowledge base
  Manual_Book_DSA_User_clean.md
  FAQ_DSA_clean.md
  registrasi-portal-layanan-dsa.md
  registrasi-provider-pada-portal-layanan-dsa.md
  proses-top-up-saldo-pada-portal-layanan-dsa.md
  proses-e-sign-dan-e-materai-pada-portal-layanan-dsa.md
  ppt-tok-dsa.md
```

## Vendor yang Didukung

| Vendor | Layanan |
|--------|---------|
| Vinotek | sign-ematerai (≥ Rp15.000), default |
| Peruri | sign-ematerai (< Rp15.000) |
| Xignature | signing (dokumen internal/Nota Dinas) |
| Privy | signing (dokumen eksternal/umum) |
