import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import { ArrowRight, Download, Mail, Github, Linkedin, MapPin } from 'lucide-react';
import { scrollToSection } from '../components/Navbar/Navbar';
import avatarImg from '../Assets/amss.jpeg';
import cvFile from '../Assets/williams.pdf';

/* ─── Variants ──────────────────────────────────────────────────────────── */
const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.15 } },
};
const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
};

const socials = [
  { label: 'GitHub',   href: 'https://github.com/Wil-01',                            icon: <Github   size={18} /> },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/williams-kouton-godonou',   icon: <Linkedin size={18} /> },
  { label: 'Email',    href: 'mailto:williamskoutongodonou@gmail.com',                icon: <Mail     size={18} /> },
];

/* ─── Component ─────────────────────────────────────────────────────────── */
const Hero: React.FC = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="accueil" className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background glows */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-primary/10 dark:bg-primary/10 blur-[120px] opacity-70" />
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full bg-accent/[0.08] blur-[100px] opacity-50" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl px-6 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >

          {/* ─── Left ─── */}
          <div className="order-2 lg:order-1">

            {/* Status badge */}
            <motion.div variants={fadeUp} className="mb-6">
              <span className="badge bg-primary/10 text-primary dark:text-primary-light border border-primary/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                En alternance · Alfred Meeting
              </span>
            </motion.div>

            {/* Greeting */}
            <motion.p variants={fadeUp} className="text-base font-medium text-dark/50 dark:text-light/40 mb-2 tracking-wide">
              Bonjour, je suis
            </motion.p>

            {/* Name */}
            <motion.h1 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-tight leading-[1.05] mb-3">
              <span className="text-dark dark:text-light">Williams</span>
              <br />
              <span className="text-gradient">KOUTON</span>
            </motion.h1>

            {/* Title + Typewriter */}
            <motion.div variants={fadeUp} className="mb-5">
              <h2 className="text-xl sm:text-2xl font-semibold text-dark/70 dark:text-light/60">
                Développeur Web{' '}
                <span className="text-primary dark:text-primary-light">
                  <Typewriter
                    words={['Full Stack', 'Front-End', 'Back-End Laravel', 'orienté produit']}
                    loop={0}
                    cursor
                    cursorStyle="|"
                    typeSpeed={60}
                    deleteSpeed={35}
                    delaySpeed={2200}
                  />
                </span>
              </h2>
            </motion.div>

            {/* Bio */}
            <motion.p variants={fadeUp} className="text-base text-dark/60 dark:text-light/50 leading-relaxed max-w-lg mb-8">
              Je conçois, développe et fais évoluer des solutions web utiles, robustes
              et orientées métier. Actuellement en alternance chez{' '}
              <span className="text-dark/80 dark:text-light/70 font-medium">Alfred Meeting</span>,
              je travaille sur des applications web concrètes, des outils métier et des
              problématiques de données et d&rsquo;amélioration continue.
            </motion.p>

            {/* CTAs */}
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8">
              <button
                onClick={() => scrollToSection('projets')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
              >
                Voir mes projets
                <ArrowRight size={16} />
              </button>
              <a
                href={cvFile}
                download="CV_Williams_KOUTON_GODONOU.pdf"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-dark-card dark:bg-dark-card bg-light-card text-dark/80 dark:text-light/80 border border-dark-border dark:border-dark-border border-light-border text-sm font-semibold hover:border-primary/40 hover:text-primary dark:hover:text-primary-light transition-all duration-200 hover:-translate-y-0.5"
              >
                <Download size={16} />
                Télécharger CV
              </a>
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-transparent text-dark/70 dark:text-light/60 border border-dark-border dark:border-dark-border border-light-border text-sm font-semibold hover:border-primary/40 hover:text-primary dark:hover:text-primary-light transition-all duration-200 hover:-translate-y-0.5"
              >
                Me contacter
              </button>
            </motion.div>

            {/* Socials */}
            <motion.div variants={fadeUp} className="flex items-center gap-1">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.label !== 'Email' ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="p-2.5 rounded-xl text-dark/40 dark:text-light/35 hover:text-primary dark:hover:text-primary-light hover:bg-primary/[0.08] transition-all duration-200"
                >
                  {s.icon}
                </a>
              ))}
              <span className="ml-2 text-xs text-dark/30 dark:text-light/25 font-medium">
                GitHub · LinkedIn · Email
              </span>
            </motion.div>
          </div>

          {/* ─── Right ─── */}
          <motion.div variants={fadeIn} className="order-1 lg:order-2 flex flex-col items-center gap-5">
            {/* Spinning ring photo */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-20 scale-110" />
              <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80">
                {/* Conic gradient ring */}
                <div
                  className="absolute inset-0 rounded-full spin-ring"
                  style={{
                    background: 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #a78bfa, transparent 60%, transparent 80%, #6366f1)',
                    padding: '3px',
                  }}
                >
                  <div className="w-full h-full rounded-full bg-light dark:bg-dark" />
                </div>
                {/* Photo */}
                <motion.img
                  src={avatarImg}
                  alt="Williams KOUTON GODONOU"
                  className="absolute inset-[4px] w-[calc(100%-8px)] h-[calc(100%-8px)] rounded-full object-cover object-top"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap justify-center gap-2.5">
              <div className="bg-black/[0.06] dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-2 px-3.5 py-2 rounded-xl">
                <MapPin size={13} className="text-primary dark:text-primary-light shrink-0" />
                <span className="text-xs font-medium text-dark/65 dark:text-light/55">Paris, Île-de-France</span>
              </div>
              <div className="bg-black/[0.06] dark:bg-white/[0.06] backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] flex items-center gap-2 px-3.5 py-2 rounded-xl">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-medium text-dark/65 dark:text-light/55">Alternant · Ouvert aux opportunités</span>
              </div>
            </div>
          </motion.div>

        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="hidden lg:flex justify-center mt-16"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <div className="flex flex-col items-center gap-1.5 text-dark/25 dark:text-light/20">
            <span className="text-[10px] font-medium uppercase tracking-widest">Défiler</span>
            <motion.div
              className="w-[1px] h-8 bg-gradient-to-b from-primary/40 to-transparent"
              animate={{ scaleY: [0, 1, 0], originY: 0 }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
