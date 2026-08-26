import { memo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useKeranjang } from "../context/KeranjangContext";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import Badge from "./Badge";


function ProdukCard({ produk }) {
    const { tambahKeKeranjang } = useKeranjang();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [notifikasi, setNotifikasi] = useState("");

    useEffect(() => {
        if (!notifikasi) return undefined;

        const timer = setTimeout(() => {
            setNotifikasi("");
        }, 1800);

        return () => clearTimeout(timer);
    }, [notifikasi]);

    function handleTambahKeranjang() {
        if (!user) {
            // Jika belum login, arahkan ke login dan simpan halaman asal.
            navigate("/login", { state: { from: location.pathname } });
            return;
        }

        // Jika sudah login, produk boleh masuk keranjang dan notifikasi ditampilkan.
        tambahKeKeranjang(produk);
        setNotifikasi("Produk masuk keranjang");
    }

    return (
        <div className="border rounded-lg p-4 shadow hover:shadow-lg transition relative flex flex-col h-full bg-gray-800 border-gray-700">
            {notifikasi && (
                <div className="absolute left-4 right-4 top-3 z-10 rounded-lg bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-lg">
                    {notifikasi}
                </div>
            )}

            {produk.stok === 0 && (
                <div className="absolute top-2 right-2">
                    <Badge text="Stok Habis" color="red" />
                </div>
            )}

            {/* flex-grow di sini biar membentang */}
            <Link to={`/produk/${produk.id}`} className="flex-grow flex flex-col">
                {/* object-contain dan bg-white agar gambar dari API tidak terpotong */}
                <img src={produk.gambar} className="w-full h-48 object-contain rounded bg-white p-2" alt={produk.nama} />
                
                {/* line-clamp-2 membatasi teks judul maksimal 2 baris agar rapi */}
                <h3 className="font-semibold mt-4 text-white line-clamp-2">{produk.nama}</h3>
            </Link>

            <p className="text-gray-300 mt-2 font-bold mb-4">Rp {produk.harga.toLocaleString("id-ID")}</p>

            {/* mt-auto (margin-top) agar tombol ini selalu di dasar card! */}
            <div className="mt-auto w-full">
                <Button onClick={handleTambahKeranjang} className="w-full">
                    Tambah ke Keranjang
                </Button>
            </div>
        </div>
    );
}

// Dipakai supaya komponen tidak render ulang
// kalau props-nya tidak berubah, menghemat kerja komputer/browser.
export default memo(ProdukCard);
