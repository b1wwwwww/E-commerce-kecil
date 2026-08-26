# Dokumentasi Project VintageTouch

Dokumen ini dibuat untuk membantu memahami struktur project, alur kerja aplikasi, dan fungsi setiap file penting. Project ini adalah aplikasi mini shop berbasis React + Vite yang menampilkan produk dari Fake Store API, memiliki fitur login sederhana, keranjang belanja, pencarian, filter kategori, pagination, dan proteksi halaman keranjang.

## Gambaran Umum Project

VintageTouch adalah aplikasi toko online sederhana.

Fitur utama:

- Menampilkan daftar produk dari API.
- Mencari produk berdasarkan kata kunci.
- Filter produk berdasarkan kategori.
- Pagination daftar produk.
- Melihat detail produk.
- Login dan register sederhana.
- Menambahkan produk ke keranjang.
- Menampilkan badge jumlah item keranjang di header.
- Melindungi halaman keranjang supaya hanya bisa dibuka setelah login.
- Menyimpan status login dan isi keranjang di `localStorage`.

Teknologi yang digunakan:

- `React` untuk membuat UI berbasis komponen.
- `Vite` untuk menjalankan development server dan build project.
- `React Router` untuk pindah halaman.
- `Tailwind CSS` untuk styling tampilan.
- `Vitest` dan `Testing Library` untuk test.
- `Fake Store API` sebagai sumber data produk.

## Struktur Folder

```text
minishop/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── Badge.jsx
│   │   ├── Button.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── Layout.jsx
│   │   ├── ProdukCard.jsx
│   │   ├── ProdukCard.test.jsx
│   │   └── ProtectedRoute.jsx
│   ├── context/
│   │   ├── AuthContext.jsx
│   │   ├── KeranjangContext.jsx
│   │   └── KeranjangContext.test.jsx
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── pages/
│   │   ├── DetailProduk.jsx
│   │   ├── Home.jsx
│   │   ├── Keranjang.jsx
│   │   ├── Login.jsx
│   │   ├── Login.test.jsx
│   │   └── Register.jsx
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## Alur Besar Aplikasi

Alur aplikasi dimulai dari `main.jsx`.

```text
main.jsx
  -> membungkus App dengan AuthProvider dan KeranjangProvider
  -> App.jsx mengatur route halaman
  -> Layout.jsx menampilkan Header, Outlet halaman, dan Footer
  -> Halaman yang aktif tampil sesuai URL
```

Penjelasan sederhananya:

1. Browser membuka `index.html`.
2. React masuk lewat `src/main.jsx`.
3. `main.jsx` merender `<App />` ke elemen `#root`.
4. `App.jsx` menentukan route, misalnya `/`, `/login`, `/keranjang`.
5. Semua halaman berada di dalam `Layout`, jadi header dan footer tetap muncul di banyak halaman.
6. Data login dan keranjang tersedia secara global karena aplikasi dibungkus oleh context.

## Flow Routing

Routing utama ada di `src/App.jsx`.

Daftar route:

```text
/              -> Home
/produk/:id    -> DetailProduk
/keranjang     -> Keranjang, tapi diproteksi ProtectedRoute
/login         -> Login
/register      -> Register
*              -> 404
```

Route `/keranjang` dibungkus dengan `ProtectedRoute`.

Artinya:

- Kalau user sudah login, halaman keranjang ditampilkan.
- Kalau user belum login, user diarahkan ke halaman login.

## Flow Home dan Produk

File utama untuk halaman beranda adalah `src/pages/Home.jsx`.

Flow-nya:

```text
Home dibuka
  -> fetch daftar produk dari https://fakestoreapi.com/products
  -> fetch daftar kategori dari https://fakestoreapi.com/products/categories
  -> simpan produk dan kategori ke state
  -> user bisa search produk
  -> user bisa filter kategori
  -> produk difilter
  -> produk dipotong sesuai pagination
  -> setiap produk ditampilkan memakai ProdukCard
```

State penting di `Home.jsx`:

