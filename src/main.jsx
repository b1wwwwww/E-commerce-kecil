// main.jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx"; // BARU
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*
      AuthProvider dan KeranjangProvider dua-duanya harus membungkus App.
      Urutan boleh bebas (AuthProvider di luar atau KeranjangProvider di luar,
      tidak masalah karena keduanya independen satu sama lain).
    */}
    <AuthProvider>
      <KeranjangProvider>
        <App />
      </KeranjangProvider>
    </AuthProvider>
  </StrictMode>
);