import { daftarProduk } from "../data/produk";
import ProdukCard from "../components/ProdukCard";

function Home() {
  return (
    <div>
      <h2>Produk</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {daftarProduk.map((p) => (
          <ProdukCard key={p.id} produk={p} />
        ))}
      </div>
    </div>
  );
}

export default Home;
