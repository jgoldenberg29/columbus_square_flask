import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';
import fs from 'fs/promises';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  build: {
    assetsDir: 'static',
  },
  babel: {
    presets: ["@babel/preset-env", '@babel/preset-react']
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
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        {
          name: 'load-js-files-as-jsx',
          setup(build) {
            build.onLoad(
              { filter: /src\\.*\.js$/ },
              async (args) => ({
                loader: 'jsx',
                contents: await fs.readFile(args.path, 'utf8'),
              })
            );
          },
        },
      ],
    },
  },

})