- `produk`: menyimpan semua produk dari API.
- `loading`: menandai data sedang dimuat.
- `error`: menyimpan pesan jika fetch gagal.
- `daftarKategori`: menyimpan kategori dari API.
- `kataKunci`: menyimpan input pencarian.
- `kategoriTerpilih`: menyimpan kategori yang sedang dipilih.
- `halamanSekarang`: menyimpan halaman pagination saat ini.

Logika filter:

```text
produk tampil jika:
  nama produk cocok dengan kata kunci
  dan kategori produk cocok dengan kategori yang dipilih
```

Logika pagination:

```text
produkPerHalaman = 12
indeksPertama = indeksTerakhir - produkPerHalaman
produkTampil = produkTersaring.slice(indeksPertama, indeksTerakhir)
```

## Flow Tambah ke Keranjang

Tombol tambah keranjang ada di `src/components/ProdukCard.jsx`.

Flow-nya:

```text
User klik Tambah ke Keranjang
  -> cek apakah user sudah login
  -> kalau belum login:
       redirect ke /login
       simpan halaman asal agar setelah login bisa balik
  -> kalau sudah login:
       panggil tambahKeKeranjang(produk)
       tampilkan notifikasi "Produk masuk keranjang"
       angka badge di header bertambah
```

Data keranjang diatur oleh `src/context/KeranjangContext.jsx`.

Saat produk ditambahkan:

- Jika produk belum ada di keranjang, produk masuk dengan `jumlah: 1`.
- Jika produk sudah ada, tidak dibuat dobel, tetapi `jumlah` produk tersebut ditambah 1.

Contoh:

```text
Klik produk A satu kali  -> jumlah produk A = 1
Klik produk A dua kali   -> jumlah produk A = 2
Badge header menampilkan -> 2
```

## Flow Login dan Redirect Balik

Login ada di `src/pages/Login.jsx`.

Saat user belum login dan klik tambah keranjang:

```text
ProdukCard
  -> navigate("/login", { state: { from: halamanSaatIni } })
```

Lalu setelah login berhasil:

```text
Login
  -> ambil location.state.from
  -> navigate(from, { replace: true })
```

Jadi user tidak selalu dilempar ke keranjang. User bisa kembali ke halaman asal tempat dia klik tombol tambah.

Jika user klik daftar dari halaman login:

```text
Login
  -> kirim state from ke Register
Register
  -> setelah daftar selesai, balik ke Login sambil tetap membawa from
Login
  -> setelah login berhasil, balik ke halaman asal
```

## Flow Badge Keranjang di Header

Badge angka merah ada di `src/components/Header.jsx`.

Header mengambil data:

```js
const { jumlahItem } = useKeranjang();
```

`jumlahItem` berasal dari `KeranjangContext.jsx`.

```js
const jumlahItem = item.reduce((total, p) => total + p.jumlah, 0);
```

Artinya jumlah badge bukan sekadar jumlah jenis produk, tetapi total quantity.

Contoh:

```text
Kaos jumlah 2
Tas jumlah 1
Total badge = 3
```

Kalau jumlah lebih dari 99, badge ditampilkan sebagai `99+` supaya tetap rapi.

## Flow Halaman Keranjang

Halaman keranjang ada di `src/pages/Keranjang.jsx`.

Flow-nya:

```text
Keranjang dibuka
  -> ambil item dari KeranjangContext
  -> kalau item kosong, tampilkan "Keranjang masih kosong"
  -> kalau ada item, tampilkan daftar produk
  -> user bisa tambah jumlah
  -> user bisa kurangi jumlah
  -> user bisa hapus produk
  -> total harga dihitung otomatis
```

Total harga:

```js
const total = item.reduce((sum, p) => sum + p.harga * p.jumlah, 0);
```

Artinya:

```text
total = harga produk x jumlah produk
```

## Penjelasan Per File

### `src/main.jsx`

File entry point React.

Tugasnya:

- Mengambil elemen `#root` dari `index.html`.
- Merender aplikasi React.
- Membungkus aplikasi dengan `AuthProvider`.
- Membungkus aplikasi dengan `KeranjangProvider`.
- Mengimport `index.css`.

Kenapa provider diletakkan di sini?

Karena semua halaman dan komponen butuh akses global ke data login dan data keranjang.

