import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData, Project } from '../../data/projectData'; // Importe les données
import ProjectSlide from './ProjectSlide';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Icônes pour la navigation

const ProjectCarousel: React.FC = () => {
  // L'index du projet actuellement affiché
  const [currentIndex, setCurrentIndex] = useState(0);
  // Direction de l'animation (pour savoir si on slide vers la gauche ou la droite)
  const [direction, setDirection] = useState(0); // 0 = initial, 1 = suivant, -1 = précédent

  // Variants pour l'animation de slide
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        // ease: [0.6, 0.05, -0.01, 0.9] // <= LIGNE PROBLÉMATIQUE
        ease: "easeInOut" // <= REMPLACER PAR CECI
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.4,
        // ease: [0.6, 0.05, -0.01, 0.9] // <= LIGNE PROBLÉMATIQUE
        ease: "easeInOut" // <= REMPLACER PAR CECI
      }
    }),
  };

  const navigate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + newDirection;
      return ((newIndex % projectsData.length) + projectsData.length) % projectsData.length;
    });
  };

  const currentProject = projectsData[currentIndex];

  return (
    // Conteneur principal qui prend la hauteur de l'écran (ou une hauteur fixe)
    // et gère l'overflow pour l'animation
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">

      {/* AnimatePresence est la clé pour animer l'entrée/sortie des slides */}
      {/* exitBeforeEnter assure que l'animation de sortie est terminée avant l'entrée */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex} // Très important: Framer Motion utilise la clé pour détecter le changement de composant
          className="absolute w-full h-full" // Le slide prend toute la place
          custom={direction} // Passe la direction aux variants
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {/* Affiche le composant slide pour le projet courant */}
          <ProjectSlide project={currentProject} isActive={true} />
        </motion.div>
      </AnimatePresence>

      {/* Boutons de Navigation */}
      <button
        onClick={() => navigate(-1)} // Précédent
        className="absolute top-1/2 left-4 md:left-8 transform -translate-y-1/2 z-20
                   p-2 rounded-full bg-dark/30 dark:bg-light/30 text-light dark:text-dark
                   hover:bg-dark/50 dark:hover:bg-light/50 transition-colors"
        aria-label="Projet précédent"
      >
        <FiChevronLeft size={24} />
      </button>
      <button
        onClick={() => navigate(1)} // Suivant
        className="absolute top-1/2 right-4 md:right-8 transform -translate-y-1/2 z-20
                  p-2 rounded-full bg-dark/30 dark:bg-light/30 text-light dark:text-dark
                  hover:bg-dark/50 dark:hover:bg-light/50 transition-colors"
        aria-label="Projet suivant"
      >
        <FiChevronRight size={24} />
      </button>

      {/* Indicateurs (Dots) - Optionnel */}
       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex gap-2">
         {projectsData.map((_, index) => (
           <button
             key={index}
             onClick={() => {
               setDirection(index > currentIndex ? 1 : -1); // Détermine la direction pour l'anim
               setCurrentIndex(index);
             }}
             className={`w-3 h-3 rounded-full transition-colors duration-300
                        ${index === currentIndex ? 'bg-primary' : 'bg-dark/30 dark:bg-light/30 hover:bg-primary/50'}`}
             aria-label={`Aller au projet ${index + 1}`}
           />
         ))}
       </div>
    </div>
  );
};

export default ProjectCarousel;