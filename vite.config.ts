import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: '/BreezeOS-Mobile',
    envPrefix: ['VITE_', 'TAURI_'],
    clearScreen: false,
    server: {
        strictPort: true
    },
    optimizeDeps: {
        exclude: ['@preact/signals']
    },
    build: {
        outDir: './dist',
        commonjsOptions: {
            transformMixedEsModules: true,
        },
        target: process.env.TAURI_PLATFORM == 'windows' ? 'chrome105' : 'safari13',
        minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
        sourcemap: !!process.env.TAURI_DEBUG,
    }
})