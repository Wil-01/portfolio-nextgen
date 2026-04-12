import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { scrollToSection } from '../Navbar/Navbar';

const ScrollControls: React.FC = () => {
  const [progress,    setProgress]    = useState(0);
  const [showTopBtn,  setShowTopBtn]  = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop  = window.scrollY;
      const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShowTopBtn(scrollTop > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* ── Reading progress bar ── */}
      <div
        aria-hidden
        className="fixed top-0 left-0 z-[60] h-[2px] bg-gradient-to-r from-primary to-accent
                   transition-[width] duration-75 ease-linear pointer-events-none"
        style={{ width: `${progress}%` }}
      />

      {/* ── Scroll-to-top button ── */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.75, y: 12 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.75, y: 12  }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={() => scrollToSection('accueil', 0)}
            aria-label="Retour en haut de page"
            className="fixed bottom-6 right-5 sm:bottom-8 sm:right-8 z-40
                       w-10 h-10 rounded-xl
                       bg-primary hover:bg-primary-dark
                       text-white
                       shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40
                       flex items-center justify-center
                       transition-all duration-200 hover:-translate-y-0.5"
          >
            <ArrowUp size={17} />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default ScrollControls;
