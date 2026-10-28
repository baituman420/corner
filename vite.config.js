import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/corner/' : '/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        carta: resolve(__dirname, 'carta.html')
      }
    }
  },
  server: {
    host: true,
    port: 5173
  }
}));
