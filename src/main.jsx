import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { KeranjangProvider } from "./context/KeranjangContext.jsx";
import "./index.css";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <KeranjangProvider>
        <App />
    </KeranjangProvider>
  </StrictMode>
)
