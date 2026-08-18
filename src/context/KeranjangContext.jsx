import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage"

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
    const [item, setItem] = useLocalStorage("Keranjang", []);

    function tambahKeKeranjang(produk){
        setItem((prev) => [...prev, {...produk, jumlah: 1 }]);
    }

    function hapusDariKeranjang(id){
        setItem((prev) => prev.filter((p) => p.id !== id));
    }
    
    function ubahJumlah(id, jumlahBaru) {
        setItem((prev) => 
            prev.map((p) => (p.id === id? {...p, jumlah: jumlahBaru }: p))
        );
    }

    return(
        <KeranjangContext.Provider 
            value={{ item, tambahKeKeranjang, hapusDariKeranjang, ubahJumlah }}>
            {children} 
        </KeranjangContext.Provider>
    );
}

export function useKeranjang(){
    return useContext(KeranjangContext);
}