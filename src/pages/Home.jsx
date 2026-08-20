import { useState, useEffect } from "react";
import ProdukCard from "../components/ProdukCard";

// biar harga nya rupiah
const KURS_USD_KE_IDR = 15000;

function Home(){
  // tempat menyimpan data yg di dapat dari API
  const [produk, setProduk] = useState([]);

  // loading buat tanda data nya lagi di proses
  const [loading, setLoading] = useState(true);

  // Error tanda kalau proses fetch gagal 
  const [error, setError] = useState(null);

  // Pencarian dan Filter Produk
  const [daftarKategori, setDaftarKategori] = useState([]); // menyimpan list kategori 
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriTerpilih, setKategoriTerpilih] = useState("semua");


  //useEffect dengan depedency array [] artinya (ambil data begitu halaman di buka)
  useEffect(() =>{
    // fetch() = fungsi bawaan browser buat request data ke URL tertentu
    fetch("https://fakestoreapi.com/products")
    .then((res) => res.json()) // ubah response jadi format JSON
    .then((data) => { 
      setProduk(data); // simpan data yg didapat ke state "produk"
      setLoading(false); // data sudah muncul, matikan status loading
    })
    .catch((err) =>{
      // kalau proses fetch gagal, akan masuk ke sini
      setError("Gagal memuat produk. Coba refresh halaman.");
      setLoading(false);
    });
  }, []);

  // useEffect fetch daftar kategori dari endpoint Fake Store API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((data) => setDaftarKategori(data))
    .catch((err) => console.error("Gagal mengambil kategori : ", err));
  }, []);

  // Logika memfilter produk (kombinasi search dan category)
  const produkTersaring = produk.filter((item) => {
    const cocokKataKunci = item.title
    .toLowerCase()
    .includes(kataKunci.toLowerCase());

    // cek apakah kategori cocok dengan dropdown yg di pilih
    const cocokKategori = kategoriTerpilih === "semua" || item.category === kategoriTerpilih;

    // Produk ditampilkan jika LULUS kedua kondisi di atas
    return cocokKataKunci && cocokKategori;
  })

  // jika masih loading tampilkan ini
  if(loading) {
    return(
      <div className="text-center py-20 text-white font-semibold text-lg">
        Memuat data produk...
      </div>
    )
  }

  // jika ada error saat fetch
  if(error) {
    return(
      <div className="text-center py-20 text-red-500 font-semibold text-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Judul Halaman */}
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        Katalog Vintage Touch
      </h1>

      {/* --- FITUR BAR PENCARIAN & FILTER --- */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
        {/* Input Pencarian Teks */}
        <input
          type="text"
          placeholder="Cari produk..."
          value={kataKunci}
          onChange={(e) => setKataKunci(e.target.value)}
          className="w-full md:w-1/2 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500"
        />

        {/* Dropdown Filter Kategori */}
        <select
          value={kategoriTerpilih}
          onChange={(e) => setKategoriTerpilih(e.target.value)}
          className="w-full md:w-1/4 p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-amber-500 capitalize"
        >
          <option value="semua">Semua Kategori</option>
          {daftarKategori.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

    {/* --- RENDERING PRODUK HASIL FILTER --- */}
    {produkTersaring.length === 0 ? (
      <div className="text-center py-12 text-gray-400">
        Produk yang kamu cari tidak ditemukan.
      </div>
      ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {produkTersaring.map((item) => (
        <ProdukCard
          key={item.id}
          // Bungkus data produk menjadi 1 object 
          produk={{
            id: item.id,
            nama: item.title, // API title : namaProduk
            harga: item.price * KURS_USD_KE_IDR, 
            gambar: item.image, // API gambar 
            kategori: item.category,
            stok: item.rating?.count || 10 // opsional
          }}
        />
      ))}
    </div>
  )}
    </div>
  );
}

export default Home;