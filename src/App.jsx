// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import DetailProduk from "./pages/DetailProduk";
import Keranjang from "./pages/Keranjang";
import Login from "./pages/Login";        
import Register from "./pages/Register";  

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/produk/:id" element={<DetailProduk />} />
          <Route path="/keranjang" element={<Keranjang />} />
          <Route path="/login" element={<Login />} />        
          <Route path="/register" element={<Register />} />  
          <Route path="*" element={<h2>404 - Halaman Tidak Ditemukan</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;