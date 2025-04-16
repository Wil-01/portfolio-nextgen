// src/App.tsx
import React from 'react';
// Importe useLocation et Routes en plus
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Resume from './pages/Resume';
import Contact from './pages/Contact';
import { useEffect } from 'react';

// --- Composant ScrollToTop ---
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    // Léger délai pour permettre à l'animation de sortie de commencer
    // avant de scroller vers le haut (si nécessaire)
    setTimeout(() => {
        window.scrollTo(0, 0);
    }, 50); // Ajuste ce délai si besoin
  }, [pathname]);
  return null;
}
// --- Fin ScrollToTop ---

// Crée un composant intermédiaire pour pouvoir utiliser useLocation
function AnimatedRoutes() {
  const location = useLocation(); // Récupère l'objet location

  return (
    // AnimatePresence détecte les changements d'enfants basés sur leur clé (ici location.pathname)
    // mode="wait" attend que l'animation de sortie soit terminée avant de lancer l'entrée
    <AnimatePresence mode="wait">
      {/* Utilise location.pathname comme clé unique pour chaque route */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} /> {/* Fallback */}
      </Routes>
    </AnimatePresence>
  );
}


function App() {
  return (
    <Router>
      <ScrollToTop />
      {/* Layout reste à l'extérieur pour que Navbar/Footer ne soient pas animés */}
      <Layout>
         {/* Le composant AnimatedRoutes gère l'animation des pages */}
        <AnimatedRoutes />
      </Layout>
    </Router>
  );
}

export default App;