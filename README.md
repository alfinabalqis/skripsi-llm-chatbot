# DSA LLM Backend

Backend serverless untuk platform **Digital Signature Aggregator (DSA) PT PLN Icon Plus** menggunakan **OpenAI GPT-4o-mini** sebagai Q&A chatbot yang menjawab pertanyaan seputar platform DSA berdasarkan dokumentasi resmi.

## Fitur

- **Q&A Chatbot** — Menjawab pertanyaan seputar platform DSA berdasarkan dokumentasi resmi (Manual Book, FAQ, dan panduan portal).
- **Serverless** — Dibangun di atas Vercel Functions untuk skala otomatis tanpa manajemen server.

## API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| `GET/POST` | `/api/ask` | Tanya jawab seputar DSA |

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
docs/             # Dokumentasi & knowledge base
  Manual_Book_DSA_User_clean.md
  FAQ_DSA_clean.md
  registrasi-portal-layanan-dsa.md
  registrasi-provider-pada-portal-layanan-dsa.md
  proses-top-up-saldo-pada-portal-layanan-dsa.md
  proses-e-sign-dan-e-materai-pada-portal-layanan-dsa.md
  ppt-tok-dsa.md
```
