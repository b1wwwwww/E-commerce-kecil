import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
    const [item, setItem] = useLocalStorage("Keranjang", []);

    function tambahKeKeranjang(produk){
        setItem((prev) => {
            // Cek dulu apakah produk yang sama sudah ada di keranjang.
            const produkSudahAda = prev.some((p) => p.id === produk.id);

            if (produkSudahAda) {
                // Kalau sudah ada, cukup tambah jumlahnya supaya produk tidak dobel.
                return prev.map((p) =>
                    p.id === produk.id ? { ...p, jumlah: p.jumlah + 1 } : p
                );
            }

            // Kalau belum ada, masukkan produk baru dengan jumlah awal 1.
            return [...prev, {...produk, jumlah: 1 }];
        });
    }

    function hapusDariKeranjang(id){
        setItem((prev) => prev.filter((p) => p.id !== id));
    }
    
    function ubahJumlah(id, jumlahBaru) {
        setItem((prev) => 
            prev.map((p) => (p.id === id? {...p, jumlah: jumlahBaru }: p))
        );
    }

    // Total semua quantity untuk ditampilkan sebagai angka badge di header.
    const jumlahItem = item.reduce((total, p) => total + p.jumlah, 0);

    return(
        <KeranjangContext.Provider 
            value={{ item, jumlahItem, tambahKeKeranjang, hapusDariKeranjang, ubahJumlah }}>
            {children} 
        </KeranjangContext.Provider>
    );
}

export function useKeranjang(){
    return useContext(KeranjangContext);
}
