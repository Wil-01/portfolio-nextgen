import React from 'react';
import { FaBasketballBall, FaBookOpen, FaDumbbell } from 'react-icons/fa'; // Exemples d'icônes

const AboutCard: React.FC = () => {
  return (
    // Utilise les classes Tailwind pour le style de la carte
    <div className="bg-light/10 dark:bg-dark-light/30 p-6 rounded-lg shadow-md backdrop-blur-sm border border-dark/10 dark:border-light/10">
      <blockquote className="text-dark/90 dark:text-light/90">
        <p className="mb-4 leading-relaxed">
          Bonjour, Je suis <span className="font-semibold text-primary">Williams KOUTON</span> du{' '}
          <span className="font-semibold">Bénin</span>.
          <br />
          Actuellement en recherche d'alternance pour{' '}
          <span className="font-semibold">Septembre 2025</span>.
          <br />
          Je suis une formation de développeur web full stack à la{' '}
          <span className="font-semibold">Web Académie Epitech</span>.
        </p>
        <p className="mb-4 leading-relaxed font-medium">
          À part le code, mes hobbies incluent :
        </p>
        <ul className="space-y-2 mb-6">
          <li className="flex items-center">
            <FaBasketballBall className="text-primary mr-3 text-xl" /> Jouer au Basket-ball
          </li>
          <li className="flex items-center">
            <FaBookOpen className="text-primary mr-3 text-xl" /> Lire des scans
          </li>
          <li className="flex items-center">
            <FaDumbbell className="text-primary mr-3 text-xl" /> Musculation
          </li>
        </ul>
        <p className="text-primary font-medium mb-2">
        Passionné par la création d'expériences web dynamiques et innovantes. Bienvenue sur mon portfolio digital.
        </p>
        
      </blockquote>
    </div>
  );
};

export default AboutCard;