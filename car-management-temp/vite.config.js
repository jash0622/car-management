import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Ensure base path is set correctly for deployment
  server: {
    port: 3000, // Optional: Set local dev server port
    open: true, // Optional: Automatically open the app in the browser
  },
  build: {
    outDir: 'dist', // Vercel will use this folder for the deployment
    rollupOptions: {
      output: {
        // Ensure assets and files are correctly structured
        assetFileNames: 'assets/[name].[hash][extname]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      },
    },
  },
});
