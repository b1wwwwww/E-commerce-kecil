import { useState, useEffect } from "react";
import ProdukCard from "../components/ProdukCard";

function Home(){
  // tempat menyimpan data yg di dapat dari API
  const [produk, setProduk] = useState([]);

  // loading buat tanda data nya lagi di proses
  const [loading, setLoading] = useState(true);

  // Error tanda kalau proses fetch gagal 
  const [error, setError] = useState(null);


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

  // jika masih loading tampilkan ini
  if(loading) return <p className="text-center mt-10">Memuat produk...</p>;

  // jika ada error saat fetch
  if(error) return <p className="tect-center mt-10 text-red-500">{error}</p>;

  return(
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {produk.map((p) => (


          <ProdukCard
            key={p.id}
            produk={{ 
              id: p.id,
              nama: p.title, // API : title : nama
              harga: p.price, // API : price : tapi satuannnya USD bkan RUpiajh
              gambar: p.image, // API : image : gambar
              stok: 100, // cuma default stok
            }}
            />
        ))}
      </div>
    </div>
  );
}

export default Home;