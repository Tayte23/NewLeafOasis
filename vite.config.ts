import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Must match your repository name
  base: "/NewLeafOasis/",
  // Actions will publish ./dist
  build: { outDir: "dist" }
});
