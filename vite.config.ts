import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/NewLeafOasis/',   // repo name
  // no build.outDir here; default is "dist"
})
