# Transfer of Knowledge (TOK) — Digital Signature Aggregator (DSA)

> Sumber: `PPT TOK DSA (2).pptx` — Jakarta, Juli 2025
> Data harga: `harga.csv` (periode 19-02-2025 s.d. 19-05-2026)

## 1. Latar Belakang

Penerapan konsep Digital Signature Aggregator muncul dari permasalahan yang dialami PT PLN (Persero), sebagai upaya digitalisasi dan efisiensi proses.

### 1.1 Pain Point

- Beberapa unit layanan telah mengadakan kontrak secara independen dengan berbagai Penyelenggara Sertifikat Elektronik (PSrE), tanpa koordinasi dan pemantauan dari pusat.
- Layanan digital signature PSrE eksisting hanya diterapkan pada jenjang jabatan tertentu, berfokus pada aplikasi korporat, dan tidak dapat digunakan oleh pihak eksternal.
- Kontrak yang tersebar dan tidak terkelola dengan baik menyebabkan inefisiensi biaya — ada kemungkinan penggunaan layanan yang sama dengan harga yang beragam.

### 1.2 Goal

- Pembuatan platform Digital Signature Aggregator sebagai solusi **penyeragaman integrasi** dengan beberapa PSrE.
- **Standarisasi kebijakan dan kepatuhan** terhadap penggunaan layanan digital signature, untuk memastikan seluruh unit mematuhi standar dan regulasi yang sama.
- **Single platform** penandatanganan dokumen bagi pihak internal maupun eksternal.
- **Penyeragaman pengelolaan kontrak** terhadap PSrE.

### 1.3 Current vs Solution

- **Before:** User PLN dan user eksternal terhubung langsung ke berbagai PSrE (A, B, C, dst.) melalui masing-masing aplikasi client secara terpisah.
- **After:** Seluruh aplikasi client (Aplikasi IAM PLN, AMS, Kearsipan, dsb.) dan pengguna — baik user PLN maupun eksternal — terhubung ke berbagai PSrE melalui **satu platform DSA**.

> *Detail arsitektur mengacu pada diagram di slide 4 presentasi asli.*

## 2. Deliverables

| Deliverable | Deskripsi | Target Pengguna |
|---|---|---|
| **Developer** — Aplikasi DSA | Pengembangan aplikasi DSA agar user dapat membubuhkan Tanda Tangan Elektronik dan E-Meterai via satu platform dengan pilihan beberapa PSrE yang sudah terintegrasi. | User PLN & Non-PLN |
| **Operational** — Signature | Memastikan E-Sign dan E-Meterai ter-deliver ke dokumen user tanpa kendala. | User PLN |
| **Contact Center** | Layanan office hour (responsif terhadap notifikasi urgent), **SLA respon 15 menit**, **SLA resolution 24 jam**. | User PLN |
| **Rekonsiliasi** | Rekonsiliasi data dan pembuatan BA Rekon, LPP, BAPP, BASTP untuk penagihan pembayaran. | Mitra PSrE & PLN |

> **Catatan:** Penagihan ke PLN dilakukan oleh tim sales.

## 3. Fitur Utama Aplikasi DSA

Aplikasi DSA memungkinkan signing dan pembubuhan e-meterai melalui satu platform yang terintegrasi dengan berbagai aplikasi client dan PSrE. DSA memiliki fitur saldo — user harus memiliki saldo yang cukup untuk melakukan signing/pembubuhan e-meterai.

- Transaksi digital signature dan e-meterai (single/multi signer)
- Top up saldo dengan beberapa pilihan metode pembayaran
- Integrasi ke berbagai Penyelenggara Sertifikat Elektronik (PSrE)
- History saldo dan laporan transaksi aktivitas pembubuhan e-sign/e-meterai
- Registrasi untuk organisasi dan user
- Dashboard Digital Signature Aggregator

### General Features

