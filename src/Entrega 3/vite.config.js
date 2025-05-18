import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Pasta de saída
    chunkSizeWarningLimit: 1000, // Aumenta o limite de aviso de tamanho do chunk
  },
});