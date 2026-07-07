---
title: "Frequently Asked Questions Digital Signature Aggregator"
version: "1.0"
document_type: "FAQ"
source_file: "FAQ DSA .pdf"
---

# Frequently Asked Questions Digital Signature Aggregator V.1.0

## Daftar Isi

1. [Manual Book atau User Guide](#1-manual-book-atau-user-guide)
2. [Frequently Asked Questions (FAQ)](#2-frequently-asked-questions-faq)
   - [Bagaimana jika pada saat aktivasi terdapat error contoh error Too Many Request?](#a-bagaimana-jika-pada-saat-aktivasi-terdapat-error-contoh-error-too-many-request)
   - [Bagaimana jika terdapat error Gagal, akun DSA anda belum terdaftar pada aplikasi IPMS?](#b-bagaimana-jika-terdapat-error-gagal-akun-dsa-anda-belum-terdaftar-pada-aplikasi-ipms)
   - [Bagaimana cara mendaftarkan akun vinotek secara terpisah berdasarkan username?](#c-bagaimana-cara-mendaftarkan-akun-vinotek-secara-terpisah-berdasarkan-username)
   - [Bagaimana jika terdapat error pada response dengan tag {VINOTEK}?](#d-bagaimana-jika-terdapat-error-pada-response-dengan-tag-vinotek)
   - [Bagaimana ketika status permohonan pada akun tersebut mendapatkan status Ditolak?](#e-bagaimana-ketika-status-permohonan-pada-akun-tersebut-mendapatkan-status-ditolak)
   - [Bagaimana jika user pada saat signing atau stamp materai tidak mendapatkan OTP?](#f-bagaimana-jika-user-pada-saat-signing-atau-stamp-materai-tidak-mendapatkan-otp)
   - [Bagaimana cara download file yang sudah di sign?](#g-bagaimana-cara-download-file-yang-sudah-di-sign)
   - [Bagaimana jika terdapat error pada request pada saat pengisian data diri pada saat aktivasi provider?](#h-bagaimana-jika-terdapat-error-pada-request-pada-saat-pengisian-data-diri-pada-saat-aktivasi-provider)
   - [Bagaimana jika terdapat permintaan perubahan email?](#i-bagaimana-jika-terdapat-permintaan-perubahan-email)

## Riwayat Dokumen

| Versi | Deskripsi | Tanggal | Penulis |
|---|---|---|---|
| 1.0 | Draft Awal | 10 September 2025 | Dhea Mahdavikia |

## 1. Manual Book atau User Guide

Dokumen ini disusun sebagai panduan lengkap dalam bentuk user manual yang ditujukan khusus bagi pengguna pemula. Panduan ini dirancang untuk membantu pengguna dalam memahami dan mengoperasikan seluruh fitur aplikasi dengan mudah dan efisien. Setiap bagian dalam dokumen ini menjelaskan langkah-langkah secara sistematis dan praktis, sehingga memudahkan proses pembelajaran serta memastikan penggunaan aplikasi berjalan dengan lancar dan sesuai fungsinya. Untuk lebih detailnya dapat di akses pada halaman link yang ada pada tabel dibawah.

| Judul | Link File |
|---|---|
| Manual Book DSA | Manual Book DSA |

## 2. Frequently Asked Questions (FAQ)

### a. Bagaimana jika pada saat aktivasi terdapat error contoh error Too Many Request?

**Jawaban:**

- [Team Support] menghubungi team provider untuk perbaikan pada saat proses aktivasi.

### b. Bagaimana jika terdapat error Gagal, akun DSA anda belum terdaftar pada aplikasi IPMS?

**Jawaban:**

- [Team Support] diarahkan untuk mengecek status email pendaftaran pada postman Cek Status yang ada pada Register User to Provider, ketika statusnya "Permohonan".
- [User] Kemudian ketika statusnya Permohonan user diarahkan untuk menyelesaikan proses aktivasi yang tersedia pada email yang terdaftar.

### c. Bagaimana cara mendaftarkan akun vinotek secara terpisah berdasarkan username?

**Jawaban:**

- [User] diarahkan untuk mengirimkan mengenai email yang akan didaftarkan dengan username dan organisasi code.
- [Team Support] ketika team support tidak mendapatkan organisasi code maka team support diarahkan untuk mencari organisasi code berdasarkan email yang akan didaftarkan, dengan detail sebagai berikut.
- [Team Support] Akses API Register Personal by Username pada Register User to Provider (Postman) berdasarkan data tersebut.
- [User] diarahkan untuk memeriksa email untuk proses aktivasi.

### d. Bagaimana jika terdapat error pada response dengan tag {VINOTEK}?

**Jawaban:**

- [Team Support] Diarahkan untuk menginformasikan terhadap team provider mengenai error tersebut.

### e. Bagaimana ketika status permohonan pada akun tersebut mendapatkan status Ditolak?

**Jawaban:**

- [User] diarahkan untuk menginformasikan akun user mana saja yang mendapatkan status Ditolak.
- [Team Support] diarahkan untuk mengecek status email pendaftaran pada postman Cek Status yang ada pada Register User to Provider, ketika statusnya "Ditolak". maka team support akan melakukan re-register dengan ketentuan.
- [Team Support] Diarahkan untuk mencari organisasi code berdasarkan email yang akan didaftarkan, dengan detail sebagai berikut.
- [Team Support] diarahkan untuk melakukan Re-Register User to Provider pada Register User to Provider.
- [User] diarahkan untuk melakukan aktivasi yang tersedia pada email.

### f. Bagaimana jika user pada saat signing atau stamp materai tidak mendapatkan OTP?

**Jawaban:**

- [User] diarahkan untuk menunggu selama 5 menit untuk request OTP, karena batas maksimal waktu OTP itu hanya 5 menit dan untuk session code 1 hari.

### g. Bagaimana cara download file yang sudah di sign?

**Jawaban:**

- [User] diarahkan untuk mengirimkan fileid kepada team support support DSA.
- [Tech Support] diarahkan untuk mengakses API Postman Download Signed PDF dengan melampirkan fileid tersebut.

### h. Bagaimana jika terdapat error pada request pada saat pengisian data diri pada saat aktivasi provider?

**Jawaban:**

- [User] diarahkan untuk memeriksa kembali perihal kesesuaian data di KTP dan pada saat inputan.

### i. Bagaimana jika terdapat permintaan perubahan email?

**Jawaban:**

- [Team Support] diarahkan untuk mengakses pada postman Update Email yang ada pada Register User to Provider untuk proses perubahan email.
