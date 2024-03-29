import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsDir: 'static',
  },
  // server only for development
  server: {
    port: 5000,
    cors: true,
    proxy: {
      "/api": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^/api/, ""),
      },
    },
  },
})
