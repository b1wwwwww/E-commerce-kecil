import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect  } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Login from "./Login";

// Fungsi bantu (helper) supaya tidak perlu tulis ulang pembungkus Router + AuthProvider
// di setiap test. Login butuh AuthProvider karena dia pakai useAuth() di dalamnya.

function renderLogin(){
    render(
        <MemoryRouter>
            <AuthProvider>
                <Login />
            </AuthProvider>
        </MemoryRouter>
    );
}

describe("Login", () => {
    it("menampilkan error jika email tidak vallid", () => {
        renderLogin();

        // getByPlaceholderText = cari input berdasarkan teks placeholder-nya
        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getByPlaceholderText("Password");
        const tombolLogin = screen.getByText("Login");

        // fireEvent.change = mensimulasikan saat user Mengetik ke input
        fireEvent.change(inputEmail, { target: {value : "emailsalah"}});
        fireEvent.change(inputPassword, {target: {value: "123456"}});

        // fireEvent.click = mensimulasikan saat user mengclick Button
        fireEvent.click(tombolLogin);

        // untuk cek apakah pesan error muncul
        expect(screen.getByText("Email tidak valid")).toBeInTheDocument();
    });

    it ("menampilkan errror kalau password kurang dari 6 karakter", () => {
        renderLogin();

        const inputEmail = screen.getByPlaceholderText("Email");
        const inputPassword = screen.getAllByPlaceholderText("Password");
        const tombolLogin = screen.getByText("Login");

        fireEvent.change(inputEmail, {target: { value: "wowok@gmail.com"}});
        fireEvent.change(inputPassword, {target: { value: "123" }});

        fireEvent.click(tombolLogin);

        expect(screen.getByText("Password minimal 6 karakter")).toBeInTheDocument();
    });
});