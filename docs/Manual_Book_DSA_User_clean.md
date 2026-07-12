# Manual Book Layanan Digital Signature Aggregator (DSA) — V.1.3 (User)

> Sumber: `Manual Book Layanan DSA V.1.3 (User)`

## 1. Registrasi

### 1.1 Registrasi Organisasi

Untuk dapat melakukan proses **sign** dan **stamp**, pengguna harus mendaftarkan akunnya terlebih dahulu melalui halaman register.

1. Akses halaman **register**.
2. Daftarkan **organisasi** terlebih dahulu.
3. Setelah organisasi berhasil didaftarkan, pengguna diarahkan untuk mendaftarkan **akun pribadinya**.
4. Khusus **Warga Negara Asing (WNA)**: pilih opsi **WNA**, lalu input nomor **Kartu Izin Tinggal/Passport**.
5. Setelah organisasi dan akun berhasil didaftarkan, pengguna menerima **pesan sukses**.

### 1.2 Pengaturan Password Awal

1. Pengguna menerima **email** untuk mengatur password yang akan digunakan saat login ke DSA.
2. Klik link **Atur Password Sekarang** pada email tersebut, lalu atur password.

> **Catatan:** Tautan atur password bersifat **satu kali pakai (one-time use)** dan berlaku selama **24 jam**. Jika melebihi batas waktu atau sudah digunakan, pengguna harus meminta tautan baru melalui fitur *forgot password* pada halaman login.

## 2. Login

Setelah registrasi berhasil, pengguna diarahkan ke halaman **Login** untuk mengisi **email** dan **kata sandi** sesuai data yang digunakan saat registrasi.

## 3. Forgot Password (Lupa Kata Sandi)

Jika pengguna lupa kata sandinya, tersedia fitur **Forgot Password** pada halaman login:

1. Input **email** yang akan direset password-nya. Pengguna akan menerima email untuk melanjutkan proses reset password.
2. Buka link reset password, lalu input **New Password** dan **Confirm New Password** pada halaman Reset Password.
3. Setelah password baru tersimpan, pengguna menerima **pesan konfirmasi** bahwa perubahan password berhasil, dan dapat login kembali.

## 4. Halaman Profile

Halaman profil berfungsi untuk mengidentifikasi akun dan berisi informasi pribadi. Menu profile terdiri dari beberapa halaman berikut.

### 4.1 Account Information

Pengguna dapat memonitor informasi pribadi berdasarkan data yang diinput saat registrasi.

1. Jika ada data yang tidak sesuai, klik tombol **Change**.
2. Lakukan perubahan data sesuai kebutuhan, lalu klik **Save Change**.

### 4.2 Signature

Halaman Signature memudahkan pengguna mengelola daftar tanda tangan digital untuk proses transaksi. Pengguna dapat melakukan **View**, **Download**, dan **Delete** pada tanda tangan yang terdaftar.

1. Klik **Add Signature** untuk menambahkan tanda tangan. Tersedia 3 cara: **gambar**, **ketik**, dan **unggah**.
2. Setelah selesai membuat atau mengunggah tanda tangan, klik tombol **Buat**.

### 4.3 Provider

Proses **Add Provider** adalah proses utama setelah registrasi selesai, untuk mempermudah proses transaksi.

**Menambahkan provider:**

1. Pada halaman Provider, pilih **Add Provider** untuk penyesuaian provider dan organisasi.
2. Setelah penyesuaian selesai, klik tombol **Add Provider**.
3. Setelah provider berhasil ditambahkan, pengguna menerima **email undangan** untuk melanjutkan proses aktivasi akun.

**Aktivasi akun:**

1. **Syarat dan Ketentuan** — centang persetujuan di bagian bawah halaman aktivasi, lalu klik **Selanjutnya**.
2. **Pengisian Data Diri**:
   - Unggah KTP melalui tombol **Upload Foto KTP**.
   - Input data diri sesuai KTP yang telah diunggah.
   - Jika data sudah sesuai, klik **Selanjutnya**.
3. **Swafoto**:
   - Klik **Nyalakan Kamera**, arahkan kamera ke wajah, lalu klik **Ambil Kamera**.
   - Ketentuan swafoto:
     - Posisikan wajah di tengah.
     - Tidak memakai topi, masker, atau aksesoris yang menghalangi wajah.
     - Pastikan pencahayaan cukup.
   - Setelah swafoto berhasil diambil, unggah dengan memilih tombol **Ambil Foto**.

**Penerbitan sertifikat digital:**

Unggahan swafoto merupakan langkah terakhir aktivasi. Selanjutnya:

1. Klik **Lihat Sertifikat** untuk melihat Sertifikat Digital Akun.
2. Periksa data pada sertifikat, centang pernyataan konfirmasi di bagian bawah halaman, lalu klik **Konfirmasi Sertifikat**.
3. Setelah sertifikat berhasil diterbitkan, sistem melakukan pengecekan melalui **API Check Status** hingga status akun menjadi **Selesai**.

### 4.4 Organization

1. Pada halaman Organization, pilih **Add Organization** untuk penyesuaian organisasi.
2. Setelah penyesuaian selesai, klik tombol **Add Organization**.

### 4.5 Account Activity

Halaman yang menampilkan riwayat aktivitas pengguna pada aplikasi, seperti login, perubahan data, approval atau tanda tangan, transaksi, dan lain sebagainya.

## 5. Change Password

Halaman untuk mengubah password:

1. Input **password lama**, **password baru**, dan **konfirmasi password baru**.
2. Setelah password berhasil diubah, pengguna **otomatis keluar (logout)** dari aplikasi DSA.

