import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/NewLeafOasis/",   // <- your repo name
  build: { outDir: "dist" } // <- matches the Pages workflow
});