### `src/App.jsx`

File pengatur route aplikasi.

Tugasnya:

- Menggunakan `BrowserRouter`.
- Menentukan daftar halaman menggunakan `Routes` dan `Route`.
- Membungkus halaman dengan `Layout`.
- Melindungi route `/keranjang` menggunakan `ProtectedRoute`.
- Menampilkan halaman 404 jika route tidak ditemukan.

### `src/components/Layout.jsx`

Komponen layout utama.

Tugasnya:

- Menampilkan `Header`.
- Menampilkan halaman aktif lewat `<Outlet />`.
- Menampilkan `Footer`.
- Memberi padding atas pada `main` supaya konten tidak tertutup header fixed.

### `src/components/Header.jsx`

Komponen navbar/header.

Tugasnya:

- Menampilkan logo `VintageTouch`.
- Menampilkan link `Beranda` dan `Keranjang`.
- Menampilkan link `Login` dan `Daftar` jika belum login.
- Menampilkan email dan tombol `Logout` jika sudah login.
- Menampilkan badge merah jumlah item keranjang.

Bagian penting:

```js
const { user, logout } = useAuth();
const { jumlahItem } = useKeranjang();
```

`useAuth` dipakai untuk status login.
`useKeranjang` dipakai untuk angka badge keranjang.

### `src/components/Footer.jsx`

Komponen footer sederhana.

Tugasnya:

- Menampilkan copyright aplikasi.

### `src/components/ProdukCard.jsx`

Komponen kartu produk di halaman home.

Tugasnya:

- Menampilkan gambar produk.
- Menampilkan nama produk.
- Menampilkan harga produk.
- Menampilkan badge `Stok Habis` jika stok 0.
- Menyediakan link ke halaman detail produk.
- Menyediakan tombol `Tambah ke Keranjang`.
- Mengecek login sebelum menambahkan produk.
- Menampilkan notifikasi jika produk berhasil masuk keranjang.

Bagian penting:

```js
if (!user) {
    navigate("/login", { state: { from: location.pathname } });
    return;
}
```

Artinya kalau belum login, user tidak boleh langsung menambah produk ke keranjang.

### `src/components/Button.jsx`

Komponen tombol reusable.

Tugasnya:

- Membuat style tombol yang konsisten.
- Mendukung variasi `primary` dan `secondary`.
- Bisa menerima tambahan class lewat props `className`.
- Bisa menerima function klik lewat props `onClick`.

### `src/components/Badge.jsx`

Komponen label kecil.

Tugasnya:

- Menampilkan badge warna merah, hijau, atau kuning.
- Dipakai untuk label seperti `Stok Habis`.

### `src/components/ProtectedRoute.jsx`

Komponen untuk melindungi halaman tertentu.

Tugasnya:

- Mengecek apakah user sudah login.
- Jika sudah login, tampilkan halaman.
- Jika belum login, redirect ke `/login`.

Bagian penting:

```js
return user ? children : <Navigate to="/login" />;
```

### `src/context/AuthContext.jsx`

Context untuk login.

Tugasnya:

- Menyimpan data user.
- Menyediakan fungsi `login`.
- Menyediakan fungsi `logout`.
- Membuat data user bisa diakses dari komponen mana saja.

Data user disimpan memakai `useLocalStorage`, jadi status login tetap ada walaupun halaman direfresh.

Nilai `user`:

- `null`: belum login.
- `{ email: "..." }`: sudah login.

### `src/context/KeranjangContext.jsx`

Context untuk keranjang.

Tugasnya:

- Menyimpan daftar item keranjang.
- Menyediakan fungsi `tambahKeKeranjang`.
- Menyediakan fungsi `hapusDariKeranjang`.
- Menyediakan fungsi `ubahJumlah`.
- Menghitung `jumlahItem` untuk badge header.

Data keranjang juga disimpan memakai `useLocalStorage`.

Struktur item keranjang:

```js
{
    id: 1,
    nama: "Produk",
    harga: 150000,
    gambar: "url-gambar",
    jumlah: 1
}
```

### `src/hooks/useLocalStorage.js`

Custom hook untuk menyimpan state ke `localStorage`.

