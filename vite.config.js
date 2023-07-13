import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/BreezeOS-Mobile',
  envPrefix: ['VITE_', 'TAURI_'],
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  }
})
