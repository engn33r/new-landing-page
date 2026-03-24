import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'
import webfontDownload from 'vite-plugin-webfont-dl'

export default defineConfig({
  plugins: [
    react(),
    webfontDownload(['https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400;500;600;700&display=swap'], {
      injectAsStyleTag: true,
      minifyCss: true,
      async: true,
      cache: true,
      proxy: false
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@shared': path.resolve(__dirname, './src/components/shared'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@components': path.resolve(__dirname, './src/components'),
      '@hooks': path.resolve(__dirname, './src/hooks')
    }
  },
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
