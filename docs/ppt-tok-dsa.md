# PPT TOK DSA (2)

> Sumber: `PPT TOK DSA (2).pptx`  
> Jumlah slide: 16

## Slide 1 — Transfer of KnowledgeDigital Signature AggregatorDSAJakarta, Juli 2025

- Transfer of KnowledgeDigital Signature AggregatorDSAJakarta, Juli 2025

## Slide 2 — Pembahasan

- Pembahasan

- Latar Belakang
- Current vs Solution
- Deliverables
- General Features
- User Journey
- Value Chain
- Timeline
- Transaksi DSA
- Organization dan Account Binding

## Slide 3 — Latar Belakang

- Latar Belakang

- Penerapan Konsep Digital Signature Aggregator muncul dari permasalahan yang saat ini sedang dialami oleh PT PLN (Persero) sebagai upaya digitalisasi dan efisiensi proses.

- PAIN POINT

- GOAL

- Saat ini beberapa unit layanan telah mengadakan kontrak secara independen dengan berbagai Penyelenggara Sertifikat Elektronik (PSrE), tanpa ada kordinasi dan pemantauan dari pusat.
- Layanan eksisting digital signature PSrE hanya diterapkan pada jenjang jabatan tertentu dan berfokus pada aplikasi korporat dan tidak dapat digunakan oleh pihak eksternal.
- Kontrak yang tersebar dan tidak terkelola dengan baik menyebabkan inefisiensi biaya. Ada kemungkinan penggunaan layanan yang sama dengan harga yang beragam.

- Pembuatan platform Digital Signature Aggregator sebagai solusi penyeragaman integrasi dengan beberapa penyelenggara Sertifikat Elektronik (PSrE).
- Standarisasi kebijakan dan kepatuhan terhadap penggunaan layanan digital signature, untuk memastikan bahwa seluruh unit mematuhi standar dan regulasi yang sama.
- Single platform penandatangan dokumen bagi pihak internal maupun eksternal.
- Penyeragaman pengelolaan kontrak terhadap Penyelenggara Sertifikat Elektronik (PSrE).

## Slide 4 — Current vs Solution

- Current vs Solution

- User External(yang berkepentingan)

- User PLN

- Aplikasi IAM PLN

- Aplikasi AMS

- Digital Signature Aggregator (DSA)

- Aplikasi Kearsipan

- Client Application

- A

- C

- B

- User External(yang berkepentingan)

- User PLN

- Client Application

- After

- Before

- D

- A

- E

- C

- B

- Dsb.

## Slide 5 — Deliverables

- Deliverables

- Developer

- Operational

- Signature

- Rekonsiliasi

- Aplikasi Digital Signature Aggregator

- Contact Center

- Pengembangkan Aplikasi DSA untuk user melakukan pembubuhan Tanda Tangan Elektronik dan E-Meterai via 1 platform dengan pilihan beberapa PSrE yang sudah terintegrasi.

- Memastikan E-Sign dan E-Meterai terdelivery ke dokumen user tanpa kendala

- Layanan Office Hour (Responsif terhadap notifikasi urgent)
- SLA Respon 15m
- SLA Resolution 24j

- Rekonsiliasi data dan membuat BA Rekon, LPP, BAPP, BASTP untuk penagihan pembayaran

- User PLN & Non PLN

- User PLN

- Mitra PSrE & PLN

- Note: Penagihan ke PLN dilakukan oleh tim sales.

## Slide 6 — Aplikasi DSA memungkinan melakukan signing dan pembubuhan e-meterai melalui satu platform yang terin

- Aplikasi DSA memungkinan melakukan signing dan pembubuhan e-meterai melalui satu platform yang terintegrasi dengan berbagai aplikasi client dan juga PSrE. DSA memiliki fitur saldo dimana user harus memiliki saldo yang cukup untuk dapat melakukan signing/pembubuhan e-meterai.

- Transaksi Digital signature dan e-meterai (single/multi signer)

- Top Up saldo dengan beberapa pilihan metode pembayaran

- Integrasi ke berbagai penyelenggara sertifikat elektronik (PSrE)

- History saldo dan laporan transaksi aktivitas pembubuhan esign/emeterai.

- Registrasi untuk organisasi dan user

- Dashboard Digital Signature Aggregator

## Slide 7 — User Journey

- User Journey

## Slide 8 — Value Chain

- Value Chain

- Mitra

- Bisnis Model

- Web Portal DSA

- Bisnis Model

- Customer

- Mitra Penyedia Digital Sign

- Skema ke mitra

- Develop

- Skema ke pelanggan

