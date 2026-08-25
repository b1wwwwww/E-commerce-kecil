// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    // globals: true = supaya kita bisa pakai "describe", "it", "expect" langsung
    // tanpa perlu import manual di tiap file test
    globals: true,
    // environment: "jsdom" = mensimulasikan browser palsu di dalam Node.js,
    // supaya komponen React bisa "dirender" walau tidak ada browser sungguhan
    environment: "jsdom",
  },
});