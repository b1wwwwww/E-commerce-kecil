import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
// import Button dan KeranjangContext untuk fungsi tambah keranjang
import Button from "../components/Button"; 
import { useKeranjang } from "../context/KeranjangContext"; 

const KURS_USD_KE_IDR = 15000;

function DetailProduk() {
    const { id } = useParams();
    const [produk, setProduk] = useState(null);
    const [loading, setLoading] = useState(true);
    const { tambahKeKeranjang } = useKeranjang(); // Memanggil fungsi context

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setProduk(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p className="p-6 text-center text-white">Memuat produk...</p>;
    if (!produk) return <p className="p-6 text-center text-white">Produk Tidak Ditemukan</p>;

    const hargaRupiah = Math.round(produk.price * KURS_USD_KE_IDR);

    return (
        <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-blue-500 hover:underline mb-6 inline-block">
            &larr; Kembali ke Beranda
        </Link>

        {/* Flexbox 2 kolom (Kiri Gambar, Kanan Teks) */}
        <div className="flex flex-col md:flex-row gap-8 bg-gray-800 p-6 rounded-xl border border-gray-700">
            
            {/* Kolom Kiri: Gambar (Perhatikan penggunaan produk.image) */}
            <div className="w-full md:w-1/2 flex justify-center bg-white p-4 rounded-lg">
            <img
                src={produk.image} 
                className="w-full max-w-sm h-72 object-contain rounded"
                alt={produk.title}
            />
            </div>

            {/* Kolom Kanan: Detail & Tombol */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-white">
            <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{produk.category}</p>
            <h2 className="text-3xl font-bold mb-4">{produk.title}</h2>
            <p className="text-2xl font-bold text-gray-200 mb-6">
                Rp {hargaRupiah.toLocaleString("id-ID")}
            </p>
            <p className="text-gray-300 mb-8 leading-relaxed">{produk.description}</p>

            <Button onClick={() => tambahKeKeranjang({
                id: produk.id,
                nama: produk.title,
                harga: hargaRupiah,
                gambar: produk.image
            })}>
                Tambah ke Keranjang
            </Button>
            </div>

        </div>
        </div>
    );
}

export default DetailProduk;