- Pengguna
- Digital Sign

- O&M

- Prepaid

- Manage Service Fixed Cost

- 1

- Bulk Stock E-Meterai

- Postpaid Variable Cost

- Pegawai

- 2

- Postpaid

- E-Sign & E-Stamp

- Prepaid Variable Cost

- Mitra PLN

- 3

- Dsb.

## Slide 9 — Timeline

- Timeline

## Slide 10 — Transaksi Digital Signature Aggregator (DSA)

- Transaksi Digital Signature Aggregator (DSA)

- *Data per 29 Juli 2025

## Slide 11 — Organization dan Account Binding on DSA

- Organization dan Account Binding on DSA

- *Data per 29 Juli 2025

## Slide 12 — TERIMA KASIH

- TERIMA KASIH

## Slide 13 — Biaya Layanan Berdasarkan Data Historis

- Sumber data: `harga_golda.csv`.
- Periode data: **19-02-2025 s.d. 19-05-2026**.
- Jumlah data aktif: **23 record**; semua record pada file berstatus `is_active = true` dan `is_deleted = false`.
- Provider pada data historis: **Privy, Peruri, Xignature, Vinotek**.
- Definisi kolom biaya: `harga` = harga jual ke end user, `harga_kotor` = at cost/biaya pokok dari PSrE, dan `fee` = fee/margin layanan.

### Harga Jual Terkini per Provider

| Layanan        | Privy                    | Peruri              | Xignature           | Vinotek             |
|:---------------|:-------------------------|:--------------------|:--------------------|:--------------------|
| Registrasi     | Rp 10.000/User           | Rp 10.000/User      | Rp 10.000/User      | Rp 10.000/User      |
| Re-Registrasi  | Rp 10.000/User           | Rp 0/User           | -                   | Rp 10.000/User      |
| Signing        | Rp 2.500/Sign            | Rp 2.500/Sign       | Rp 2.500/Sign       | Rp 2.500/Sign       |
| E-Materai      | Rp 12.500/E-Materai      | Rp 12.500/E-Materai | Rp 12.500/E-Materai | Rp 12.500/E-Materai |
| Sign E-Materai | Rp 15.000/Sign E-Materai | -                   | -                   | -                   |
| OTP            | Rp 100/OTP               | Rp 100/OTP          | Rp 100/OTP          | Rp 100/OTP          |
| Session Code   | -                        | -                   | Rp 100/Session Code | Rp 100/Session Code |
| Reactive       | -                        | -                   | -                   | Rp 100/Reactive     |

### Komponen Biaya Historis

| Layanan        |   Provider Tersedia | At Cost Median   | Fee/Margin Median   | Harga Jual     | Fee thd Harga Jual   |
|:---------------|--------------------:|:-----------------|:--------------------|:---------------|:---------------------|
| Registrasi     |                   4 | Rp 0             | Rp 10.000           | Rp 10.000      | 100,00%              |
| Re-Registrasi  |                   3 | Rp 0             | Rp 10.000           | Rp 0–Rp 10.000 | 100,00%              |
| Signing        |                   4 | Rp 1.500         | Rp 1.000            | Rp 2.500       | 40,00%               |
| E-Materai      |                   4 | Rp 10.000        | Rp 2.500            | Rp 12.500      | 20,00%               |
| Sign E-Materai |                   1 | Rp 11.500        | Rp 3.500            | Rp 15.000      | 23,33%               |
| OTP            |                   4 | Rp 0             | Rp 100              | Rp 100         | 100,00%              |
| Session Code   |                   2 | Rp 0             | Rp 100              | Rp 100         | 100,00%              |
| Reactive       |                   1 | Rp 0             | Rp 100              | Rp 100         | 100,00%              |

### Insight Utama

- **Signing** stabil di **Rp 2.500/sign** pada Privy, Peruri, Xignature, dan Vinotek, dengan struktur historis **Rp 1.500 at cost + Rp 1.000 fee**.
- **E-Materai** stabil di **Rp 12.500/e-materai** pada Privy, Peruri, Xignature, dan Vinotek, dengan struktur historis **Rp 10.000 at cost + Rp 2.500 fee**.
- **Registrasi user** stabil di **Rp 10.000/user** pada seluruh provider yang tersedia di data.
- **OTP, Session Code, dan Reactive** berada di **Rp 100/hit** pada provider yang mendukung layanan tersebut.
- **Sign E-Materai** baru tersedia pada data historis Privy dengan harga **Rp 15.000/transaksi**, terdiri dari **Rp 11.500 at cost + Rp 3.500 fee**.
- **Re-Registrasi Peruri** tercatat **Rp 0/user** pada data terbaru tanggal **19-05-2026**; perlu dikonfirmasi apakah tarif ini merupakan promo, waive fee, atau tarif final.


