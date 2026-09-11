import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Learnrussian/',
  server: {
    port: 3000,
    open: true
  }
})
