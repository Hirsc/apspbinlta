import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";
import sassDts from "vite-plugin-sass-dts";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        importer(...args) {
          if (args[0] !== "@/styles") {
            return;
          }

          return {
            file: `${path.resolve(
              __dirname,
              "./src/assets/styles"
            )}`,
          };
        },
      },
    },
  },
  plugins: [
    react(),
    sassDts({
      enabledMode: ['development', 'production'],
      global: {
        generate: true,
        outFile: path.resolve(__dirname, "./src/style.d.ts"),
      },
    }),],
  server: {
    host: '0.0.0.0',
    port: 5173,
  }
})
