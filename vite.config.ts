import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    global: {},
  },
  optimizeDeps: {
    exclude: ["js-big-decimal"],
  },
  server: {
    https: {
      key: "./localhost.key",
      cert: "./localhost.crt",
    },
    host: "192.168.100.2",
  },
});
