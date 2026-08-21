import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import Button from "./Button";
import Badge from "./Badge";

function ProdukCard({ produk }) {
    const { tambahKeKeranjang } = useKeranjang();

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative flex flex-col h-full bg-gray-800 border-gray-700">
            {produk.stok === 0 && (
                <div className="absolute top-2 right-2">
                    <Badge text="Stok habis" color="red" />
                </div>
            )}

            {/* flex-grow di sini biar membentang */}
            <Link to={`/produk/${produk.id}`} className="flex-Grow flex flex-col">
                {/* object-contain dan bg-white agar gambar dari API tidak terpotong */}
                <img src={produk.gambar} className="w-full h-48 object-contain rounded bg-white p-2" alt={produk.nama} />
                
                {/* line-clamp-2 membatasi teks judul maksimal 2 baris agar rapi */}
                <h3 className="font-semibold mt-4 text-white line-clamp-2">{produk.nama}</h3>
            </Link>

            <p className="text-gray-300 mt-2 font-bold mb-4">Rp {produk.harga.toLocaleString("id-ID")}</p>

            {/* mt-auto (margin-top) agar tombol ini selalu di dasar card! */}
            <div className="mt-auto w-full">
                <Button onClick={() => tambahKeKeranjang(produk)} className="w-full">
                    Tambah ke Keranjang
                </Button>
            </div>
        </div>
    );
}

export default ProdukCard;