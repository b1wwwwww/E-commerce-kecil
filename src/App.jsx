// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import DetailProduk from "./pages/DetailProduk";
import Keranjang from "./pages/Keranjang";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/produk/:id" element={<DetailProduk />} />
        <Route path="/keranjang" element={<Keranjang />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;