## 6. Logout

Pengguna dapat melakukan logout dari DSA melalui detail menu profile, yang dapat diakses dari semua menu.

## 7. Halaman Inbox

Menu Inbox menampilkan pesan dokumen yang perlu ditindaklanjuti oleh pengguna. Inbox mencakup tab **To Do**, **On Progress**, dan **Completed**, serta status dokumen yang memerlukan approval, sign, atau sign & stamp secara digital.

### 7.1 Role pada Inbox

| Role | Deskripsi |
|---|---|
| **Approver** | Memiliki hak akses untuk menyetujui atau menolak dokumen yang diajukan. |
| **Signer** | Memiliki hak akses untuk memberikan tanda tangan digital. |
| **Signer-Stamp** | Memiliki hak akses untuk menandatangani dan memberikan stamp digital pada dokumen yang diajukan. |

### 7.2 Tab To Do — Proses Penandatanganan Dokumen

Tab **To Do** menampilkan dokumen yang perlu ditindaklanjuti oleh Approver, Signer, atau Signer-Stamp sesuai aksi yang dibutuhkan. Dokumen yang diproses adalah dokumen berstatus **Waiting**. Pengguna menindaklanjuti dokumen sesuai role-nya melalui label *action*.

Alur penandatanganan:

1. Klik **Sign Now** — halaman progress ditampilkan untuk mengisi kelengkapan dokumen (alamat dan *reason* bersifat opsional), lalu klik **Next**.
2. Pada halaman progress berikutnya, buat **tanda tangan baru** atau pilih tanda tangan yang sudah tersimpan, serta berikan stamp pada dokumen.
   - Untuk membuat tanda tangan baru: klik ikon **Tambah Tanda Tangan**, buat tanda tangan, lalu klik **Buat**.
3. Terapkan tanda tangan dengan cara **drag & drop** ke posisi yang diinginkan pada dokumen, lalu klik **Selesaikan dan Tandatangani**.
4. Pop up **Select Authentication Method** ditampilkan — pilih metode autentikasi (contoh: **session code**).
5. Input **kode** yang diterima melalui email.
6. Setelah berhasil, muncul informasi **"Dokumen berhasil ditandatangani"** dan pengguna diarahkan ke tab **Completed**.

### 7.3 Tab On Progress

Menampilkan daftar dokumen yang masih dalam tahap pengerjaan atau proses penandatanganan. Pengguna dapat melihat dokumen yang diajukan melalui fitur **View File**.

### 7.4 Tab Completed

Berisi daftar dokumen yang sudah selesai diproses (approve, sign, sign & stamp). Pengguna dapat **melihat** dan **meng-export** dokumen untuk mengecek apakah dokumen sudah selesai diproses.

## 8. Halaman List Dokumen

Menampilkan total dokumen dengan status **Finished**, **In Progress**, **Rejected**, serta total dokumen masuk. Pengguna dapat menggunakan **filter tag status** untuk mengelompokkan dokumen.

### 8.1 Upload Dokumen

Fitur upload dokumen memudahkan pengajuan persetujuan, tanda tangan, dan stamp:

1. Upload dokumen **PDF** dengan ukuran maksimal **10 MB**.
2. Pada halaman progress, isi **data penerima** dan **role**-nya, lalu klik **Next** dan **Send**.
3. Sistem menampilkan pop up sukses upload dan mengarahkan kembali ke halaman List Dokumen.

### 8.2 Fitur Lainnya

- **View (ikon mata)** — admin dapat mengecek isi dokumen sebelum melakukan approval, signing, dan stamp.
- **Export** — membantu admin membuat cadangan (backup) data.

## 9. Halaman History Saldo dan Top Up

Menu **Saldo** menampilkan data total saldo dan tabel history saldo, dilengkapi fitur **filter** untuk memudahkan pencarian.

### 9.1 Langkah-Langkah Top Up Saldo

1. Pada menu Saldo, klik tombol **Top Up Balance**.
2. Input **organisasi** dan **nominal top up** (minimal **Rp10.000**).
3. Pilih metode pembayaran: **E-Wallet**, **QRIS**, **Virtual Account**, atau **Virtual Account Recurring**, lalu pilih **jenis** metode pembayarannya.
4. **Cek Tagihan** — sistem menampilkan **Rincian Top Up**, lalu lanjutkan pembayaran.
5. Klik **Bayar** — pengguna diarahkan ke halaman **Cara Pembayaran**, lalu klik **Lanjutkan Pembayaran** untuk mendapatkan kode.
6. Input **kode pembayaran** pada halaman jenis metode pembayaran yang dipilih (kode dapat dilihat melalui **Show Test Account**).
7. Input **PIN** metode pembayaran (dapat dilihat melalui **Show Test PIN**).
8. Pada halaman detail **Payment Method**, klik **PAY** untuk menyelesaikan pembayaran.

### 9.2 Verifikasi Setelah Pembayaran

1. Kembali ke halaman **Cara Pembayaran** di aplikasi DSA, lalu klik **Cek Status**.
2. Jika berhasil, muncul pop up **"Saldo Berhasil diperbarui"**.
3. Pastikan saldo bertambah dengan mengecek kembali halaman menu **Saldo**.

## 10. Halaman History Transaksi

Menampilkan total transaksi yang telah digunakan — seperti **signing**, **stamp**, **reactive**, **OTP**, **registrasi**, dan **session code** — berdasarkan **provider** dan **organization**.

Tersedia fitur **filter** berdasarkan tanggal (*date*), *provider*, *saldo type*, dan *organization* untuk memudahkan pencarian transaksi secara lebih efisien dan efektif.