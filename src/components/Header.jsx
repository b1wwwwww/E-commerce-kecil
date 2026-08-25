// components/Header.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // BARU

function Header() {
    const { user, logout } = useAuth();

    return (
        <header className="p-4 text-center">
        <h1 className="text-3xl font-bold">Vintage Touch</h1>
        <nav className="flex gap-4 justify-center mt-2">
            <Link to="/">Beranda</Link>
            <Link to="/keranjang">Keranjang</Link>

            {/*
            Conditional rendering: kalau user sudah login, tampilkan email + tombol Logout.
            Kalau belum login, tampilkan link ke halaman Login.
            */}
            {user ? (
            <>
                <span className="text-gray-400">Hi, {user.email}</span>
                <button onClick={logout} className="text-red-400 underline">Logout</button>
            </>
            ) : (
            <Link to="/login">Login</Link>
            )}
        </nav>
        </header>
    );
}

export default Header;