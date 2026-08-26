import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "./Login";

// Fungsi bantu (helper) supaya tidak perlu tulis ulang pembungkus Router + AuthProvider
// di setiap test. Login butuh AuthProvider karena dia pakai useAuth() di dalamnya.

function renderLogin() {
    render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>,
    );
}

describe("Login", () => {
    it("menampilkan error jika email tidak vallid", async () => {
        renderLogin();

        // getByPlaceholderText = cari input berdasarkan teks placeholder-nya
        const inputEmail = screen.getByPlaceholderText("Masukan Email");
        const inputPassword = screen.getByPlaceholderText("Masukan Password");
        const tombolLogin = screen.getByRole("button", { name: /login/i });

        // fireEvent.change = mensimulasikan saat user Mengetik ke input
        fireEvent.change(inputEmail, { target: { value: "emailsalah" } });
        fireEvent.change(inputPassword, { target: { value: "123456" } });

        // validasi tombol login
        fireEvent.submit(tombolLogin.form);

        // untuk cek apakah pesan error muncul
        expect(await screen.findByText("Email tidak valid")).toBeInTheDocument();
});

    it("menampilkan errror kalau password kurang dari 6 karakter", async () => {
        renderLogin();

        const inputEmail = screen.getByPlaceholderText("Masukan Email");
        const inputPassword = screen.getByPlaceholderText("Masukan Password");
        const tombolLogin = screen.getByRole("button", { name: /login/i });

        fireEvent.change(inputEmail, { target: { value: "wowok@gmail.com" } });
        fireEvent.change(inputPassword, { target: { value: "123" } });

        fireEvent.submit(tombolLogin.form);

        expect(
        await screen.findByText("Password minimal 6 karakter"),
        ).toBeInTheDocument();
    });
});
