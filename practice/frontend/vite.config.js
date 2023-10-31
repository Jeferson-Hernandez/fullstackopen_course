import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/notes': 'http://localhost:3001',
      '/api/login': 'http://localhost:3001',
    }
  }
})
