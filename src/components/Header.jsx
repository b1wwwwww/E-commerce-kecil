import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-sm">
        {/* Menggunakan justify-between agar logo di kiri, menu di kanan */}
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white tracking-wide">
            Vintage<span className="text-blue-500">Touch</span>
            </Link>

            {/* Menu Navigasi */}
            <nav className="flex gap-6 font-medium">
            <Link to="/" className="text-gray-300 hover:text-blue-400 transition">
                Beranda
            </Link>
            <Link to="/keranjang" className="text-gray-300 hover:text-blue-400 transition">
                Keranjang
            </Link>
            </nav>

        </div>
        </header>
    );
}

export default Header;