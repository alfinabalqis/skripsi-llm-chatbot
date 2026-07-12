# Frequently Asked Questions (FAQ) — Digital Signature Aggregator (DSA)

> Sumber: `FAQ DSA.pdf` — Versi 1.0

## 1. Tentang Dokumen Ini

Dokumen ini disusun sebagai panduan lengkap dalam bentuk user manual yang ditujukan khusus bagi pengguna pemula. Panduan ini dirancang untuk membantu pengguna memahami dan mengoperasikan seluruh fitur aplikasi dengan mudah dan efisien. Setiap bagian menjelaskan langkah-langkah secara sistematis dan praktis, sehingga memudahkan proses pembelajaran serta memastikan penggunaan aplikasi berjalan lancar dan sesuai fungsinya.

## 2. Frequently Asked Questions (FAQ)

### 2.1 Bagaimana jika saat aktivasi terdapat error, contohnya *Too Many Request*?

1. **[Team Support]** Menghubungi team provider untuk perbaikan pada proses aktivasi.

### 2.2 Bagaimana jika terdapat error *"Gagal, akun DSA Anda belum terdaftar pada aplikasi IPMS"*?

1. **[Team Support]** Mengecek status email pendaftaran melalui Postman **Cek Status** pada *Register User to Provider*.
2. **[User]** Jika statusnya **"Permohonan"**, user menyelesaikan proses aktivasi melalui tautan yang dikirim ke email terdaftar.

### 2.3 Bagaimana cara mendaftarkan akun Vinotek secara terpisah berdasarkan username?

1. **[User]** Mengirimkan email yang akan didaftarkan beserta **username** dan **organization code**.
2. **[Team Support]** Jika organization code tidak tersedia, mencari organization code berdasarkan email yang akan didaftarkan.
3. **[Team Support]** Mengakses API **Register Personal by Username** pada *Register User to Provider* (Postman) berdasarkan data tersebut.
4. **[User]** Memeriksa email untuk melakukan proses aktivasi.

### 2.4 Bagaimana jika terdapat error pada response dengan tag `{VINOTEK}`?

1. **[Team Support]** Menginformasikan error tersebut kepada team provider.

### 2.5 Bagaimana jika status permohonan pada akun berstatus **Ditolak**?

1. **[User]** Menginformasikan akun mana saja yang mendapatkan status Ditolak.
2. **[Team Support]** Mengecek status email pendaftaran melalui Postman **Cek Status** pada *Register User to Provider*. Jika statusnya **"Ditolak"**, team support melakukan re-register dengan langkah berikut:
   - Mencari **organization code** berdasarkan email yang akan didaftarkan.
   - Melakukan **Re-Register User to Provider** pada *Register User to Provider*.
3. **[User]** Melakukan aktivasi melalui tautan yang dikirim ke email.

### 2.6 Bagaimana jika user tidak mendapatkan OTP saat signing atau stamp materai?

1. **[User]** Menunggu hingga 5 menit, karena batas maksimal waktu berlaku OTP adalah **5 menit** (sedangkan session code berlaku **1 hari**) sebelum melakukan request OTP kembali.

### 2.7 Bagaimana cara mengunduh file yang sudah di-sign?

1. **[User]** Mengirimkan **file ID** kepada team support DSA.
2. **[Team Support]** Mengakses API Postman **Download Signed PDF** dengan melampirkan file ID tersebut.

### 2.8 Bagaimana jika terdapat error pada request saat pengisian data diri pada aktivasi provider?

1. **[User]** Memeriksa kembali kesesuaian data pada KTP dengan data yang diinput.

### 2.9 Bagaimana jika terdapat permintaan perubahan email?

1. **[Team Support]** Mengakses Postman **Update Email** pada *Register User to Provider* untuk proses perubahan email.
