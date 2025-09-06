import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  base: '/', // 👈 ensures assets are loaded correctly no matter the route
  server: {
    port: 5173,
    open: true,
    historyApiFallback: true,
  },
})
