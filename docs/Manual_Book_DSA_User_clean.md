# Manual Book Layanan Digital Signature Aggregator (DSA) V.1.3 (User)

## Daftar Isi

- Riwayat Dokumen
- System Architecture
- System Functionality
- Halaman Registrasi Organisasi
- Halaman Login
- Forgot Password
- Halaman Profile
- Halaman Change Password
- Halaman Logout
- Halaman Inbox
- Halaman List Dokumen
- Halaman History Saldo
- Halaman History Transaksi

## Riwayat Dokumen

| Versi | Deskripsi | Tanggal | Penulis |
|---|---|---|---|
| 1.0 | Manual Book Digital Signature Aggregator V.1 | 01 Juli 2025 | Via Rahmadani |
| 1.1 | Update Manual Book Signature Aggregator | 04 Juli 2025 | Via Rahmadani |
| 1.2 | Menambahkan Manual Book Menu pengguna dan History Dokumen | 16 Juli 2025 | Via Rahmadani |
| 1.3 | Memperbaharui Dokumen | 28 Agustus 2025 | Dhea Mahdavikia |

## System Architecture

Berikut ini adalah arsitektur sistem yang digunakan pada Digital Signature Aggregator.

## System Functionality

Berikut merupakan fungsional sistem pada Digital Signature Aggregator.

## Halaman Registrasi Organisasi

Untuk dapat melakukan proses sign dan stamp, pengguna diarahkan untuk mendaftarkan akunnya terlebih dahulu. Pengguna dapat mengakses halaman register.

Ketika sudah menampilkan halaman register, pengguna akan mendaftarkan organisasinya terlebih dahulu.

Ketika sudah berhasil mendaftarkan organisasi, pengguna akan diarahkan untuk mendaftarkan akunnya.

Jika pengguna yang akan mendaftarkan diri merupakan warga negara asing, pengguna diarahkan untuk memilih WNA dan menginputkan nomor Kartu Izin Tinggal/Passport.

Ketika sudah berhasil mendaftarkan organisasi dan akun pribadinya, pengguna akan mendapat informasi pesan sukses.

Pengguna akan mendapat pesan melalui email dengan tujuan untuk mengatur password yang akan digunakan untuk proses login pada Digital Signature Aggregator.

Pengguna memilih link **Atur Password Sekarang** untuk mengatur password yang digunakan untuk masuk pada halaman Digital Signature Aggregator.

Tautan atur password tersebut hanya bersifat satu kali pakai (one-time use) dan berlaku selama 24 jam. Jika melebihi batas waktu atau sudah digunakan, pengguna harus meminta tautan baru melalui fitur forgot password pada halaman login.

## Halaman Login

Setelah proses registrasi berhasil, pengguna akan diarahkan ke halaman login untuk mengisi email dan kata sandi sesuai dengan data yang digunakan saat registrasi.

## Forgot Password

Pada halaman login, pengguna juga dapat menggunakan fitur **forgot password** untuk memudahkan proses login apabila pengguna lupa kata sandinya.

Pengguna diminta untuk menginputkan email yang akan dilakukan proses reset password, kemudian pengguna akan mendapatkan pesan melalui email untuk kelanjutan proses reset password.

Setelah diarahkan ke link reset password, pengguna dapat menginputkan **New Password** dan **Confirm New Password** di halaman Reset Password agar dapat login kembali.

Ketika pengguna sudah menginputkan password baru, pengguna akan mendapatkan pesan bahwa perubahan password sudah berhasil dilakukan.

## Halaman Profile

Halaman profil merupakan halaman yang berfungsi untuk mengidentifikasi akun yang berisi informasi pribadi. Berikut adalah halaman yang terdapat pada menu profile Digital Signature Aggregator.

### Account Information

Pada halaman Account Information, pengguna dapat memonitoring informasi pribadi berdasarkan data yang diinputkan pada saat proses registrasi. Jika ada data yang tidak sesuai, pengguna dapat mengubah data tersebut dengan cara memilih button **Change**.

