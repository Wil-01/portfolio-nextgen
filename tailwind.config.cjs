// tailwind.config.cjs
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          dark:    '#4f46e5',
          light:   '#818cf8',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          light:   '#a78bfa',
        },
        dark: {
          DEFAULT: '#080a16',
          surface: '#0c0e1d',
          card:    '#101226',
          border:  '#1a1c35',
          muted:   '#3d3f60',
        },
        light: {
          DEFAULT: '#f5f5ff',
          surface: '#ffffff',
          card:    '#ededf8',
          border:  '#dcdcf0',
          muted:   '#8888aa',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        'gradient-hero':    'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 60%)',
      },
      animation: {
        'float':     'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'pulse-slow':'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite',
        'scroll-x':  'scroll-x 40s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}
