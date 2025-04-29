import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react-quill/dist/quill.snow.css']
    }
  },
  plugins: [react()],
  server:{
    host:"0.0.0.0",
    port:8080,
  }
})