Pengguna dapat melakukan perubahan data sesuai kebutuhan. Jika sudah melakukan perubahan, pengguna dapat menekan button **Save Change**.

### Signature

Halaman Signature bertujuan untuk memudahkan pengguna dalam mengelola list tanda tangan digital untuk mempermudah proses transaksi. Pengguna juga dapat mengelola list tanda tangan tersebut dengan cara **View**, **Download**, dan **Delete** berdasarkan tanda tangan digital yang terdaftar.

Pengguna dapat menambahkan Signature pada button **Add Signature** dengan 3 jenis cara, yaitu gambar, ketik, dan unggah.

Ketika sudah selesai membuat atau mengunggah tanda tangan, pengguna dapat memilih button **Buat**.

### Provider

Proses Add Provider adalah proses utama setelah proses registrasi selesai untuk mempermudah proses transaksi.

Pada halaman Provider, pengguna dapat memilih **Add Provider** untuk proses penyesuaian provider dan organisasi.

Ketika sudah melakukan penyesuaian terhadap registrasi DSA dan organisasi, pengguna diarahkan untuk menyesuaikan provider dengan memilih **Add Provider**.

Setelah berhasil menambahkan provider, pengguna akan mendapat informasi pada email yang berisikan undangan guna melanjutkan proses pembuatan aktivitas akun.

Ketika pengguna sudah memulai proses aktivasi akun, pengguna akan diarahkan pada halaman aktivasi dengan mencentang syarat dan ketentuan pada bagian bawah halaman. Kemudian pengguna memilih button **Selanjutnya** untuk melanjutkan proses selanjutnya.

Ketika pengguna memilih button **Selanjutnya** dan diarahkan pada halaman Data Diri, pengguna akan diminta untuk mengisi data diri tersebut.

Proses pengisian data diri dimulai dengan mengunggah KTP atau Kartu Tanda Penduduk. Pengguna memilih button **Upload Foto KTP**, kemudian pengguna menginputkan data diri sesuai dengan KTP yang sudah diunggah. Jika data diri sudah sesuai, pengguna memilih button **Selanjutnya**.

Ketika data diri sudah sesuai dan berhasil diunggah, pengguna akan diarahkan pada halaman Swafoto.

Untuk memulai proses pengambilan swafoto, pengguna diarahkan pada button **Nyalakan Kamera**. Jika kamera sudah mengarah pada pengguna, pengguna dapat memilih button **Ambil Kamera**.

Ketentuan swafoto:

- Posisikan wajah Anda di tengah.
- Pastikan Anda tidak memakai topi, masker, atau aksesoris yang menghalangi wajah.
- Pastikan pencahayaan Anda cukup.

Jika pengguna sudah berhasil mengambil swafoto, pengguna akan diminta untuk mengunggah swafoto dengan memilih button **Ambil Foto**.

Ketika sudah berhasil mengunggah swafoto, step tersebut merupakan step terakhir. Pengguna dapat melihat Sertifikat Digital Akun dengan memilih button **Lihat Sertifikat**.

Ketika pengguna sudah memilih button **Lihat Sertifikat**, pengguna akan melakukan konfirmasi sertifikat akun dengan memberikan konfirmasi mengenai data pada sertifikat dengan mencentang informasi yang terdapat pada bagian bawah halaman. Pengguna memilih button **Konfirmasi Sertifikat**.

Ketika sertifikat sudah berhasil diterbitkan, pengguna akan diarahkan pada proses pengecekan API Check Status sampai status pada akun tersebut selesai.

### Organization

Pada halaman Organization, pengguna dapat memilih **Add Organization** untuk proses penyesuaian organisasi.

Ketika sudah melakukan penyesuaian terhadap organisasi, pengguna diarahkan untuk memilih button **Add Organization**.

