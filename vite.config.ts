import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || "/",
  build: {
    target: "es2020",
    minify: "terser",
    cssMinify: true,
    reportCompressedSize: false,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        // Long-cache the framework separately from app code that changes often
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          motion: ["framer-motion"],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port: 4173,
    host: true,
  },
});
