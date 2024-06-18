import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: "https://justexisting1.github.io/pokemon-guess-who/"
  base: "/pokemon-guess-who/"
})
