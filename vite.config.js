// vite.config.js

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Cria um chunk separado para React/ReactDOM e outras dependências grandes
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Coloca todas as dependências em um chunk chamado 'vendor'
            // Você pode refinar isso para criar chunks separados para 'recharts', 'bootstrap', etc.
            return 'vendor'; 
          }
        },
      },
    },
  },
});