| Fitur | Deskripsi |
|---|---|
| **Pembubuhan E-Sign Terpusat** | Pegawai PLN dan non-PLN dapat membubuhkan tanda tangan digital terpusat melalui aplikasi DSA untuk berbagai dokumen internal dan eksternal. Proses lebih efisien, transparan, mudah dilacak, mengurangi birokrasi, dan mengoptimalkan alokasi waktu dan sumber daya. |
| **Administrasi Terpusat** | Mengelola semua aspek administratif (kontrak, rekonsiliasi, rekapitulasi, penagihan, pembayaran). Meminimalkan kesalahan, mempercepat audit, dan memberikan visibilitas penuh pada biaya. |
| **Operasional Terpusat** | Memudahkan pelaporan dan penanganan kendala operasional terkait tanda tangan digital (ketersediaan sistem, kerusakan, keterlambatan pembubuhan) secara real-time, sehingga masalah cepat diidentifikasi, diproses, dan diselesaikan. |

## 4. Value Chain dan Bisnis Model

Rantai nilai DSA menghubungkan **Mitra Penyedia Digital Sign** → **Web Portal DSA (PLN Icon Plus)** → **Customer** (pengguna digital sign: pegawai, mitra PLN, dsb.), dengan skema:

**Skema ke mitra (PSrE):**
1. Prepaid — Bulk Stock E-Meterai
2. Postpaid — E-Sign & E-Stamp

**Skema ke pelanggan:**
1. Managed Service — Fixed Cost
2. Postpaid — Variable Cost
3. Prepaid — Variable Cost

> *Detail alur mengacu pada diagram Value Chain di slide 8 presentasi asli. User Journey (slide 7), Timeline (slide 9), serta data transaksi dan organization/account binding per 29 Juli 2025 (slide 10–11) berupa visual pada presentasi asli.*

## 5. Biaya Layanan Berdasarkan Data Historis

- Sumber data: `harga.csv`, periode **19-02-2025 s.d. 19-05-2026**.
- Jumlah data aktif: **23 record** (semua berstatus `is_active = true` dan `is_deleted = false`).
- Provider pada data historis: **Privy, Peruri, Xignature, Vinotek**.
- Definisi kolom biaya: `harga` = harga jual ke end user; `harga_kotor` = at cost/biaya pokok dari PSrE; `fee` = fee/margin layanan.

### 5.1 Harga Jual Terkini per Provider

| Layanan | Privy | Peruri | Xignature | Vinotek |
|:---|:---|:---|:---|:---|
| Registrasi | Rp 10.000/User | Rp 10.000/User | Rp 10.000/User | Rp 10.000/User |
| Re-Registrasi | Rp 10.000/User | Rp 0/User | - | Rp 10.000/User |
| Signing | Rp 2.500/Sign | Rp 2.500/Sign | Rp 2.500/Sign | Rp 2.500/Sign |
| E-Materai | Rp 12.500/E-Materai | Rp 12.500/E-Materai | Rp 12.500/E-Materai | Rp 12.500/E-Materai |
| Sign E-Materai | Rp 15.000/Sign E-Materai | - | - | - |
| OTP | Rp 100/OTP | Rp 100/OTP | Rp 100/OTP | Rp 100/OTP |
| Session Code | - | - | Rp 100/Session Code | Rp 100/Session Code |
| Reactive | - | - | - | Rp 100/Reactive |

### 5.2 Komponen Biaya Historis

| Layanan | Provider Tersedia | At Cost Median | Fee/Margin Median | Harga Jual | Fee thd Harga Jual |
|:---|---:|:---|:---|:---|:---|
| Registrasi | 4 | Rp 0 | Rp 10.000 | Rp 10.000 | 100,00% |
| Re-Registrasi | 3 | Rp 0 | Rp 10.000 | Rp 0–Rp 10.000 | 100,00% |
| Signing | 4 | Rp 1.500 | Rp 1.000 | Rp 2.500 | 40,00% |
| E-Materai | 4 | Rp 10.000 | Rp 2.500 | Rp 12.500 | 20,00% |
| Sign E-Materai | 1 | Rp 11.500 | Rp 3.500 | Rp 15.000 | 23,33% |
| OTP | 4 | Rp 0 | Rp 100 | Rp 100 | 100,00% |
| Session Code | 2 | Rp 0 | Rp 100 | Rp 100 | 100,00% |
| Reactive | 1 | Rp 0 | Rp 100 | Rp 100 | 100,00% |

