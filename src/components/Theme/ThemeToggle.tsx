import React from 'react';
import { useTheme } from './ThemeContext';
import { motion } from 'framer-motion'; // Pour une petite animation sympa

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      // Styling basique avec Tailwind - on pourra l'améliorer
      className="fixed bottom-8 right-8 z-50 p-3 rounded-full bg-primary text-white shadow-lg focus:outline-none"
      aria-label={theme === 'dark' ? 'Passer au thème clair' : 'Passer au thème sombre'}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </motion.button>
  );
};

export default ThemeToggle;