Tugasnya:

- Membaca data awal dari `localStorage`.
- Jika belum ada data, pakai nilai awal.
- Setiap state berubah, simpan ulang ke `localStorage`.

Dipakai oleh:

- `AuthContext.jsx` untuk menyimpan user.
- `KeranjangContext.jsx` untuk menyimpan keranjang.

### `src/pages/Home.jsx`

Halaman beranda.

Tugasnya:

- Mengambil data produk dari API.
- Mengambil data kategori dari API.
- Menampilkan search input.
- Menampilkan dropdown kategori.
- Memfilter produk berdasarkan search dan kategori.
- Membagi produk dengan pagination.
- Menampilkan produk memakai `ProdukCard`.

Konversi harga:

```js
const KURS_USD_KE_IDR = 15000;
harga: item.price * KURS_USD_KE_IDR
```

Karena Fake Store API memakai harga USD, project ini mengubahnya menjadi Rupiah secara sederhana.

### `src/pages/DetailProduk.jsx`

Halaman detail produk.

Tugasnya:

- Mengambil `id` produk dari URL menggunakan `useParams`.
- Fetch detail produk dari API berdasarkan `id`.
- Menampilkan gambar, kategori, nama, harga, dan deskripsi produk.
- Menyediakan tombol tambah ke keranjang.

Catatan penting:

- Tombol tambah keranjang di `ProdukCard.jsx` sudah mengecek login.
- Tombol tambah keranjang di `DetailProduk.jsx` saat ini langsung memanggil `tambahKeKeranjang`, jadi jika ingin aturan login benar-benar konsisten di semua tempat, tombol detail juga bisa dibuat memakai pengecekan login seperti `ProdukCard`.

### `src/pages/Keranjang.jsx`

Halaman keranjang belanja.

Tugasnya:

- Menampilkan daftar item keranjang.
- Menampilkan pesan jika keranjang kosong.
- Mengubah jumlah produk dengan tombol `+` dan `-`.
- Menghapus produk dari keranjang.
- Menghitung total harga.

Halaman ini diproteksi oleh `ProtectedRoute`, jadi hanya bisa dibuka jika user sudah login.

### `src/pages/Login.jsx`

Halaman login.

Tugasnya:

- Menampilkan form email dan password.
- Validasi email harus mengandung `@`.
- Validasi password minimal 6 karakter.
- Jika valid, panggil fungsi `login`.
- Setelah login, redirect ke halaman asal.

Bagian redirect:

```js
const from = location.state?.from || "/keranjang";
navigate(from, { replace: true });
```

Artinya jika user login karena sebelumnya diarahkan dari tombol tertentu, user akan kembali ke halaman itu.

### `src/pages/Register.jsx`

Halaman daftar akun.

Tugasnya:

- Menampilkan form email, password, dan konfirmasi password.
- Validasi email.
- Validasi password minimal 6 karakter.
- Validasi konfirmasi password harus sama.
- Setelah daftar berhasil, user diarahkan ke login.
- State `from` tetap dibawa agar setelah login user bisa kembali ke halaman asal.

### `src/index.css`

File CSS global yang aktif dipakai project.

Tugasnya:

- Mengimport Tailwind CSS.
- Mengatur warna dasar, font, background, dan style global.
- Mengatur ukuran root aplikasi.
- Mengatur style default untuk heading, paragraph, dan code.

Bagian penting:

```css
@import "tailwindcss";
```

Ini membuat class Tailwind seperti `flex`, `grid`, `bg-gray-800`, dan `rounded-lg` bisa digunakan.

### `src/App.css`

File CSS tambahan.

Tugasnya:

- Berisi style tambahan dari template atau eksperimen awal.
- Saat ini `main.jsx` tidak mengimport `App.css`, jadi style utama aplikasi lebih banyak berasal dari `index.css` dan class Tailwind langsung di JSX.

### `vite.config.js`

File konfigurasi Vite.

Tugasnya:

- Mengaktifkan plugin React.
- Mengaktifkan plugin Tailwind CSS.
- Mengatur konfigurasi test Vitest.

Bagian penting:

```js
plugins: [react(), tailwindcss()]
```

