import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function DetailProduk(){
const { id } = useParams();
const [produk, setProduk] = useState(null); // null = belum ada data sama sekali
const [loading, setLoading] = useState(true);

// Setiap kali "id" berubah (misal user pindah dari /produk/1 ke /produk/2),
// Makanya dependency array-nya diisi [id], bukan [] kosong.
useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json)
    .then((data) => {
        setProduk(data);
        setLoading(false);
    });
}, [id]);

if (loading) return <p className="p-6">Memuat produk...</p>;
if (!produk) return <p className="p-6">Produk Tidak Ditemukan</p>;

return(
    <div className="p-6">
        <Link to="/" className="text-blue-500" underline>&larr; Kembali ke Beranda</Link>
        <img src={produk.gambar} className="w-full max-w-sm h-60 object-cover rounded mt-4" alt={produk.nama} />
        <h2 className="text-2xl font-bold mt-4">{produk.title}</h2>
        <p className="text-gray-600 mt-2">Rp {produk.price}</p>
    </div>
    );
}

export default DetailProduk;