### 5.3 Insight Utama

- **Signing** stabil di **Rp 2.500/sign** pada keempat provider, dengan struktur historis **Rp 1.500 at cost + Rp 1.000 fee**.
- **E-Materai** stabil di **Rp 12.500/e-materai** pada keempat provider, dengan struktur historis **Rp 10.000 at cost + Rp 2.500 fee**.
- **Registrasi user** stabil di **Rp 10.000/user** pada seluruh provider yang tersedia di data.
- **OTP, Session Code, dan Reactive** berada di **Rp 100/hit** pada provider yang mendukung layanan tersebut.
- **Sign E-Materai** baru tersedia pada data historis Privy dengan harga **Rp 15.000/transaksi** (Rp 11.500 at cost + Rp 3.500 fee).
- **Re-Registrasi Peruri** tercatat **Rp 0/user** pada data terbaru (19-05-2026) — perlu dikonfirmasi apakah tarif ini merupakan promo, waive fee, atau tarif final.

## 6. Usulan Skema Bisnis antara PLN dengan PLN Icon Plus

- **Biaya Set Up:** Rp 20–80 juta / OTC (One Time Charge).
- **Managed Service / Fixed Cost:** Rp 100 juta / bulan.
- **Variable Cost:** skema **At Cost + Fee/Margin per transaksi** berdasarkan data historis.

### 6.1 Formula Variable Cost

```text
Harga Jual = Harga Kotor (At Cost) + Fee/Margin
```

### 6.2 Rekomendasi Skema Fee/Margin

| Layanan | At Cost Historis | Fee/Margin Historis | Harga Jual Rekomendasi | Catatan |
|---|---:|---:|---:|---|
| Signing | Rp 1.500 | Rp 1.000 | Rp 2.500/sign | Konsisten pada Privy, Peruri, Xignature, Vinotek |
| E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500/e-materai | Konsisten pada Privy, Peruri, Xignature, Vinotek |
| Sign E-Materai | Rp 11.500 | Rp 3.500 | Rp 15.000/transaksi | Data tersedia pada Privy |
| Registrasi User | Rp 0 | Rp 10.000 | Rp 10.000/user | Konsisten pada provider dengan data registrasi |
| Re-Registrasi User | Rp 0 | Rp 10.000 | Rp 10.000/user | Peruri tercatat Rp 0 pada 19-05-2026; perlu validasi bisnis |
| OTP / Session Code / Reactive | Rp 0 | Rp 100 | Rp 100/hit | Berlaku pada provider yang mendukung |

### 6.3 Penyesuaian dari Slide Lama

- Catatan lama **"Fee/Margin 13,93% per transaksi"** sebaiknya tidak dipakai sebagai satu tarif flat untuk semua produk, karena data historis menunjukkan margin aktual berbeda per layanan.
- Untuk kebutuhan komersial dan rekonsiliasi, lebih aman memakai **fee nominal per layanan** daripada persentase tunggal.
- Tagihan PSrE tetap diposisikan sebagai **At Cost**, sedangkan komponen layanan PLN Icon Plus ditampilkan transparan sebagai **Fee/Margin**.

## 7. Biaya Operasional DSA

Biaya operasional DSA disarankan dipisahkan menjadi **fixed cost** dan **variable cost**:

- **Fixed cost** mencakup platform, operasional, monitoring, support, rekonsiliasi, dan pelaporan.
- **Variable cost** mengikuti konsumsi transaksi aktual berdasarkan layanan yang digunakan end user.

### 7.1 Struktur Biaya Operasional

