# 🛍️ MiNiShop - Modern E-Commerce Web App

**MiNiShop** adalah aplikasi web toko online *frontend* bernuansa *dark mode* modern yang menjual berbagai produk vintage dan unik (*eclectic collection*). Aplikasi ini dibangun menggunakan **React** dan **Vite**, terintegrasi langsung dengan **FakeStore API** untuk penyediaan data produk secara *real-time*.

![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## ✨ Fitur Utama

* **🛍️ Katalog Produk Dinamis:** Mengambil data produk, harga, dan gambar langsung dari REST API (FakeStore API).
* **🔍 Fitur Pencarian & Filter Kategori:** Mencari produk berdasarkan kata kunci nama produk serta menyaring berdasarkan kategori secara *real-time*.
* **📄 Pagination (Navigasi Halaman):** Membagi daftar produk secara otomatis menjadi 12 produk per halaman lengkap dengan nomor halaman dinamis.
* **📱 Detail Produk Dinamis:** Halaman khusus detail produk dengan informasi lengkap deskripsi dan konversi harga ke Rupiah (IDR).
* **🛒 Keranjang Belanja:** Manajemen *state* keranjang belanja menggunakan React Context API.
* **🎨 Responsif & Dark Mode:** Tampilan antarmuka yang rapi, modern, dan nyaman di mata di berbagai ukuran layar (Mobile, Tablet, Desktop).
* **🧪 Unit Testing:** Pengujian komponen UI berbasis Vitest & React Testing Library.

---

## 🛠️ Teknologi yang Digunakan

* **Core Framework:** [React.js](https://react.dev/) + [Vite](https://vitejs.dev/)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Routing:** [React Router DOM](https://reactrouter.com/)
* **State Management:** React Context API
* **Data Source:** [Fake Store API](https://fakestoreapi.com/)
* **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)
* **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek ini di komputer kamu:

### 1. Clone Repository
```bash
git clone https://github.com/b1wwwwww/E-commerce-kecil.git
cd E-commerce-kecil
```

### 2. Install Dependensi
```bash
npm install
```

### 3. Jalankan Server Development
```bash
npm run dev
```
Buka browser dan akses alamat `http://localhost:5173`.

---

## 🧪 Cara Menjalankan Unit Test

Untuk memastikan seluruh komponen utama ter-render dengan baik, kamu bisa menjalankan perintah *testing*:

```bash
npm run test
```

---

## 📁 Struktur Folder Proyek

```text
├── src/
│   ├── components/       # Komponen reusable (Navbar, ProdukCard, Button, Badge, dll)
│   ├── context/          # React Context (KeranjangContext.jsx)
│   ├── pages/            # Halaman utama (Home.jsx, DetailProduk.jsx, Keranjang.jsx)
│   ├── App.jsx           # Setup Router & Layout utama
│   └── main.jsx          # Entry point aplikasi
├── index.html            # File HTML utama & konfigurasi <title>
├── vercel.json           # Konfigurasi rewrite SPA untuk Vercel
└── package.json          # List paket & skrip npm
```

---

## 🌐 Live Demo

Aplikasi ini sudah di-deploy dan dapat diakses publik melalui link berikut:  
👉 **[e-commerce-kecil.vercel.app](https://e-commerce-kecil.vercel.app)**

---

<p align="center">Dibuat oleh <b>Nabil Yusra Azura Pratama</b></p>
