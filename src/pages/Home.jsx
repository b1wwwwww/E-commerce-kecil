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

  // State Pagnition 
  const [halamanSekarang, setHalamanSekarang] = useState(1);
  const produkPerHalaman = 12; // 12 produk per halaman

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

  // Reset ke halaman 1 setiap kali kata kunci atau kategori berubah
  useEffect(() => {
    setHalamanSekarang(1);
  }, [kataKunci, kategoriTerpilih]);

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

  // Hitung Potongan Produk per Halaman
  const indeksTerakhir = halamanSekarang * produkPerHalaman;
  const indeksPertama = indeksTerakhir - produkPerHalaman;
  const produkTampil = produkTersaring.slice(indeksPertama, indeksTerakhir);

  // Hitung otomatis berapa total halaman yang dibutuhkan 
  const totalHalaman = Math.ceil(produkTersaring.length / produkPerHalaman);

  // Fungsi Navigasi Halaman 
  const keHalamanSebelumnya = () => {
    if(halamanSekarang > 1){
      setHalamanSekarang((prev) => prev - 1);
    }
  };

  const keHalamanSelanjutnya = () => {
    if(halamanSekarang < totalHalaman){
      setHalamanSekarang((prev) => prev + 1);
    }
  };

  // Tampilan loading 
  if(loading) {
    return(
      <div className="text-center py-20 text-white font-semibold text-lg">
        Memuat data produk...
      </div>
    )
  }

  // jika ada error saat fetch, muncul tampilan ini
  if(error) {
    return(
      <div className="text-center py-20 text-red-500 font-semibold text-lg">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">

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
          {Array.isArray(daftarKategori) &&
          daftarKategori.map((kat) => (
            <option key={kat} value={kat}>
              {kat}
            </option>
          ))}
        </select>
      </div>

    {/* --- RENDERING PRODUK (PAGINATED) --- */}
      {produkTersaring.length === 0 ? (
        <div className="text-center py-12 text-gray-400">
          Produk yang kamu cari tidak ditemukan.
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produkTampil.map((item) => (
              <ProdukCard
                key={item.id}
                 // Bungkus data produk menjadi 1 object 
                produk={{
                  id: item.id,
                  nama: item.title,
                  harga: item.price * KURS_USD_KE_IDR,
                  gambar: item.image,
                  kategori: item.category,
                  stok: item.rating?.count || 10,
                }}
              />
            ))}
          </div>

          {/* --- NAVIGASI PAGINATION --- */}
          {totalHalaman > 1 && (
            <div className="flex justify-center items-center gap-2 mt-8">
              {/* Tombol Sebelumnya */}
              <button
                onClick={keHalamanSebelumnya}
                disabled={halamanSekarang === 1}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
              >
                Sebelumnya
              </button>

              {/* Tombol Nomor Halaman Dinamis (1, 2, 3...) */}
              {Array.from({ length: totalHalaman }, (_, index) => index + 1).map(
                (nomor) => (
                  <button
                    key={nomor}
                    onClick={() => setHalamanSekarang(nomor)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      halamanSekarang === nomor
                        ? "bg-amber-500 text-gray-900 font-bold"
                        : "bg-gray-800 text-white hover:bg-gray-700"
                    }`}
                  >
                    {nomor}
                  </button>
                )
              )}

              {/* Tombol Selanjutnya */}
              <button
                onClick={keHalamanSelanjutnya}
                disabled={halamanSekarang === totalHalaman}
                className="px-4 py-2 bg-amber-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-amber-500 transition"
              >
                Selanjutnya
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Home;