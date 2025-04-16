// src/pages/Home.tsx
import React from 'react';
import { motion } from 'framer-motion';
// ... (autres imports: Typewriter, Tilt, avatarImg) ...
import { Typewriter } from 'react-simple-typewriter';
import Tilt from 'react-parallax-tilt';
import avatarImg from '../Assets/ams.jpeg';
// import { Container, Row, Col } from "react-bootstrap";
// import myImg from "../../Assets/avatar.png";
// import { AiOutlineDownload } from "react-icons/ai";

// import {
//   AiFillGithub,
//   AiOutlineTwitter, 
//   AiFillInstagram,
// } from "react-icons/ai";
// import { FaLinkedinIn } from "react-icons/fa";

// Définit les variants pour l'animation de la page entière
const pageVariants = {
  initial: {
    opacity: 0,
    // x: "-100vw", // Exemple: Slide depuis la gauche
    y: 20, // Léger slide vers le bas
  },
  in: {
    opacity: 1,
    // x: 0,
    y: 0,
  },
  out: {
    opacity: 0,
    // x: "100vw", // Exemple: Slide vers la droite
    y: -20, // Léger slide vers le haut
  },
};

// Définit les propriétés de transition
const pageTransition = {
  type: "tween", // Ou "spring"
  ease: "anticipate", // Un ease sympa pour l'entrée/sortie
  duration: 0.6,
};

const name = "Williams KOUTON";
const nameChars = name.split("");

const Home: React.FC = () => {
  // ... (variants pour container et items internes restent les mêmes) ...
    const containerVariants = { /* ... */ };
    const itemVariants = { /* ... */ };


  return (
    // Enveloppe TOUTE la page avec motion.div
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      // La classe 'min-h-screen' doit être sur l'élément motion.div externe maintenant
      className="min-h-screen flex items-center justify-center container mx-auto px-6 py-16 lg:py-24"
    >
        {/* Le contenu interne (grid, motion.h1 etc.) reste le même */}
        {/* Mais on peut ajuster ses propres animations (variants) si besoin */}
        <motion.div // Peut-être renommer l'ancien containerVariants en contentContainerVariants ?
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            variants={containerVariants} // Ces variants animent les éléments *à l'intérieur* de la page
            initial="hidden"
            animate="visible" // Déclenché après l'entrée de la page
            // Pas besoin de exit ici, car toute la page sort
        >
             {/* Colonne Texte */}
            <div className="text-center lg:text-left">
              {/* ... (motion.h1, motion.h2, Typewriter, etc. avec itemVariants) ... */}
               <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-bold mb-4">
                   Bonjour ! <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
               </motion.h1>
               <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-6">
                  Je suis
                  <span className="text-primary ml-2">
                    {nameChars.map((char, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.05, duration: 0.4 }} // Délai stagger + délai initial
                        style={{ display: 'inline-block' }} // Nécessaire pour l'animation individuelle
                      >
                        {char === " " ? "\u00A0" : char} {/* Gère l'espace */}
                      </motion.span>
                    ))}
                  </span>
                </motion.h2>
               <motion.div
                  variants={itemVariants}
                  className="text-2xl md:text-3xl font-semibold text-primary h-20 lg:h-16"
                  style={{ minHeight: '4rem' }}
                >
                 <Typewriter
                   words={['Developpeur Full stack', 'Freelancer', 'Developpeur MERN Stack', "A la recherche d'alternance"]}
                   loop={0} cursor cursorStyle='_' typeSpeed={70} deleteSpeed={50} delaySpeed={1000}
                 />
               </motion.div>
               <motion.p variants={itemVariants} className="mt-6 text-lg text-dark/80 dark:text-light/80">
               <p className="text-primary italic font-medium mb-2">
                  "J'aspire à développer des produits qui font la différence !"
                </p>
                <footer className="text-sm text-dark/70 dark:text-light/70">— Williams</footer>
               </motion.p>
            </div>

            {/* Colonne Image/Avatar */}
            <motion.div variants={itemVariants} className="flex justify-center lg:justify-end">
                <Tilt /* ...props... */ className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                    <img src={avatarImg} alt="Avatar" className="rounded-full w-full h-full object-cover shadow-2xl border-4 border-primary/50" />
                </Tilt>
            </motion.div>
        </motion.div>
    </motion.div>
  );
};

export default Home;