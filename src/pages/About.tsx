import React from 'react';
import { motion } from 'framer-motion';

// Importe tes composants spécifiques (adapte les chemins)
import AboutCard from '../components/About/AboutCard';
import RolesBadges from '../components/About/RolesBadges';
import Techstack from '../components/About/Techstack';
import Toolstack from '../components/About/Toolstack';
import GithubCalendar from '../components/About/GithubCalendar'; // Assure-toi que ce composant existe

// Importe l'image (adapte le chemin)
import laptopImg from '../Assets/abouts.png'; // Vérifie ce chemin

const About: React.FC = () => {
  // Configurations d'animation Framer Motion (similaires à Home)
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    // min-h-screen assure que la section prend au moins la hauteur de l'écran
    // container mx-auto px-6 pour centrage et padding
    // py-24 pour espace vertical (ajuster au besoin)
    <motion.section
      className="min-h-screen container mx-auto px-6 py-24"
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Section Introduction */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
        {/* Colonne Texte */}
        <motion.div variants={itemVariants}>
          <h1 className="text-4xl font-bold mb-6">
            Qui <span className="text-primary">Suis-je</span> ?
          </h1>
          {/* Ton composant AboutCard */}
          <AboutCard />
        </motion.div>

        {/* Colonne Image */}
        <motion.div variants={itemVariants} className="flex justify-center items-center">
          <img src={laptopImg} alt="Illustration A Propos" className="max-w-md w-full" />
        </motion.div>
      </div>

      {/* Section Badges de Rôles */}
      <motion.div variants={itemVariants} className="mb-24">
         {/* Le composant RolesBadges s'occupe de sa propre mise en page (grid/flex) */}
        <RolesBadges />
      </motion.div>


      {/* Section Compétences */}
      <motion.div variants={itemVariants} className="mb-24 text-center">
        <h2 className="text-3xl font-bold mb-12">
          Compétences <span className="text-primary">Professionnelles</span>
        </h2>
         {/* Le composant Techstack gère l'affichage des icônes */}
        <Techstack />
      </motion.div>

      {/* Section Outils */}
      <motion.div variants={itemVariants} className="mb-24 text-center">
        <h2 className="text-3xl font-bold mb-12">
          <span className="text-primary">Outils</span> Utilisés
        </h2>
         {/* Le composant Toolstack gère l'affichage des icônes */}
        <Toolstack />
      </motion.div>

      {/* Section GitHub Calendar */}
      <motion.div variants={itemVariants} className="mb-16 text-center">
        <h2 className="text-3xl font-bold mb-12">
           <span className="text-primary">Activité</span> GitHub
        </h2>
        {/* Le composant GithubCalendar gère l'affichage */}
        {/* ATTENTION: Passer le bon username ici ! */}
        <GithubCalendar username="Wil-01" />
      </motion.div>

    </motion.section>
  );
};

export default About;