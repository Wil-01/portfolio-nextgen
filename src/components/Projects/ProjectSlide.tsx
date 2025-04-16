import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Project } from '../../data/projectData'; // Importe l'interface et les données
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'; // Icônes pour les liens

interface ProjectSlideProps {
  project: Project;
  isActive: boolean; // Pour savoir si le slide est actuellement affiché
}

const ProjectSlide: React.FC<ProjectSlideProps> = ({ project, isActive }) => {
  const [isHovering, setIsHovering] = useState(false);

  // Variants pour animer le contenu du slide actif
  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut', delay: 0.3 } }, // Léger délai
  };

  const mediaVariants = {
     hidden: { opacity: 0, scale: 0.9 },
     visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const textLineVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({ // i est le délai personnalisé
      opacity: 1,
      y: 0,
      transition: { delay: 0.4 + i * 0.05, duration: 0.5, ease: 'easeOut' }, // Délai initial + stagger
    }),
  };


  return (
    // Prend toute la hauteur et largeur disponible dans le conteneur du carousel
    <div className="w-full h-full flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-6 md:p-12 relative overflow-hidden">

      {/* Colonne Média (Image/Vidéo) */}
      <motion.div
        className="w-full lg:w-1/2 aspect-video relative rounded-lg overflow-hidden shadow-2xl cursor-pointer"
        onMouseEnter={() => project.video && setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        variants={mediaVariants} // Animation pour le conteneur média
        initial="hidden"
        animate={isActive ? "visible" : "hidden"} // S'anime seulement si actif
      >
        {/* Image */}
        <motion.img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-contain bg-dark/50" // object-contain pour voir toute l'image
          initial={{ opacity: 1 }}
          animate={{ opacity: isHovering && project.video ? 0 : 1 }} // Cache l'image si survol et vidéo existe
          transition={{ duration: 0.3 }}
        />
        {/* Vidéo (si elle existe et si survol) */}
        {project.video && (
          <motion.video
            key={project.video} // Important pour forcer le re-rendu si la vidéo change
            className="absolute inset-0 w-full h-full object-contain"
            src={project.video}
            autoPlay
            loop
            muted
            playsInline // Important pour mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }} // Affiche la vidéo si survol
            transition={{ duration: 0.3 }}
          />
        )}
      </motion.div>

      {/* Colonne Informations */}
      <div className="w-full lg:w-1/2 text-center lg:text-left">
        {/* Anime chaque élément textuel séparément si le slide est actif */}
        {isActive && (
          <>
            <motion.h3
              className="text-sm font-semibold uppercase tracking-widest text-primary mb-2"
              variants={textLineVariants} custom={0} initial="hidden" animate="visible"
            >
              {project.subtitle}
            </motion.h3>
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 text-dark dark:text-light"
              variants={textLineVariants} custom={1} initial="hidden" animate="visible" // Délai 1
            >
              {project.title}
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-dark/80 dark:text-light/80 mb-6 leading-relaxed"
               variants={textLineVariants} custom={2} initial="hidden" animate="visible" // Délai 2
            >
              {project.description}
            </motion.p>
            <motion.div
               className="flex gap-4 justify-center lg:justify-start"
               variants={textLineVariants} custom={3} initial="hidden" animate="visible" // Délai 3
            >
              {/* Liens */}
              <div className="flex gap-4 justify-center lg:justify-start">
                {project.githubLink && (
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-primary text-primary rounded hover:bg-primary hover:text-white dark:hover:text-dark transition-colors duration-200"
                  >
                    <FaGithub /> GitHub
                  </a>
                )}
                {project.demoLink && project.demoLink !== '#' && (
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-dark rounded hover:bg-primary/80 transition-colors duration-200"
                  >
                    <FaExternalLinkAlt /> Démo
                  </a>
                )}
              </div>
            </motion.div>
          </>
        )}
        {/* Affiche une version statique si non actif pour éviter les "flashs" */}
         {!isActive && (
             <div className="opacity-0"> {/* Garde la place mais invisible */}
                 <h3 className="text-sm ...">{project.subtitle}</h3>
                 <h2 className="text-3xl ...">{project.title}</h2>
                 {/* ... etc ... */}
             </div>
         )}
      </div>
    </div>
  );
};

export default ProjectSlide;