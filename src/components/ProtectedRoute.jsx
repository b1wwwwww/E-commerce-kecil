import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// children = komponen/halaman yang mau diproteksi (<Keranjang />)
function ProtectedRoute({ children }) {
    const { user } = useAuth();

    // Kalau user ADA (sudah login) -> tampilkan halaman aslinya (children)
    // Kalau user null (belum login) -> otomatis redirect paksa ke halaman /login
    return user ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;