import React from 'react';
import ProjectCarousel from '../components/Projects/ProjectCarousel'; // Importe le carousel

const Projects: React.FC = () => {
  return (
    // La page elle-même n'a pas besoin de padding si le carousel prend tout l'écran
    <section className="w-full h-full">
      {/* Le carousel gère sa propre hauteur (h-screen dans l'exemple) */}
      <ProjectCarousel />
    </section>
  );
};

export default Projects;