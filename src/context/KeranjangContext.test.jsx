// context/KeranjangContext.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, it, expect, beforeEach } from "vitest";
import { KeranjangProvider, useKeranjang } from "./KeranjangContext";

// Komponen dummy khusus untuk keperluan test.
// Fungsinya cuma memanggil useKeranjang() dan menampilkan hasilnya ke layar,
// supaya bisa mengecek context bekerja dengan benar tanpa perlu ProdukCard sungguhan.
function KomponenTes() {
    const { item, tambahKeKeranjang } = useKeranjang();

    const produkContoh = { id: 1, nama: "Kaos Polos", harga: 75000 };

    return (
        <div>
        <p>Jumlah item: {item.length}</p>
        <button onClick={() => tambahKeKeranjang(produkContoh)}>Tambah</button>
        </div>
    );
}

describe("KeranjangContext", () => {
    // Ini membersihkan localStorage supaya data dari test sebelumnya.
    beforeEach(() => {
        localStorage.clear();
    });

    it("menambahkan produk ke keranjang saat tambahKeKeranjang dipanggil", () => {
        render(
        <KeranjangProvider>
            <KomponenTes />
        </KeranjangProvider>,
        );

    // Sebelum diklik, seharusnya masih 0 item
    expect(screen.getByText("Jumlah item: 0")).toBeInTheDocument();

    // Simulasikan klik tombol "Tambah"
    fireEvent.click(screen.getByText("Tambah"));

    // Setelah diklik, seharusnya jadi 1 item
    expect(screen.getByText("Jumlah item: 1")).toBeInTheDocument();
    });
});
