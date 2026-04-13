import { defineConfig } from 'vite'
import path from "node:path";
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "./src/components/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@pages": path.resolve(__dirname, "./src/pages/"),
      "@services": path.resolve(__dirname, "./src/services/"),
      "@types": path.resolve(__dirname, "./src/types/"),
      "@": path.resolve(__dirname, "./src/"),
    },
  },
});
