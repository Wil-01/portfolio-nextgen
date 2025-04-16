// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = { // Note: C'est `module.exports` pour la v3 généralement
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // Important pour le toggle manuel
  theme: {
    extend: {
      colors: {
         primary: '#e7895d', // Ton orange
         dark: {
           DEFAULT: '#121212',
           light: '#1e1e1e',
           lighter: '#2d2d2d',
         },
         light: {
           DEFAULT: '#ffffff',
           subtle: '#f8f9fa',
         }
      }
      // Ajoute d'autres customisations si besoin (polices, etc.)
    },
  },
  plugins: [],
}