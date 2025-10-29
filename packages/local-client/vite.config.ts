import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Polyfill process.env in the browser
    "process.env": {},
  },
  resolve: {
    // Adding polyfill for process
    alias: {
      process: "process/browser",
    },
  },
});