## Slide 14 — Usulan Skema Bisnis antara PLN dengan PLN Icon Plus

- **Biaya Set Up:** Rp 20–80 juta / OTC.
- **Managed Service / Fixed Cost:** Rp 100 juta / bulan.
- **Variable Cost:** menggunakan skema **At Cost + Fee/Margin per transaksi** berdasarkan data historis.

### Formula Variable Cost

```text
Harga Jual = Harga Kotor / At Cost + Fee / Margin
```

### Rekomendasi Skema Fee/Margin

| Layanan | At Cost Historis | Fee/Margin Historis | Harga Jual Rekomendasi | Catatan |
| --- | ---: | ---: | ---: | --- |
| Signing | Rp 1.500 | Rp 1.000 | Rp 2.500/sign | Berlaku konsisten pada Privy, Peruri, Xignature, Vinotek |
| E-Materai | Rp 10.000 | Rp 2.500 | Rp 12.500/e-materai | Berlaku konsisten pada Privy, Peruri, Xignature, Vinotek |
| Sign E-Materai | Rp 11.500 | Rp 3.500 | Rp 15.000/transaksi | Data tersedia pada Privy |
| Registrasi User | Rp 0 | Rp 10.000 | Rp 10.000/user | Berlaku konsisten pada provider dengan data registrasi |
| Re-Registrasi User | Rp 0 | Rp 10.000 | Rp 10.000/user | Peruri tercatat Rp 0 pada 19-05-2026; perlu validasi bisnis |
| OTP / Session Code / Reactive | Rp 0 | Rp 100 | Rp 100/hit | Berlaku pada provider yang mendukung layanan tersebut |

### Penyesuaian dari Slide Lama

- Catatan lama **“Fee/Margin 13,93% per transaksi”** sebaiknya tidak dipakai sebagai satu tarif flat untuk semua produk, karena data historis menunjukkan margin aktual berbeda per layanan.
- Untuk kebutuhan komersial dan rekonsiliasi, lebih aman memakai **fee nominal per layanan** daripada persentase tunggal.
- Tagihan PSrE tetap diposisikan sebagai **At Cost**, sedangkan komponen layanan PLN Icon Plus ditampilkan transparan sebagai **Fee/Margin**.


## Slide 15 — General Features

- General Features

- Pembubuhan E-sign Terpusat

- Pegawai PLN dan non PLN dapat melakukan pembubuhan tanda tangan digital terpusat melalui Aplikasi DSA untuk berbagai dokumen internal dan eksternal. Ini membuat proses lebih efisien, transparan, dan mudah dilacak, mengurangi birokrasi, dan mengoptimalkan alokasi waktu dan sumber daya.

- Administrasi Terpusat

- Mengelola semua aspek administratif transportasi (kontrak, rekonsiliasi, rekapitulasi, penagihan, pembayaran). Ini meminimalkan kesalahan, mempercepat audit, dan memberikan visibilitas penuh pada biaya.

- Operasional Terpusat

- Memudahkan pelaporan dan penanganan kendala operasional terkait tanda tangan digital (ketersediaan sistem, kerusakan, keterlambatan pembubuhan) secara real-time. Memastikan masalah cepat diidentifikasi, diproses, dan diselesaikan untuk menjaga kelancaran operasional pembubuhan tanda tangan digital.

## Slide 16 — Biaya Operasional DSA

- Biaya operasional DSA disarankan dipisahkan menjadi **fixed cost** dan **variable cost**.
- Fixed cost mencakup platform, operasional, monitoring, support, rekonsiliasi, dan pelaporan.
- Variable cost mengikuti konsumsi transaksi aktual berdasarkan layanan yang digunakan end user.

### Struktur Biaya Operasional

| Komponen | Skema | Dasar Perhitungan |
| --- | --- | --- |
| Biaya Set Up | One Time Charge | Rp 20–80 juta / OTC |
| Managed Service | Fixed Cost Bulanan | Rp 100 juta / bulan |
| Signing | Variable Cost | Rp 2.500 x jumlah transaksi sign |
| E-Materai | Variable Cost | Rp 12.500 x jumlah transaksi e-materai |
| Sign E-Materai | Variable Cost | Rp 15.000 x jumlah transaksi sign e-materai |
| Registrasi User | Variable Cost | Rp 10.000 x jumlah user registrasi |
| Re-Registrasi User | Variable Cost | Rp 10.000 x jumlah user re-registrasi, kecuali tarif khusus Peruri Rp 0 dikonfirmasi berlaku |
| OTP / Session Code / Reactive | Variable Cost | Rp 100 x jumlah hit |

