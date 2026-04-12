import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // UI / animation libs — changent rarement
          'vendor-motion':  ['framer-motion'],
          'vendor-react':   ['react', 'react-dom', 'react-router-dom'],
          'vendor-icons':   ['lucide-react', 'react-icons'],
          'vendor-misc':    ['lenis', '@emailjs/browser', 'react-simple-typewriter', 'react-parallax-tilt'],
          // GitHub calendar séparé (charge l'API GitHub)
          'vendor-github':  ['react-github-calendar'],
        },
      },
    },
    // Augmente le seuil d'avertissement car les vidéos .webm sont des assets, pas du JS
    chunkSizeWarningLimit: 800,
  },
});
