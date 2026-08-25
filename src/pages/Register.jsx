import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
    // form = objek yang menyimpan semua field sekaligus (email, password, konfirmasi)
    const [form, setForm] = useState({ email: "", password: "", konfirmasi: "" });
    // state untuk menampilkan pesan error ke user jika validasi gagal
    const [error, setError] = useState("");

    // state untuk menandakan proses submit sedang berlangsung (prevent double submit)
    const [isSubmitting, setIsSubmitting] = useState(false);

    // useNavigate = hook buat pindah halaman lewat KODE (bukan lewat klik <Link>)
    // daftar sukses, otomatis diarahkan ke halaman Login
    const navigate = useNavigate();

    // Fungsi ini dipanggil tiap saat user mengetik di salah satu input
    // e.target.name = nama input (email/password/konfirmasi)
    // e.target.value = nilai terbaru dari input
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    // Fungsi saat klik tombol daftar / submit form
    // Lakukan validasi sederhana 
    function handleSubmit(e) {
        e.preventDefault();

        // Trim input untuk menghindari spasi tak sengaja
        const email = form.email.trim();
        const password = form.password.trim();
        const konfirmasi = form.konfirmasi.trim();

        // Validasi : apakah email mengandung karakter '@'
        if (!email.includes("@")) {
        setError("Email tidak valid");
        return;
        }

        // Validasi : cek panjang password min 6
        if (password.length < 6) {
        setError("Password minimal 6 karakter");
        return;
        }

        // VALIDASI TAMBAHAN: cek apakah password dan konfirmasi password SAMA PERSIS
        if (password !== konfirmasi) {
        setError("Konfirmasi password tidak cocok");
        return;
        }

        setError("");
        setIsSubmitting(true);
        console.log("Registrasi berhasil:", { email, password });

        // navigate("/login") = pindah otomatis ke halaman Login setelah daftar sukses
        navigate("/login");
    }

    return (
        <div className="max-w-sm mx-auto p-6">
        <h2 className="text-2xl font-bold mb-4">Daftar Akun</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            />

            <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            />

            <input
            type="password"
            name="konfirmasi"
            placeholder="Konfirmasi Password"
            value={form.konfirmasi}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            />

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
            type="submit"
            disabled={isSubmitting}
            className={
                "rounded py-2 px-3 text-white " +
                (isSubmitting
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700")
            }
            >
            {isSubmitting ? "Mendaftarkan..." : "Daftar"}
            </button>

            <p className="text-sm text-center">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-500 underline">
                Login
            </Link>
            </p>
        </form>
        </div>
    );
}

export default Register;
