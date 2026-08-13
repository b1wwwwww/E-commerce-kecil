import { Link } from "react-router-dom";

function Header() {
    return(
        <header>
            <h1>Vintage Touch</h1>
            <nav className="flex gap-4 justify-center">
                <Link to="/">Beranda</Link>
                <Link to="/Keranjang">Keranjang</Link>
            </nav>
        </header>
    );
}

export default Header;