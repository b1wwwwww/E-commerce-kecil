// pages/Keranjang.jsx
import { useKeranjang } from "../context/KeranjangContext";

function Keranjang() {
    const { item, hapusDariKeranjang, ubahJumlah } = useKeranjang();
    const total = item.reduce((sum, p) => sum + p.harga * p.jumlah, 0);

    return (
        <div className="p-6 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>

        {item.length === 0 ? (
            <p className="text-gray-500">Keranjang masih kosong.</p>
        ) : (
            <>
            {item.map((p) => (
                <div key={p.id} className="flex justify-between items-center border-b py-2">
                <div>
                    <p>{p.nama}</p>
                    <p className="text-sm text-gray-500">Rp {p.harga.toLocaleString("id-ID")}</p>
                </div>

                <div className="flex items-center gap-2">
                    <button
                    onClick={() => ubahJumlah(p.id, Math.max(1, p.jumlah - 1))}
                    className="px-2 border rounded"
                    >
                    -
                    </button>
                    <span>{p.jumlah}</span>
                    <button
                    onClick={() => ubahJumlah(p.id, p.jumlah + 1)}
                    className="px-2 border rounded"
                    >
                    +
                    </button>
                    <button
                    onClick={() => hapusDariKeranjang(p.id)}
                    className="text-red-500 ml-4"
                    >
                    Hapus
                    </button>
                </div>
                </div>
            ))}

            <h3 className="text-xl font-bold mt-4">
                Total: Rp {total.toLocaleString("id-ID")}
            </h3>
            </>
        )}
        </div>
    );
}

export default Keranjang;