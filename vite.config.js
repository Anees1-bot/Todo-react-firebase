// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({mode}) => ({ 
  plugins: [react()],
  build:{
    sourcemap : mode !== 'production',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
}));
