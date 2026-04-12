import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, Github } from 'lucide-react';
import { useTheme } from '../Theme/ThemeContext';

/* ─── Data ───────────────────────────────────────────────────────────────── */
const navLinks = [
  { name: 'Accueil',  id: 'accueil'  },
  { name: 'À propos', id: 'about'    },
  { name: 'Projets',  id: 'projets'  },
  { name: 'Parcours', id: 'parcours' },
  { name: 'Contact',  id: 'contact'  },
];

/* ─── Smooth scroll helper (uses Lenis when available) ───────────────────── */
export const scrollToSection = (id: string, offset = -80) => {
  const lenis = (window as any).__lenis;
  if (lenis) {
    lenis.scrollTo(`#${id}`, { offset, duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  } else {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }
};

/* ─── Component ─────────────────────────────────────────────────────────── */
const Navbar: React.FC = () => {
  const [isOpen,        setIsOpen]        = useState(false);
  const [scrolled,      setScrolled]      = useState(false);
  const [activeSection, setActiveSection] = useState('accueil');
  const { theme, toggleTheme }            = useTheme();

  /* Glassmorphism trigger */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Scroll spy – highlights the section currently in view */
  useEffect(() => {
    const ids = navLinks.map(l => l.id);
    const detect = () => {
      const offset = window.innerHeight * 0.35;
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= offset) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => window.removeEventListener('scroll', detect);
  }, []);

  const handleClick = (id: string) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-light/90 dark:bg-dark/85 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.06] shadow-lg shadow-black/[0.06] dark:shadow-black/30'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto max-w-6xl px-6 flex justify-between items-center">

        {/* ── Logo ── */}
        <button
          onClick={() => handleClick('accueil')}
          className="flex items-center gap-0.5 text-xl font-black tracking-tight"
        >
          <span className="text-gradient">WKG</span>
          <span className="text-primary text-2xl leading-none">.</span>
        </button>

        {/* ── Desktop links ── */}
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleClick(link.id)}
              className={`relative text-sm font-medium transition-colors duration-200 group ${
                activeSection === link.id
                  ? 'text-primary-light'
                  : 'text-dark/50 dark:text-light/50 hover:text-dark/90 dark:hover:text-light/90'
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] rounded-full bg-primary transition-all duration-300 ${
                  activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                }`}
              />
            </button>
          ))}
        </div>

        {/* ── Desktop actions ── */}
        <div className="hidden md:flex items-center gap-2">
          <a
            href="https://github.com/Wil-01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg text-dark/45 dark:text-light/45 hover:text-dark/90 dark:hover:text-light/90 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            <Github size={17} />
          </a>
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Passer au mode clair' : 'Passer au mode sombre'}
            className="p-2 rounded-lg text-dark/45 dark:text-light/45 hover:text-dark/90 dark:hover:text-light/90 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* ── Mobile actions ── */}
        <div className="md:hidden flex items-center gap-1">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg text-dark/45 dark:text-light/45 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={isOpen}
            className="p-2 rounded-lg text-dark/45 dark:text-light/45 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-light/95 dark:bg-dark/95 backdrop-blur-2xl border-b border-black/[0.06] dark:border-white/[0.06]"
          >
            <div className="container mx-auto max-w-6xl px-6 py-3 flex flex-col gap-0.5">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleClick(link.id)}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'text-primary dark:text-primary-light bg-primary/10'
                      : 'text-dark/55 dark:text-light/55 hover:text-dark/90 dark:hover:text-light/90 hover:bg-black/[0.05] dark:hover:bg-white/[0.05]'
                  }`}
                >
                  {link.name}
                </button>
              ))}
              <a
                href="https://github.com/Wil-01"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm font-medium text-dark/55 dark:text-light/55 hover:text-dark/90 dark:hover:text-light/90 hover:bg-black/[0.05] dark:hover:bg-white/[0.05] transition-all duration-200"
              >
                <Github size={15} />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
