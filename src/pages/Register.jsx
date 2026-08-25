import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(){
    const [form, setForm] = useState({email: "", password: "", konfirmasi: ""});
    const [error, setError] = useState("");

    // useNavigate = hook buat pindah halaman lewat KODE (bukan lewat klik <Link>)
    // Dipakai nanti supaya setelah daftar sukses, otomatis diarahkan ke halaman Login
    const navigate = useNavigate();

    function handleChange(e){
        setForm({...form, [e.target.name]: e.target. value});
    }

    function handleSubmit(e){
        e.preventDefaul();

        if(!form.email.includes("@")){
            setError("Email tidak valid");
            return;
        }
        if(form.password.length < 6){
            setError("Password minimal 6 karakter");
            return;
        }
        // VALIDASI TAMBAHAN: cek apakah password dan konfirmasi password SAMA PERSIS
        if(form.password !== form.password){
            setError("Konfirmasi password tidak cocok");
            return;
        }

        setError("");
        console.log("Registrasi berhasil:", form);

        // navigate("/login") = pindah otomatis ke halaman Login setelah daftar sukses
        navigate("/login");
    }

    return (
        <div   div className="max-w-sm mx-auto p-6">
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

        <button type="submit" className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700">
            Daftar
        </button>

        <p className="text-sm text-center">
            Sudah punya akun? <Link to="/login" className="text-blue-500 underline">Login</Link>
        </p>
        </form>
    </div>
    );
}

export default Register;