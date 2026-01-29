# USER MANUAL - APLIKASI WEB KRIPTOGRAFI

## 📋 Daftar Isi

1. [Tentang Aplikasi](#tentang-aplikasi)
2. [Fitur Aplikasi](#fitur-aplikasi)
3. [Persyaratan Sistem](#persyaratan-sistem)
4. [Instalasi dan Setup](#instalasi-dan-setup)
5. [Menjalankan Aplikasi](#menjalankan-aplikasi)
6. [Panduan Penggunaan](#panduan-penggunaan)
7. [Troubleshooting](#troubleshooting)

---

## 🔐 Tentang Aplikasi

Aplikasi Web Kriptografi adalah aplikasi berbasis web yang menyediakan layanan enkripsi dan dekripsi teks menggunakan dua algoritma kriptografi:

- **AES-256 (Advanced Encryption Standard)**: Algoritma enkripsi simetris yang sangat aman dan banyak digunakan di industri
- **Vigenere Cipher**: Algoritma enkripsi klasik berbasis substitusi polyalphabetic

### Teknologi yang Digunakan

- **Backend**: Node.js dengan Express.js
- **Database**: SQLite3
- **Frontend**: HTML5, CSS3, JavaScript, Bootstrap 5
- **Keamanan**: BCrypt untuk hashing password, Express-Session untuk manajemen sesi

---

## ✨ Fitur Aplikasi

### 1. Autentikasi Pengguna

- ✅ Registrasi akun baru
- ✅ Login dengan username dan password
- ✅ Logout
- ✅ Session management

### 2. Enkripsi & Dekripsi

- ✅ AES-256 CBC Encryption/Decryption
- ✅ Vigenere Cipher Encryption/Decryption
- ✅ Input teks bebas
- ✅ Custom key/password
- ✅ Copy hasil ke clipboard

### 3. Riwayat (History)

- ✅ Menyimpan semua aktivitas enkripsi/dekripsi per user
- ✅ Menampilkan detail: algoritma, operasi, waktu, teks, hasil
- ✅ Hapus riwayat individual
- ✅ Hapus semua riwayat sekaligus

### 4. User Interface

- ✅ Responsive design (mobile-friendly)
- ✅ Bootstrap 5 untuk tampilan modern
- ✅ SweetAlert2 untuk notifikasi interaktif
- ✅ Bootstrap Icons

---

## 💻 Persyaratan Sistem

### Minimum Requirements:

- **Operating System**: Windows 10/11, macOS 10.14+, Linux (Ubuntu 18.04+)
- **Node.js**: Version 14.x atau lebih baru
- **NPM**: Version 6.x atau lebih baru
- **RAM**: 2 GB (recommended 4 GB)
- **Storage**: 100 MB free space
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

### Cara Cek Versi Node.js dan NPM:

```bash
node --version
npm --version
```

Jika belum terinstall, download dari: https://nodejs.org/

---

## 🚀 Instalasi dan Setup

### Step 1: Download/Clone Aplikasi

Download aplikasi dan ekstrak ke folder pilihan Anda, misalnya:

```
C:\Users\YourName\crypto-app
```

atau

```
/home/username/crypto-app
```

### Step 2: Buka Terminal/Command Prompt

- **Windows**: Tekan `Win + R`, ketik `cmd`, tekan Enter
- **macOS**: Tekan `Cmd + Space`, ketik `Terminal`, tekan Enter
- **Linux**: Tekan `Ctrl + Alt + T`

### Step 3: Masuk ke Folder Aplikasi

```bash
cd path/to/crypto-app
```

Contoh Windows:

```bash
cd C:\Users\YourName\crypto-app
```

Contoh macOS/Linux:

```bash
cd /home/username/crypto-app
```

### Step 4: Install Dependencies

Jalankan perintah berikut untuk menginstall semua package yang diperlukan:

```bash
npm install
```

Tunggu hingga proses instalasi selesai.

### Step 5: Verifikasi Instalasi

Pastikan semua file ada:

```
crypto-app/
├── server.js
├── package.json
├── crypto_app.db (akan dibuat otomatis)
└── public/
    ├── login.html
    ├── dashboard.html
    ├── login.js
    ├── dashboard.js
    └── style.css
```

---

## ▶️ Menjalankan Aplikasi

Pastikan sudah menjalankan perintah berikut untuk menginstall semua package yang diperlukan:

```bash
npm install
```

### Cara 1: Mode Normal

```bash
npm start
```

### Cara 2: Mode Development (auto-restart saat ada perubahan)

```bash
npm run dev
```

### Output yang Akan Muncul:

```
Database terhubung
Server berjalan di http://localhost:3000
```

### Akses Aplikasi:

Buka browser dan kunjungi:

```
http://localhost:3000
```

### Menghentikan Server:

Tekan `Ctrl + C` di terminal

---

## 📖 Panduan Penggunaan

### A. REGISTRASI AKUN BARU

1. **Buka aplikasi** di browser: `http://localhost:3000`
2. Klik tab **"Register"**
3. Isi form registrasi:
   - **Username**: Pilih username unik (contoh: `johndoe`)
   - **Email**: Masukkan email valid (contoh: `john@example.com`)
   - **Password**: Minimal 6 karakter (contoh: `mypassword123`)
   - **Konfirmasi Password**: Ketik ulang password yang sama
4. Klik tombol **"Register"**
5. Jika berhasil, akan muncul notifikasi "Registrasi berhasil!" dan otomatis pindah ke tab Login

**⚠️ Catatan:**

- Username dan email harus unik (tidak boleh sudah terdaftar)
- Password minimal 6 karakter untuk keamanan

---

### B. LOGIN

1. Di halaman login, klik tab **"Login"**
2. Masukkan:
   - **Username**: Username yang sudah didaftarkan
   - **Password**: Password akun Anda
3. Klik tombol **"Login"**
4. Jika berhasil, Anda akan diarahkan ke Dashboard

**⚠️ Troubleshooting:**

- Jika muncul "Username atau password salah", cek kembali input Anda
- Pastikan Caps Lock tidak aktif

---

### C. MENGGUNAKAN FITUR ENKRIPSI

#### 1. Enkripsi dengan AES-256

**Langkah-langkah:**

1. Di Dashboard, pilih **"AES-256"** (sudah terpilih secara default)
2. Pilih operasi **"Enkripsi"**
3. Masukkan teks yang ingin dienkripsi di **"Teks Input"**
   - Contoh: `Hello, this is a secret message!`
4. Masukkan kunci enkripsi di **"Kunci (Key)"**
   - Contoh: `mySecretKey123`
   - Gunakan kunci yang kuat dan mudah diingat
5. Klik tombol **"Proses"**
6. Hasil enkripsi akan muncul di bagian **"Hasil"**
   - Contoh output: `a1b2c3d4e5f6...:1234567890abcdef...`
7. Klik tombol **"Copy"** untuk menyalin hasil

**Format Output AES:**

```
[IV]:[EncryptedText]
```

- IV (Initialization Vector): 32 karakter hex
- EncryptedText: Teks terenkripsi dalam hex

**💡 Tips:**

- Simpan kunci Anda dengan aman! Tanpa kunci, teks tidak bisa didekripsi
- Gunakan kunci yang panjang dan kompleks untuk keamanan maksimal
- AES-256 adalah standar enkripsi yang sangat aman

---

#### 2. Enkripsi dengan Vigenere Cipher

**Langkah-langkah:**

1. Di Dashboard, pilih **"Vigenere"**
2. Pilih operasi **"Enkripsi"**
3. Masukkan teks yang ingin dienkripsi
   - Contoh: `ATTACKATDAWN`
4. Masukkan kunci (hanya huruf A-Z)
   - Contoh: `LEMON`
   - ⚠️ **Penting**: Kunci Vigenere hanya boleh huruf (A-Z atau a-z)
5. Klik tombol **"Proses"**
6. Hasil enkripsi akan muncul
   - Contoh output: `LXFOPVEFRNHR`

**Aturan Vigenere:**

- Kunci hanya boleh berisi huruf (A-Z, a-z)
- Angka dan spesial karakter tidak akan dienkripsi
- Case-sensitive: huruf besar/kecil akan tetap terjaga

**💡 Tips:**

- Gunakan kata atau frasa sebagai kunci
- Semakin panjang kunci, semakin aman enkripsinya
- Vigenere cocok untuk teks pendek dan pembelajaran

---

### D. MENGGUNAKAN FITUR DEKRIPSI

#### 1. Dekripsi dengan AES-256

**Langkah-langkah:**

1. Pilih **"AES-256"**
2. Pilih operasi **"Dekripsi"**
3. Masukkan teks terenkripsi di **"Teks Input"**
   - Contoh: `a1b2c3d4e5f6...:1234567890abcdef...`
   - ⚠️ Harus dalam format lengkap dengan IV
4. Masukkan **kunci yang sama** dengan saat enkripsi
   - Contoh: `mySecretKey123`
5. Klik tombol **"Proses"**
6. Teks asli akan muncul di bagian **"Hasil"**

**⚠️ Error yang Mungkin Terjadi:**

- **"Format enkripsi tidak valid"**: Pastikan format input benar (IV:EncryptedText)
- **"Error during decryption"**: Kunci yang digunakan salah
- **Hasil tidak terbaca**: Teks input atau kunci salah

---

#### 2. Dekripsi dengan Vigenere

**Langkah-langkah:**

1. Pilih **"Vigenere"**
2. Pilih operasi **"Dekripsi"**
3. Masukkan teks terenkripsi
   - Contoh: `LXFOPVEFRNHR`
4. Masukkan **kunci yang sama** dengan saat enkripsi
   - Contoh: `LEMON`
5. Klik tombol **"Proses"**
6. Teks asli akan muncul
   - Output: `ATTACKATDAWN`

---

### E. MELIHAT RIWAYAT (HISTORY)

**Fitur Riwayat:**

- Menyimpan semua aktivitas enkripsi/dekripsi Anda
- Menampilkan: Waktu, Algoritma, Operasi, Teks Asli, Hasil
- Kunci disembunyikan untuk keamanan (ditampilkan sebagai \*\*\*\*)

**Cara Melihat:**

1. Scroll ke bawah ke bagian **"Riwayat Enkripsi/Dekripsi"**
2. Lihat tabel riwayat dengan semua detail
3. Hover mouse pada teks yang terpotong untuk melihat full text

**Informasi yang Ditampilkan:**

- **Waktu**: Tanggal dan jam operasi dilakukan
- **Algoritma**: AES-256 atau Vigenere (dengan badge warna)
- **Operasi**: Enkripsi (hijau) atau Dekripsi (merah)
- **Teks Asli**: Teks input yang diproses
- **Hasil**: Output dari enkripsi/dekripsi
- **Kunci**: Disembunyikan untuk keamanan

---

### F. MENGHAPUS RIWAYAT

#### Hapus Satu Riwayat:

1. Pada baris riwayat yang ingin dihapus
2. Klik tombol **🗑️** (ikon trash) di kolom "Aksi"
3. Konfirmasi dengan klik **"Ya, Hapus"**
4. Riwayat akan terhapus

#### Hapus Semua Riwayat:

1. Klik tombol **"Hapus Semua"** di pojok kanan atas tabel
2. Konfirmasi dengan klik **"Ya, Hapus Semua"**
3. Semua riwayat akan terhapus permanen

**⚠️ Perhatian:**

- Penghapusan bersifat permanen dan tidak dapat dibatalkan
- Pastikan Anda tidak memerlukan data tersebut sebelum menghapus

---

### G. LOGOUT

**Cara Logout:**

1. Klik tombol **"Logout"** di pojok kanan atas navbar
2. Konfirmasi dengan klik **"Ya, Logout"**
3. Anda akan diarahkan kembali ke halaman Login

**Session Management:**

- Session aktif selama 24 jam
- Setelah 24 jam, Anda perlu login kembali
- Logout akan menghapus session secara manual

---

## 🔧 Troubleshooting

### Problem 1: Server Tidak Bisa Dijalankan

**Error**: `Error: Cannot find module 'express'`

**Solusi**:

```bash
npm install
```

---

### Problem 2: Port 3000 Sudah Digunakan

**Error**: `Error: listen EADDRINUSE: address already in use :::3000`

**Solusi**:

**Windows:**

```bash
netstat -ano | findstr :3000
taskkill /PID [PID_NUMBER] /F
```

**macOS/Linux:**

```bash
lsof -ti:3000 | xargs kill -9
```

Atau ubah port di `server.js`:

```javascript
const PORT = 3001; // Ganti dari 3000 ke 3001
```

---

### Problem 3: Database Error

**Error**: `Error membuka database`

**Solusi**:

1. Hapus file `crypto_app.db` (jika ada)
2. Restart server
3. Database baru akan dibuat otomatis

---

### Problem 4: Tidak Bisa Login Setelah Register

**Solusi**:

1. Cek apakah registrasi benar-benar berhasil
2. Pastikan username dan password yang dimasukkan benar
3. Coba clear browser cache atau gunakan Incognito mode
4. Restart server

---

### Problem 5: Dekripsi AES Gagal

**Error**: Hasil dekripsi tidak sesuai atau error

**Penyebab**:

1. Kunci yang digunakan berbeda dengan saat enkripsi
2. Format input tidak benar (harus ada IV)
3. Teks terenkripsi sudah dimodifikasi

**Solusi**:

- Pastikan menggunakan kunci yang sama persis
- Copy-paste teks terenkripsi lengkap (termasuk IV)
- Jangan mengedit teks terenkripsi

---

### Problem 6: Browser Tidak Bisa Akses localhost

**Solusi**:

1. Pastikan server sudah running
2. Cek apakah URL benar: `http://localhost:3000` (bukan https)
3. Coba akses dengan `http://127.0.0.1:3000`
4. Disable VPN atau Proxy
5. Coba browser lain

---

## 📝 Catatan Penting

1. **Keamanan Kunci**: Simpan kunci enkripsi Anda dengan aman. Jika hilang, data tidak bisa didekripsi.

2. **Backup Data**: Secara berkala backup file `crypto_app.db`.

3. **Port**: Pastikan port 3000 tidak digunakan aplikasi lain.

4. **Browser**: Gunakan browser modern untuk pengalaman terbaik.

5. **Node.js Version**: Gunakan versi LTS untuk stabilitas.

---

## 🎓 Tips Penggunaan

1. **Kunci AES**: Gunakan kombinasi huruf, angka, dan simbol (min. 12 karakter)
   - ✅ Baik: `MyS3cur3P@ssw0rd!2024`
   - ❌ Lemah: `password123`

2. **Kunci Vigenere**: Gunakan kata/frasa yang mudah diingat
   - ✅ Baik: `SECRETKEY` atau `CRYPTOGRAPHY`
   - ❌ Lemah: `A` atau `ABC`

3. **Testing**: Selalu test dekripsi setelah enkripsi untuk memastikan kunci benar

4. **Dokumentasi**: Catat kunci yang Anda gunakan di tempat aman

---

**Selamat Menggunakan Aplikasi Kriptografi! 🔐**

\_Versi 1.0.0 - 2025_Muhammad Ferbrian Zeo
