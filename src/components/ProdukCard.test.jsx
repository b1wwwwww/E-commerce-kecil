// components/ProdukCard.test.jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom"; // karena ProdukCard pakai <Link>
import { AuthProvider } from "../context/AuthContext";
import { KeranjangProvider } from "../context/KeranjangContext";
import ProdukCard from "./ProdukCard";

// describe() = kelompok/grup dari beberapa test yang berhubungan.
// "ProdukCard" di sini cuma label/nama grup
describe("ProdukCard", () => {
    it("menampilkan nama produk dengan benar", () => {
        // Data dummy untuk tes
    const produk = {
        id: 1,
        nama: "Kaos Polos",
        harga: 75000,
        gambar: "../img/kaos.jpeg",
        stok: 10,
    };

    // render() = "memasang" komponen ProdukCard ke lingkungan test,
    //
    // ProdukCard pakai <Link> dari react-router-dom, harus dibungkus <MemoryRouter>
    // supaya tidak error "useNavigate() may be used only in the context of a <Router>"
    // KeranjangProvider (karena pakai useKeranjang()).
    render(
        <MemoryRouter>
            <AuthProvider>
            <KeranjangProvider>
                <ProdukCard produk={produk} />
            </KeranjangProvider>
            </AuthProvider>
        </MemoryRouter>,
    );

    // screen.getByText() = mencari elemen di layar (hasil render) yang teksnya cocok
    // expect(...).toBeInTheDocument() = pengecekan: "apakah elemen ini BENERAN ada di layar?"
    expect(screen.getByText("Kaos Polos")).toBeInTheDocument();
});

    it("menampilkan badge 'Stok Habis' kalau stok 0", () => {
        const produkHabis = {
        id: 2,
        nama: "Topi",
        harga: 40000,
        gambar: "../img/topi.jpeg",
        stok: 0,
    };

    render(
        <MemoryRouter>
            <AuthProvider>
            <KeranjangProvider>
            <ProdukCard produk={produkHabis} />
            </KeranjangProvider>
            </AuthProvider>
        </MemoryRouter>,
    );

    expect(screen.getByText("Stok Habis")).toBeInTheDocument();
    });
});
