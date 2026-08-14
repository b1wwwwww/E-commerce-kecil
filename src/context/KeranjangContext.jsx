import { createContext, useContext, useState } from "react";

const KeranjangContext = createContext();

export function KeranjangProvider({ children }) {
    const [item, setItem] = useState([]);

    function tambahKeKeranjang(produk){
        setItem((prev) => [...prev, produk]);
    }

    return(
        <KeranjangContext.Provider value={{ item, tambahKeKeranjang }}>
            {children}
        </KeranjangContext.Provider>
    );
}

export function useKeranjang(){
    return useContext(KeranjangContext);
}