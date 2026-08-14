import { Link } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import Button from "./Button";
import Badge from "./Badge";

function ProdukCard({ produk }) {
    const { tambahKeKeranjang } = useKeranjang();

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative">
            {produk.stok === 0 && (
                <div className="absolute top-2 right-2">
                    <Badge text="Stok habis" color="red" />
                </div>
            )}

            <Link to={`/produk/${produk.id}`}>
                <img src={produk.gambar} className="w-full h-40 object-cover rounded" alt={produk.nama} />
                <h3 className="font-semibold mt-2">{produk.nama}</h3>
            </Link>

            <p className="text-gray-600">Rp {produk.harga.toLocaleString("id-ID")}</p>

            <Button onClick={() => tambahKeKeranjang(produk)}>
                Tambah ke Keranjang
            </Button>
        </div>
    );
}

export default ProdukCard;