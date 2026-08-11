import { useParams, Link } from "react-router-dom";
import { daftarProduk } from "../data/produk";

function DetailProduk(){
const { id } = useParams();
const produk = daftarProduk.find((p) => p.id === Number (id));

if(!produk) return <p>Produk Tidak Ditemukan</p>;

return(
    <div className="p-6">
        <Link to="/" className="text-blue-500" underline>&larr; Kembali ke Beranda</Link>
        <img src={produk.gambar} className="w-full max-w-sm h-60 object-cover rounded mt-4" alt={produk.nama} />
        <h2 className="text-2xl font-bold mt-4">{produk.nama}</h2>
        <p className="text-gray-600 mt-2">Rp {produk.harga.toLocaleString("id-ID")}</p>
    </div>
    );
}

export default DetailProduk;