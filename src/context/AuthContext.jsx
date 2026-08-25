import { createContext, useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

// AuthCOntext = "kotak penyimpanan global" untuk status login user
const AuthContext = createContext();

export function AuthProvider({ children }){
    // user = data user yang sedang login (null = belum login sama sekali)
    // Pakai useLocalStorage supaya status login TETAP TERSIMPAN
    const [user, setUser] = useLocalStorage("user", null);

    // Fungsi login
    function login(email){
        setUser({ email });
    }

    // Fungsi logout: hapus data user, sehingga status kembali jadi "belum login"
    function logout(){
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}