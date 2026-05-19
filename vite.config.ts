import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about/index.html'),
        menu: resolve(__dirname, 'menu/index.html'),
        reservation: resolve(__dirname, 'reservation/index.html'),
        gallery: resolve(__dirname, 'gallery/index.html'),
        contact: resolve(__dirname, 'contact/index.html'),
      },
    },
  },
});
