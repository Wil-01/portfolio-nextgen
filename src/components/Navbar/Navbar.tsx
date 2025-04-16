import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Importer Link pour la navigation
import { useTheme } from '../Theme/ThemeContext'; // Pour accéder au thème si besoin plus tard

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const { theme } = useTheme(); // Si on veut adapter des styles au thème

  // Liens de navigation (à adapter selon tes pages finales)
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 py-4 px-6 bg-light/80 dark:bg-dark/80 backdrop-blur-md shadow-sm transition-colors duration-300">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo ou Nom */}
        <Link to="/" className="text-xl font-bold text-dark dark:text-light">
          WKG <span className="text-primary">.</span> {/* Ton logo/nom */}
        </Link>

        {/* Liens Desktop */}
        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
          {/* Lien GitHub (comme avant) */}
          <a
            href="https://github.com/Wil-01/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-200"
          >
             GH {/* Icône à ajouter */}
          </a>
        </div>

        {/* Bouton Burger Mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-dark dark:text-light focus:outline-none"
        >
          {/* Icône Burger (simple pour l'instant) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Menu Mobile (apparaît si isOpen) */}
      {isOpen && (
        <div className="md:hidden mt-4 flex flex-col space-y-2 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block px-4 py-2 text-dark dark:text-light hover:bg-primary/10 rounded"
              onClick={() => setIsOpen(false)} // Ferme le menu au clic
            >
              {link.name}
            </Link>
          ))}
           <a
            href="https://github.com/Wil-01/"
            target="_blank"
            rel="noopener noreferrer"
             className="block px-4 py-2 text-dark dark:text-light hover:bg-primary/10 rounded"
             onClick={() => setIsOpen(false)}
          >
             GitHub {/* Icône à ajouter */}
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;