### Account Activity

Account Activity merupakan halaman yang menampilkan riwayat pengguna yang dilakukan pada aplikasi, seperti login, perubahan data, approval atau tanda tangan, transaksi, dan lain sebagainya.

## Halaman Change Password

Halaman Change Password merupakan halaman yang berfungsi untuk memudahkan pengguna guna mengubah passwordnya.

Pengguna diarahkan untuk melakukan input password lama, input password baru, dan input konfirmasi password baru.

Ketika pengguna berhasil mengubah password, pengguna akan otomatis keluar dari aplikasi Digital Signature Aggregator.

## Halaman Logout

Pengguna dapat melakukan logout dari Digital Signature Aggregator yang dapat diakses melalui semua menu pada detail menu profile.

## Halaman Inbox

Menu Inbox menampilkan pesan dokumen yang perlu ditindaklanjuti oleh pengguna yang bersangkutan. Menu Inbox mencakup **To Do**, **On Progress**, dan **Completed**, serta terdapat status terkait dokumen yang memerlukan approval, sign, atau sign & stamp secara digital.

Pada halaman Inbox, ada 3 tugas yang berbeda di setiap kebutuhannya.

| Role | Description |
|---|---|
| Approver | Pengguna memiliki hak akses untuk menyetujui atau menolak dokumen yang diajukan. |
| Signer | Pengguna memiliki hak akses untuk memberikan tanda tangan digital. |
| Signer-Stamp | Pengguna memiliki hak akses untuk menandatangani dan memberikan stamp digital pada dokumen yang diajukan. |

Halaman **To Do** menampilkan dokumen yang perlu ditindaklanjuti oleh Approver, Signer, atau Signer-Stamp sesuai dengan aksi yang dibutuhkan. Dokumen yang akan diproses adalah dokumen dengan status **Waiting**.

Pada halaman Inbox, pengguna dapat menindaklanjuti dokumen dengan memberikan respon sesuai rolenya pada label action.

Setelah pengguna menekan button **Sign Now**, halaman progress akan ditampilkan untuk mengisi kelengkapan keperluan dokumen. Alamat dan reason bersifat optional. Setelah itu, pengguna klik button **Next**.

Setelah menekan button **Next**, pengguna akan diarahkan ke halaman progress selanjutnya, yaitu untuk membuat tanda tangan baru atau memilih tanda tangan yang sudah disimpan sebelumnya serta memberikan stamp pada dokumen.

Jika pengguna ingin membuat tanda tangan baru, pengguna dapat klik icon **Tambah Tanda Tangan**.

Setelah klik icon **Tambah Tanda Tangan**, halaman untuk membuat tanda tangan akan ditampilkan. Jika sudah membuat tanda tangan, pengguna klik **Buat**.

Setelah membuat tanda tangan baru, tanda tangan akan tampil. Untuk menerapkan pada dokumen, pengguna melakukan drag tanda tangan dan drop pada dokumen yang sudah disiapkan, lalu klik button **Selesaikan dan Tandatangani**.

Setelah menekan button **Selesaikan dan Tandatangani**, pop up select authentication method akan ditampilkan. Contoh authentication method yang dipilih adalah session code.

Setelah pengguna memilih session code, pengguna akan mendapatkan informasi.

Setelah itu, pengguna diarahkan untuk menginputkan code yang didapatkan pada pesan melalui email.

Setelah berhasil proses penandatanganan dokumen, pengguna akan mendapatkan informasi “Dokumen berhasil ditandatangani” dan akan redirect ke halaman Inbox tab Completed.

Pada halaman detail **On Progress**, terdapat list dokumen yang masih tahap pengerjaan atau proses penandatanganan. Pengguna dapat melihat dokumen yang telah diajukan melalui fitur **View File**.

