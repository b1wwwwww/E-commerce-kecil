// components/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="fixed top-0 left-0 right-0 w-full z-50 bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto w-full px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-white tracking-wide">
                Vintage<span className="text-blue-500">Touch</span>
                </Link>

                {/* Navigasi utama */}
                <nav className="flex items-center font-medium">
                    <div className="flex gap-8">
                        <Link
                        to="/"
                        className="text-gray-300 hover:text-blue-400 transition"
                        >
                        Beranda
                        </Link>
                        <Link
                        to="/keranjang"
                        className="text-gray-300 hover:text-blue-400 transition"
                        >
                        Keranjang
                        </Link>
                    </div>

                {/* pemisah vertikal */}
                <div className="ml-6 h-6 w-px bg-gray-700" />

                {/* tampilkan Login/Daftar jika belum login, atau email+Logout kalau sudah */}
                <div className="ml-6 flex items-center gap-4">
                    {user ? (
                    <>
                        <span className="text-gray-300">{user.email}</span>
                        <button
                        onClick={logout}
                        className="text-gray-300 hover:text-red-400 underline"
                        >
                        Logout
                        </button>
                    </>
                    ) : (
                    <>
                        <Link
                        to="/login"
                        className="text-gray-300 hover:text-blue-400 transition"
                        >
                        Login
                        </Link>
                        <Link
                        to="/register"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                        Daftar
                        </Link>
                    </>
                    )}
                    </div>
                </nav>
            </div>
        </header>
    );
}

export default Header;
