import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
// index.html  — the live single-file portfolio
// app.html    — the React build of the same design (open /app.html)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        live: 'index.html',
        app: 'app.html',
      },
    },
  },
})
