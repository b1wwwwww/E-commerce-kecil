import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const KURS_USD_KE_IDR = 15000;

function DetailProduk(){
const { id } = useParams();
const [produk, setProduk] = useState(null); // null = belum ada data sama sekali
const [loading, setLoading] = useState(true);

// Setiap kali "id" berubah (misal user pindah dari /produk/1 ke /produk/2),
// Makanya dependency array-nya diisi [id], bukan [] kosong.
useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((data) => {
        setProduk(data);
        setLoading(false);
    });
}, [id]);

if (loading) return <p className="p-6">Memuat produk...</p>;
if (!produk) return <p className="p-6">Produk Tidak Ditemukan</p>;

  // Hitung harga dalam Rupiah dari harga asli USD
  const hargaRupiah = Math.round(produk.price * KURS_USD_KE_IDR);

return(
    <div className="p-6">
        <Link to="/" className="text-blue-500" underline>&larr; Kembali ke Beranda</Link>
        <img src={produk.gambar} className="w-full max-w-sm h-60 object-contain rounded mt-4" alt={produk.nama} />
        <h2 className="text-2xl font-bold mt-4">{produk.title}</h2>
        {/* toLocaleString "id-ID" supaya formatnya jadi 150.000, bukan 150000 */}
        <p className="text-gray-600 mt-2">Rp {hargaRupiah.toLocaleString("id-ID")}</p>
    </div>
    );
}

export default DetailProduk;