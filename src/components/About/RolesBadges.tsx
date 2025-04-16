import React from 'react';
import { motion } from 'framer-motion';

const roles = [
  { title: 'Frontend', subtitle: 'Developer' },
  { title: 'React.js', subtitle: 'Developer' },
  { title: 'Backend', subtitle: 'Developer' },
  { title: 'Full Stack', subtitle: 'Developer' },
];

const RolesBadges: React.FC = () => {
  const badgeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({ // type explicite pour 'i'
      opacity: 1,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, ease: 'easeOut' },
    }),
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
      {roles.map((role, index) => (
        <motion.div
          key={index}
          className="bg-light/20 dark:bg-dark-light/50 p-4 rounded-xl shadow-lg text-center cursor-pointer border border-dark/10 dark:border-light/10"
          custom={index} // Passe l'index pour le délai
          variants={badgeVariants}
          initial="hidden"
          animate="visible" // On peut utiliser whileInView pour animer au scroll
          whileHover="hover"
          whileTap="tap"
        >
          <h3 className="text-lg md:text-xl font-semibold text-primary mb-1">{role.title}</h3>
          <p className="text-sm md:text-base text-dark/80 dark:text-light/80">{role.subtitle}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default RolesBadges;