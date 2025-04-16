import React from 'react';
import { motion } from 'framer-motion';
import { AiOutlineDownload } from 'react-icons/ai'; // Icône pour le bouton

// Importe le composant Experience
import Experience from '../components/Resume/Experience';

// Importe ton fichier PDF (assure-toi que le chemin est correct)
import pdf from '../Assets/williams.pdf'; // Ajuste le chemin

const Resume: React.FC = () => {
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <motion.section
      className="min-h-screen container mx-auto px-6 py-24"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Titre et Bouton de Téléchargement */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-16"
      >
        <h1 className="text-4xl font-bold text-center">
          Mon <span className="text-primary">Parcours</span>
        </h1>
        <a
          href={pdf}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white dark:text-dark rounded-lg shadow-md hover:bg-primary/80 transition-colors duration-200 font-semibold"
        >
          <AiOutlineDownload size={20} />
          Télécharger CV
        </a>
      </motion.div>

      {/* Composant Timeline */}
      {/* L'animation des éléments se fait dans le composant Experience lui-même */}
      <Experience />

    </motion.section>
  );
};

export default Resume;