| Komponen | Skema | Dasar Perhitungan |
|---|---|---|
| Biaya Set Up | One Time Charge | Rp 20–80 juta / OTC |
| Managed Service | Fixed Cost Bulanan | Rp 100 juta / bulan |
| Signing | Variable Cost | Rp 2.500 × jumlah transaksi sign |
| E-Materai | Variable Cost | Rp 12.500 × jumlah transaksi e-materai |
| Sign E-Materai | Variable Cost | Rp 15.000 × jumlah transaksi sign e-materai |
| Registrasi User | Variable Cost | Rp 10.000 × jumlah user registrasi |
| Re-Registrasi User | Variable Cost | Rp 10.000 × jumlah user re-registrasi (kecuali tarif khusus Peruri Rp 0 dikonfirmasi berlaku) |
| OTP / Session Code / Reactive | Variable Cost | Rp 100 × jumlah hit |

### 7.2 Catatan Implementasi

- Harga dapat digunakan sebagai acuan awal untuk simulasi bisnis, quotation internal, dan perhitungan tagihan end user.
- Untuk finalisasi kontrak, perlu validasi ulang terhadap tarif aktif per PSrE, volume minimum pembelian, dan skema prepaid/postpaid masing-masing provider.

## Appendix — Detail Histori Harga (`harga.csv`)

| Tanggal Berlaku | Provider | Layanan | Satuan | At Cost | Fee/Margin | Harga Jual | Code |
|:---|:---|:---|:---|:---|:---|:---|:---|
| 19-02-2025 | Vinotek | Reactive | Reactive | Rp 0 | Rp 100 | Rp 100 | vinotek_reactive |
| 19-02-2025 | Vinotek | E-Materai | E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500 | vinotek_ematerai |
| 19-02-2025 | Vinotek | Session Code | Session Code | Rp 0 | Rp 100 | Rp 100 | vinotek_sessioncode |
| 19-02-2025 | Vinotek | Signing | Sign | Rp 1.500 | Rp 1.000 | Rp 2.500 | vinotek_sign |
| 19-02-2025 | Vinotek | OTP | OTP | Rp 0 | Rp 100 | Rp 100 | vinotek_otp |
| 19-02-2025 | Vinotek | Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | vinotek_registrasi |
| 16-07-2025 | Privy | OTP | OTP | Rp 0 | Rp 100 | Rp 100 | privy_otp |
| 16-07-2025 | Privy | Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | privy_registrasi |
| 27-07-2025 | Vinotek | Re-Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | vinotek_re_registrasi |
| 13-08-2025 | Xignature | Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | xignature_registrasi |
| 15-08-2025 | Xignature | Signing | Sign | Rp 1.500 | Rp 1.000 | Rp 2.500 | xignature_sign |
| 19-08-2025 | Xignature | Session Code | Session Code | Rp 0 | Rp 100 | Rp 100 | xignature_sessioncode |
| 19-08-2025 | Xignature | OTP | OTP | Rp 0 | Rp 100 | Rp 100 | xignature_otp |
| 19-08-2025 | Xignature | E-Materai | E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500 | xignature_ematerai |
| 03-09-2025 | Peruri | E-Materai | E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500 | peruri_ematerai |
| 11-09-2025 | Peruri | Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | peruri_registrasi |
| 29-09-2025 | Privy | Signing | Sign | Rp 1.500 | Rp 1.000 | Rp 2.500 | privy_sign |
| 30-09-2025 | Privy | E-Materai | E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500 | privy_ematerai |
| 30-09-2025 | Privy | Sign E-Materai | Sign E-Materai | Rp 11.500 | Rp 3.500 | Rp 15.000 | privy_sign_ematerai |
| 07-10-2025 | Peruri | OTP | OTP | Rp 0 | Rp 100 | Rp 100 | peruri_otp |
| 07-10-2025 | Peruri | Signing | Sign | Rp 1.500 | Rp 1.000 | Rp 2.500 | peruri_sign |
| 09-10-2025 | Privy | Re-Registrasi | User | Rp 0 | Rp 10.000 | Rp 10.000 | privy_re_registrasi |
| 19-05-2026 | Peruri | Re-Registrasi | User | Rp 0 | Rp 0 | Rp 0 | peruri_re_registrasi |

---

*TERIMA KASIH*