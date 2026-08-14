import { useKeranjang } from "../context/KeranjangContext";

function Keranjang(){
    const { item } = useKeranjang();
    const total = item.reduce((sum, p) => sum + p.harga, 0 );

    return(
        <div className="p-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">Keranjang Belanja</h2>

            {item.length === 0 ? (
                <p className="text-gray-500">Keranjang masih kosong</p>
            ) : (
                <>
                {item.map((p, i) => (
                    <div key={i} className="flex justify-between border-b py-2">
                        <span>{p.nama}</span>
                        <span>Rp {p.harga.toLocaleString("id-ID")}</span>
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