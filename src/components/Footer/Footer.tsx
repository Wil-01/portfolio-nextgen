import React from 'react';
import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import { scrollToSection } from '../Navbar/Navbar';

const footerLinks = [
  { name: 'Accueil',  id: 'accueil'  },
  { name: 'À propos', id: 'about'    },
  { name: 'Projets',  id: 'projets'  },
  { name: 'Parcours', id: 'parcours' },
  { name: 'Contact',  id: 'contact'  },
];

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Wil-01',                           icon: <Github   size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/williams-kouton-godonou',  icon: <Linkedin size={18} /> },
  { label: 'Email',    href: 'mailto:williamskoutongodonou@gmail.com',               icon: <Mail     size={18} /> },
];

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-dark-border dark:border-dark-border border-light-border bg-dark-surface/40 dark:bg-dark-surface/40 bg-light-card/40">
      <div className="container mx-auto max-w-6xl px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div>
            <button
              onClick={() => scrollToSection('accueil')}
              className="inline-flex items-center gap-0.5 text-2xl font-black tracking-tight mb-3"
            >
              <span className="text-gradient">WKG</span>
              <span className="text-primary text-3xl leading-none">.</span>
            </button>
            <p className="text-sm text-dark/50 dark:text-light/45 leading-relaxed max-w-xs">
              Développeur Web Full Stack, je conçois et développe des solutions web orientées métier.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dark/35 dark:text-light/30 mb-4">
              Navigation
            </p>
            <ul className="flex flex-col gap-2">
              {footerLinks.map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-sm text-dark/55 dark:text-light/45 hover:text-primary dark:hover:text-primary-light transition-colors duration-200"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-dark/35 dark:text-light/30 mb-4">
              Me retrouver
            </p>
            <ul className="flex flex-col gap-3">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target={s.label !== 'Email' ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-sm text-dark/55 dark:text-light/45 hover:text-primary dark:hover:text-primary-light transition-colors duration-200 group"
                  >
                    <span className="text-dark/35 dark:text-light/30 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
                      {s.icon}
                    </span>
                    {s.label}
                    <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-60 -ml-1 transition-opacity duration-200" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-dark-border/60 dark:border-dark-border/60 border-light-border/60 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-dark/35 dark:text-light/30">
            © {year} Williams KOUTON GODONOU · Tous droits réservés.
          </p>
          <p className="text-xs text-dark/30 dark:text-light/25">
            React · Vite · TypeScript · Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
