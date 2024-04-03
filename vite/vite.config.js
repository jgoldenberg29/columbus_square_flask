import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsDir: 'static',
  },
  babel: {
    presets: ['@babel/preset-react']
    // Additional Babel configuration options...
  },
  // server only for development
  server: {
    port: 5000,
    cors: true,
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000/",
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^/api/, ""),
      },
    },
  },
})
