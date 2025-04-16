import React from 'react';

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-6 px-6 bg-light/50 dark:bg-dark/50 border-t border-dark/10 dark:border-light/10 transition-colors duration-300">
      <div className="container mx-auto text-center text-sm text-dark/70 dark:text-light/70">
        <p>Développé avec ❤️ et ☕ par Williams KOUTON GODONOU</p>
        <p>Copyright © {year} WKG. Tous droits réservés.</p>
        {/* Ajouter les icônes de réseaux sociaux ici plus tard */}
      </div>
    </footer>
  );
};

export default Footer;