### Catatan Implementasi

- Harga dapat digunakan sebagai acuan awal untuk simulasi bisnis, quotation internal, dan perhitungan tagihan end user.
- Untuk finalisasi kontrak, perlu validasi ulang terhadap tarif aktif per PSrE, volume minimum pembelian, dan skema prepaid/postpaid masing-masing provider.


## Appendix — Detail Histori Harga dari `harga_golda.csv`

| Tanggal Berlaku   | Provider   | Layanan        | Satuan         | At Cost   | Fee/Margin   | Harga Jual   | Code                  |
|:------------------|:-----------|:---------------|:---------------|:----------|:-------------|:-------------|:----------------------|
| 19-02-2025        | Vinotek    | Reactive       | Reactive       | Rp 0      | Rp 100       | Rp 100       | vinotek_reactive      |
| 19-02-2025        | Vinotek    | E-Materai      | E-Materai      | Rp 10.000 | Rp 2.500     | Rp 12.500    | vinotek_ematerai      |
| 19-02-2025        | Vinotek    | Session Code   | Session Code   | Rp 0      | Rp 100       | Rp 100       | vinotek_sessioncode   |
| 19-02-2025        | Vinotek    | Signing        | Sign           | Rp 1.500  | Rp 1.000     | Rp 2.500     | vinotek_sign          |
| 19-02-2025        | Vinotek    | OTP            | OTP            | Rp 0      | Rp 100       | Rp 100       | vinotek_otp           |
| 19-02-2025        | Vinotek    | Registrasi     | User           | Rp 0      | Rp 10.000    | Rp 10.000    | vinotek_registrasi    |
| 16-07-2025        | Privy      | OTP            | OTP            | Rp 0      | Rp 100       | Rp 100       | privy_otp             |
| 16-07-2025        | Privy      | Registrasi     | User           | Rp 0      | Rp 10.000    | Rp 10.000    | privy_registrasi      |
| 27-07-2025        | Vinotek    | Re-Registrasi  | User           | Rp 0      | Rp 10.000    | Rp 10.000    | vinotek_re_registrasi |
| 13-08-2025        | Xignature  | Registrasi     | User           | Rp 0      | Rp 10.000    | Rp 10.000    | xignature_registrasi  |
| 15-08-2025        | Xignature  | Signing        | Sign           | Rp 1.500  | Rp 1.000     | Rp 2.500     | xignature_sign        |
| 19-08-2025        | Xignature  | Session Code   | Session Code   | Rp 0      | Rp 100       | Rp 100       | xignature_sessioncode |
| 19-08-2025        | Xignature  | OTP            | OTP            | Rp 0      | Rp 100       | Rp 100       | xignature_otp         |
| 19-08-2025        | Xignature  | E-Materai      | E-Materai      | Rp 10.000 | Rp 2.500     | Rp 12.500    | xignature_ematerai    |
| 03-09-2025        | Peruri     | E-Materai      | E-Materai      | Rp 10.000 | Rp 2.500     | Rp 12.500    | peruri_ematerai       |
| 11-09-2025        | Peruri     | Registrasi     | User           | Rp 0      | Rp 10.000    | Rp 10.000    | peruri_registrasi     |
| 29-09-2025        | Privy      | Signing        | Sign           | Rp 1.500  | Rp 1.000     | Rp 2.500     | privy_sign            |
| 30-09-2025        | Privy      | E-Materai      | E-Materai      | Rp 10.000 | Rp 2.500     | Rp 12.500    | privy_ematerai        |
| 30-09-2025        | Privy      | Sign E-Materai | Sign E-Materai | Rp 11.500 | Rp 3.500     | Rp 15.000    | privy_sign_ematerai   |
| 07-10-2025        | Peruri     | OTP            | OTP            | Rp 0      | Rp 100       | Rp 100       | peruri_otp            |
| 07-10-2025        | Peruri     | Signing        | Sign           | Rp 1.500  | Rp 1.000     | Rp 2.500     | peruri_sign           |
| 09-10-2025        | Privy      | Re-Registrasi  | User           | Rp 0      | Rp 10.000    | Rp 10.000    | privy_re_registrasi   |
| 19-05-2026        | Peruri     | Re-Registrasi  | User           | Rp 0      | Rp 0         | Rp 0         | peruri_re_registrasi  |