Jika `tailwindcss()` tidak dipasang di sini, tampilan bisa rusak karena class Tailwind tidak diproses dengan benar.

### `src/components/ProdukCard.test.jsx`

File test untuk `ProdukCard`.

Tugasnya:

- Mengecek nama produk tampil dengan benar.
- Mengecek badge `Stok Habis` tampil jika stok produk 0.

Karena `ProdukCard` memakai router, auth, dan keranjang, test membungkus komponen dengan:

- `MemoryRouter`
- `AuthProvider`
- `KeranjangProvider`

### `src/context/KeranjangContext.test.jsx`

File test untuk `KeranjangContext`.

Tugasnya:

- Mengecek bahwa fungsi `tambahKeKeranjang` bisa menambahkan produk.
- Mengecek jumlah item berubah setelah tombol tambah diklik.

### `src/pages/Login.test.jsx`

File test untuk halaman login.

Tugasnya:

- Mengecek error muncul jika email tidak valid.
- Mengecek error muncul jika password kurang dari 6 karakter.

## Cara Menjelaskan Project Saat Ditanya

Kamu bisa menjelaskan dengan urutan seperti ini:

1. Project ini adalah mini shop React bernama VintageTouch.
2. Data produk diambil dari Fake Store API.
3. Routing diatur di `App.jsx` menggunakan React Router.
4. Layout utama ada di `Layout.jsx`, yang menampilkan header, halaman aktif, dan footer.
5. Halaman utama `Home.jsx` melakukan fetch produk, search, filter kategori, dan pagination.
6. Produk ditampilkan lewat komponen reusable `ProdukCard`.
7. Keranjang memakai `KeranjangContext`, jadi data keranjang bisa dipakai oleh banyak komponen.
8. Login memakai `AuthContext`, jadi status login juga global.
9. Data login dan keranjang disimpan ke `localStorage` lewat custom hook `useLocalStorage`.
10. Halaman keranjang diproteksi dengan `ProtectedRoute`, sehingga user harus login dulu.
11. Jika belum login dan klik tambah keranjang, user diarahkan ke login.
12. Setelah login, user kembali ke halaman asal.
13. Jika produk berhasil ditambahkan, muncul notifikasi dan badge merah di header bertambah.

Contoh jawaban singkat:

```text
Project saya adalah mini shop React. Alur awalnya dari main.jsx, lalu App.jsx mengatur routing. Semua halaman dibungkus Layout agar header dan footer konsisten. Data produk diambil di Home.jsx dari Fake Store API, lalu bisa dicari, difilter kategori, dan dipagination. Setiap produk ditampilkan dengan ProdukCard. Untuk data login saya memakai AuthContext, sedangkan data keranjang memakai KeranjangContext. Keduanya disimpan ke localStorage melalui custom hook useLocalStorage. Halaman keranjang dilindungi ProtectedRoute, jadi user harus login dulu sebelum membuka keranjang atau menambah produk.
```

## Hal yang Perlu Diperhatikan Saat Presentasi

Beberapa poin yang bagus untuk disebutkan:

- Project memakai konsep component-based React.
- State lokal dipakai untuk data yang hanya dibutuhkan satu halaman, seperti search dan pagination di `Home.jsx`.
- Context dipakai untuk data global, seperti user login dan keranjang.
- `localStorage` dipakai supaya data tidak hilang saat refresh.
- Route protection dipakai untuk menjaga halaman keranjang.
- Fake Store API dipakai sebagai sumber data produk.
- Tailwind CSS dipakai untuk styling cepat lewat className.
- Test dibuat untuk memastikan komponen dan context berjalan sesuai harapan.

## Catatan Pengembangan Lanjutan

Fitur yang bisa dikembangkan lagi:

- Membuat tombol tambah keranjang di halaman detail juga wajib login seperti di `ProdukCard`.
- Menambahkan toast notification global agar notifikasi lebih konsisten.
- Menambahkan fitur checkout.
- Menambahkan halaman profile user.
- Menyimpan akun register ke backend sungguhan.
- Menghubungkan login ke API authentication asli.
- Menambahkan test untuk badge keranjang dan redirect login.

