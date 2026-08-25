import { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
    // form = satu objek yang isinya SEMUA field input sekaligus (email & password).
    const [form, setForm] = useState({ email: "", password: "" });

    // menampilkan pesan error ke user jika validasi gagal
    const [error, setError] = useState("");

    // Fungsi ini dipanggil tiap kali user mengetik di salah satu input
    function handleChange(e) {
        // e.target.name = nama input yang sedang diketik (misal "email" atau "password")
        // e.target.value = isi terbaru dari input tersebut
        setForm({
        ...form, // salin semua field lama supaya tidak hilang
        [e.target.name]: e.target.value, // timpa HANYA field yg sedang di ketik
        });
    }

    // Fungsi saat click tombol login / form di submit
    function handleSubmit(e) {
        // preventDefault() mencegah perilaku (reload halaman)
        e.preventDefault();

        // Trim input untuk menghindari spasi tak sengaja
        const email = form.email.trim();
        const password = form.password.trim();

        // Validasi : apakah email mengandung karakter '@'
        if (!email.includes("@")) {
        setError("Email tidak valid");
        return; // hentikan proses / jgan lanjut ke validasi selanjutnya
        }

        // Validasi : cek panjang password min 6
        if (password.length < 6) {
        setError("Password minimal 6 karakter");
        return;
        }
        // kalo lolos semua validasi, hapus pesan error nya
        setError("");

        // proses login sebenarnya (kirim ke server nanti)
        console.log("Login Berhasil:", {
        email: form.email,
        password: form.password,
        });
    }

    return (
        <div className="max-w-sm mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {/* onSubmit dipanggil saat user klik tombol submit ATAU tekan Enter di form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
            type="email"
            name="email"
            placeholder="Masukan Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            />

            <input
            type="password"
            name="password"
            placeholder="Masukan Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            />

            {/* Tampilkan pesan error (conditional rendering) */}
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
            type="submit"
            className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
            >
            Login
            </button>

            <p className="text-sm text-center">
            Belum punya akun?{" "}
            <Link to="/register" className="text-blue-500 underline">
                Daftar
            </Link>
            </p>
        </form>
        </div>
    );
}

export default Login;
