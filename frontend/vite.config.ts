import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // react(): JSX, Fast Refresh no dev
  // tailwindcss(): processa o @import "tailwindcss" e gera só as classes usadas
  plugins: [react(), tailwindcss()],
})