Halaman **Completed** berisi list dokumen yang sudah selesai proses transaksi, yaitu approve, sign, sign and stamp. Pada halaman ini, pengguna dapat melihat dokumen dan export dokumen untuk memudahkan pengguna mengecek dokumen apakah sudah selesai diproses atau belum.

## Halaman List Dokumen

Menu List Dokumen merupakan halaman yang menampilkan total dokumen dengan status **finished**, **in progress**, **rejected**, dan total dokumen yang masuk. Untuk memudahkan pengguna mengelompokkan dokumen, pengguna dapat menggunakan filter tag status sesuai status dokumen yang dibutuhkan.

Pada menu List Dokumen, terdapat fitur upload dokumen untuk memudahkan pengguna dalam pengajuan persetujuan, tanda tangan, dan stamp dokumen dengan cara upload dokumen PDF dengan maksimal size 10 MB.

Setelah upload dokumen, pengguna akan diarahkan ke halaman progress untuk mengisi data penerima dan rolenya. Kemudian pengguna klik **Next** dan **Send**.

Setelah pengguna melakukan upload dokumen, sistem akan menampilkan pop up informasi sukses upload dokumen dan redirect ke halaman List Dokumen.

Pada menu List Document, admin dapat melakukan pengecekan isi dokumen sebelum melakukan approval, signing, dan stamp melalui fitur **View** atau icon eye.

Pada menu List Document, terdapat fitur export yang bertujuan untuk membantu admin membuat cadangan atau backup data.

## Halaman History Saldo

Pada menu halaman Saldo, terdapat data total saldo dan list tabel history saldo. Untuk memudahkan pengguna mencari history saldo, pengguna dapat memfilter pada list tabel history saldo.

Pada menu Saldo, pengguna dapat melakukan **Top Up Balance** dengan cara klik button **Top Up Balance** pada menu Saldo. Kemudian pengguna input organisasi dan menginputkan nominal top up minimal Rp10.000.

Pengguna memilih metode pembayaran, yaitu **E-Wallet**, **QRIS**, **Virtual Account**, dan **Virtual Account Recurring**. Setelah memilih metode pembayaran, pengguna memilih jenis metode pembayaran.

Setelah **Cek Tagihan**, sistem akan menampilkan rincian top up dan pengguna dapat membayar top up.

Setelah pengguna klik **Bayar**, pengguna akan diarahkan ke halaman Cara Pembayaran. Pengguna klik **Lanjutkan Pembayaran** untuk mendapatkan kode.

Setelah melanjutkan pembayaran, pengguna akan diarahkan ke halaman jenis metode pembayaran yang sudah dipilih. Pengguna dapat input kode pembayaran. Untuk mendapatkan kode pembayaran, pengguna dapat melihat pada **Show Test Account**.

Setelah input kode pembayaran, pengguna dapat menginputkan kode PIN jenis metode pembayaran. Untuk mendapatkan PIN metode pembayaran, pengguna dapat melihat pada **Show Test PIN**.

Halaman detail **Payment Method** akan ditampilkan. Pengguna dapat melakukan pembayaran dengan cara klik **PAY**.

Setelah pengguna berhasil melakukan transaksi dengan melakukan pembayaran, pengguna kembali ke halaman cara pembayaran di aplikasi Digital Signature Aggregator dan melakukan **Cek Status**. Jika berhasil, pengguna akan mendapatkan pop up “Saldo Berhasil diperbarui”.

Setelah top up berhasil, pengguna dapat mengecek apakah saldo bertambah atau tidak pada halaman menu Saldo.

## Halaman History Transaksi

Menu History Transaksi merupakan halaman yang menampilkan total transaksi yang telah digunakan seperti signing, stamp, reactive, OTP, registrasi, dan session code berdasarkan provider dan organization.

Pada menu History Transaksi terdapat fitur filter date, provider, saldo type, dan organization untuk memudahkan pengguna dalam mencari tanggal transaksi, nama provider, saldo type, dan organization yang dibutuhkan agar lebih efisien dan efektif.
