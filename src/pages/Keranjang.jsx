import { useKeranjang } from "../context/KeranjangContext";

function Keranjang(){
    const { item } = useKeranjang();
    return(
        <div className="p-6">
            <h2 className="text-xl font-bold">Isi Keranjang ({item.length})</h2>
            <pre>{JSON.stringify(item, null, 2)}</pre>
        </div>
    );
}

export default Keranjang;