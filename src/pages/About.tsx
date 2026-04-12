import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Target, Code2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import laptopImg from '../Assets/abouts.png';
import GithubCalendar from '../components/About/GithubCalendar';
import { useSkillCategories } from '../hooks/usePortfolioData';

/* ─── Animation helpers ─────────────────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/* ─── Data ───────────────────────────────────────────────────────────────── */
const characteristics = [
  'Polyvalence front-end / back-end',
  'Capacité à travailler sur un existant',
  'Intérêt fort pour les problématiques métier et produit',
  'Progression nette sur la rigueur, la lisibilité et la robustesse',
];

const evolution = [
  {
    period: '2024',
    title: 'Intégration des bases',
    description: 'Premiers projets web, apprentissage des langages, logique applicative et premières bases de données.',
  },
  {
    period: '2024 – 2025',
    title: 'Montée en complexité',
    description: 'Projets full stack avec authentification, déploiement, architectures plus structurées et stacks variées.',
  },
  {
    period: '2025 – 2026',
    title: 'Environnement professionnel',
    description: 'Alternance chez Alfred Meeting : codebase réel, logique métier, qualité, maintenabilité et amélioration continue.',
  },
];

const axes = [
  {
    number: '01',
    icon: <Target size={22} />,
    title: 'Cadrer & conceptualiser',
    description:
      "Analyser les besoins, rédiger des spécifications, choisir une stack, concevoir l'architecture applicative et la structure de données.",
    skills: ['Analyse fonctionnelle', 'CDC', 'Spécifications', 'Maquettage', 'Architecture', 'Modélisation BDD'],
    colorClass:  'text-blue-400',
    bgClass:     'bg-blue-500/[0.07] dark:bg-blue-500/[0.07]',
    borderClass: 'border-blue-500/[0.15]',
    dotClass:    'bg-blue-400',
    badgeClass:  'bg-blue-500/10 text-blue-400 border border-blue-500/[0.2]',
  },
  {
    number: '02',
    icon: <Code2 size={22} />,
    title: 'Développer',
    description:
      'Front-end, back-end, logique métier, authentification, gestion des données, tests et déploiement.',
    skills: ['Front-end', 'Back-end Laravel', 'MySQL / PostgreSQL', 'API REST', 'Auth & permissions', 'Déploiement'],
    colorClass:  'text-primary-light',
    bgClass:     'bg-primary/[0.07] dark:bg-primary/[0.07]',
    borderClass: 'border-primary/[0.15]',
    dotClass:    'bg-primary',
    badgeClass:  'bg-primary/10 text-primary-light border border-primary/[0.2]',
  },
  {
    number: '03',
    icon: <ShieldCheck size={22} />,
    title: 'Assurer la qualité',
    description:
      'Documentation, retours utilisateurs, amélioration continue, ergonomie, accessibilité, performance et maintenabilité.',
    skills: ['Documentation', 'Tests manuels', 'UX / UI', 'Accessibilité', 'Performance', 'Amélioration continue'],
    colorClass:  'text-emerald-400',
    bgClass:     'bg-emerald-500/[0.07] dark:bg-emerald-500/[0.07]',
    borderClass: 'border-emerald-500/[0.15]',
    dotClass:    'bg-emerald-400',
    badgeClass:  'bg-emerald-500/10 text-emerald-400 border border-emerald-500/[0.2]',
  },
];

const staticSkillCategories = [
  {
    label: 'Conception & Cadrage',
    skills: ['Analyse fonctionnelle', 'Cahier des charges', 'Spécifications techniques', 'Maquettage', 'Architecture web', 'Modélisation BDD', 'Choix de stack'],
    badgeCls: 'bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.18]',
    headCls:  'text-blue-400',
  },
  {
    label: 'Front-End',
    skills: ['HTML / CSS', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS', 'Blade', 'Responsive design'],
    badgeCls: 'bg-cyan-500/[0.08] text-cyan-400 border border-cyan-500/[0.18]',
    headCls:  'text-cyan-400',
  },
  {
    label: 'Back-End',
    skills: ['PHP', 'Laravel', 'Eloquent ORM', 'MySQL', 'PostgreSQL', 'API REST', 'Auth & permissions', 'Logique métier'],
    badgeCls: 'bg-violet-500/[0.08] text-violet-400 border border-violet-500/[0.18]',
    headCls:  'text-violet-400',
  },
  {
    label: 'Data & Automatisation',
    skills: ['Scraping web', 'Parsing de données', 'Normalisation', 'Import / Export', 'Déduplication', 'Structuration JSON'],
    badgeCls: 'bg-amber-500/[0.08] text-amber-400 border border-amber-500/[0.18]',
    headCls:  'text-amber-400',
  },
  {
    label: 'Qualité & Livraison',
    skills: ['Documentation', 'Amélioration continue', 'Tests manuels', 'Déploiement', 'SEO', 'Accessibilité', 'Retours utilisateurs'],
    badgeCls: 'bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.18]',
    headCls:  'text-emerald-400',
  },
  {
    label: 'Outils & Environnement',
    skills: ['Git / GitHub', 'PhpStorm', 'AWS', 'Cloudflare', 'OVH', 'WSL', 'XAMPP'],
    badgeCls: 'bg-slate-500/[0.08] text-slate-400 border border-slate-500/[0.18]',
    headCls:  'text-slate-400',
  },
];

/* ─── Sub-components ────────────────────────────────────────────────────── */
interface SectionHeadProps { eyebrow: string; title: React.ReactNode }
const SectionHead: React.FC<SectionHeadProps> = ({ eyebrow, title }) => (
  <div className="text-center mb-16">
    <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-3">
      {eyebrow}
    </span>
    <h2 className="text-4xl sm:text-5xl font-black tracking-tight">{title}</h2>
  </div>
);

interface SubHeadProps { children: React.ReactNode }
const SubHead: React.FC<SubHeadProps> = ({ children }) => (
  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-10 text-center">{children}</h3>
);

/* ─── AnimatedBlock helper (scroll-triggered) ────────────────────────────── */
interface AnimatedBlockProps { children: React.ReactNode; className?: string; delay?: number }
const AnimatedBlock: React.FC<AnimatedBlockProps> = ({ children, className = '', delay = 0 }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] } } }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Main section ──────────────────────────────────────────────────────── */
const About: React.FC = () => {
  const bioRef    = useRef(null);
  const bioInView = useInView(bioRef, { once: true, margin: '-80px' });
  const { cats, loading: skillsLoading } = useSkillCategories();

  const skillCategories = !skillsLoading && cats.length > 0
    ? cats.map(c => ({ label: c.label, skills: c.skills, badgeCls: c.badge_cls, headCls: c.head_cls }))
    : staticSkillCategories;

  return (
    <section id="about" className="py-28 px-6 relative overflow-hidden">

      {/* Subtle background blob */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>

      <div className="container mx-auto max-w-6xl">

        {/* ══════════ HEADER ══════════ */}
        <AnimatedBlock>
          <SectionHead
            eyebrow="À propos"
            title={<>Qui suis-<span className="text-gradient">je</span> ?</>}
          />
        </AnimatedBlock>

        {/* ══════════ BIO ══════════ */}
        <motion.div
          ref={bioRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-28"
          variants={stagger}
          initial="hidden"
          animate={bioInView ? 'visible' : 'hidden'}
        >
          {/* Text */}
          <motion.div variants={fadeUp}>
            <p className="text-base text-dark/70 dark:text-light/60 leading-relaxed mb-5">
              Je suis développeur web full stack, actuellement en alternance chez{' '}
              <span className="font-semibold text-dark/90 dark:text-light/90">Alfred Meeting</span>.
              Au cours de ma formation, j&rsquo;ai travaillé sur des projets académiques, personnels
              et professionnels avec différentes stacks et différents niveaux de complexité.
            </p>
            <p className="text-base text-dark/70 dark:text-light/60 leading-relaxed mb-5">
              Ce parcours m&rsquo;a permis de développer une vision plus complète du métier :
              comprendre un besoin, cadrer une solution, concevoir une architecture, développer
              des fonctionnalités, intégrer une base de données, améliorer l&rsquo;expérience
              utilisateur et faire évoluer un produit existant de manière plus rigoureuse.
            </p>
            <p className="text-base text-dark/70 dark:text-light/60 leading-relaxed mb-8">
              Aujourd&rsquo;hui, je m&rsquo;intéresse particulièrement aux applications web utiles,
              aux outils métier, aux problématiques de qualité logicielle et à la manière de
              transformer un besoin concret en solution fiable.
            </p>

            {/* Characteristics */}
            <ul className="flex flex-col gap-2.5">
              {characteristics.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-primary dark:text-primary-light shrink-0 mt-0.5" />
                  <span className="text-sm text-dark/70 dark:text-light/60">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Illustration */}
          <motion.div variants={fadeUp} className="flex justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-primary/10 blur-3xl scale-90" />
              <img
                src={laptopImg}
                alt="Illustration développeur"
                loading="lazy"
                decoding="async"
                className="relative max-w-sm w-full rounded-2xl"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* ══════════ ÉVOLUTION ══════════ */}
        <AnimatedBlock className="mb-28">
          <SubHead>
            Mon <span className="text-gradient">évolution</span>
          </SubHead>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Connecting line (desktop) */}
            <div className="hidden md:block absolute top-9 left-[calc(33%+1rem)] right-[calc(33%+1rem)] h-px bg-dark-border dark:bg-dark-border bg-light-border z-0" />

            {evolution.map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center p-6 rounded-2xl bg-dark-card/50 dark:bg-dark-card/50 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border">
                {/* Step bubble */}
                <div className="w-10 h-10 rounded-full bg-dark-surface dark:bg-dark-surface bg-light-surface border-2 border-primary/40 flex items-center justify-center mb-4 shrink-0">
                  <span className="text-sm font-bold text-primary dark:text-primary-light">{i + 1}</span>
                </div>
                <span className="text-xs font-bold text-primary dark:text-primary-light mb-1">{step.period}</span>
                <h4 className="font-bold text-dark/90 dark:text-light/90 mb-2">{step.title}</h4>
                <p className="text-sm text-dark/55 dark:text-light/45 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        {/* ══════════ 3 AXES ══════════ */}
        <AnimatedBlock className="mb-28">
          <SubHead>
            Compétences <span className="text-gradient">démontrées</span>
          </SubHead>
          <p className="text-center text-dark/55 dark:text-light/45 text-sm max-w-2xl mx-auto mb-12 leading-relaxed">
            Mon portfolio s&rsquo;organise autour des trois axes de compétences attendus pour la validation du titre :
            cadrer, développer, et assurer la qualité.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {axes.map((axe) => (
              <div
                key={axe.number}
                className={`relative p-6 rounded-2xl border ${axe.bgClass} ${axe.borderClass} flex flex-col`}
              >
                {/* Number */}
                <span className={`text-5xl font-black opacity-10 absolute top-4 right-5 ${axe.colorClass} select-none`}>
                  {axe.number}
                </span>
                {/* Icon */}
                <div className={`${axe.colorClass} mb-4`}>{axe.icon}</div>
                {/* Title */}
                <h4 className={`text-lg font-bold mb-3 ${axe.colorClass}`}>{axe.title}</h4>
                {/* Description */}
                <p className="text-sm text-dark/60 dark:text-light/50 leading-relaxed mb-4 flex-grow">
                  {axe.description}
                </p>
                {/* Skill badges */}
                <div className="flex flex-wrap gap-1.5">
                  {axe.skills.map((skill) => (
                    <span key={skill} className={`text-xs px-2 py-0.5 rounded-full font-medium ${axe.badgeClass}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedBlock>

        {/* ══════════ SKILLS GRID ══════════ */}
        <AnimatedBlock className="mb-28">
          <SubHead>
            Compétences <span className="text-gradient">clés</span>
          </SubHead>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {skillCategories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                className="p-5 rounded-2xl bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border"
              >
                <h4 className={`text-sm font-bold mb-3 ${cat.headCls}`}>{cat.label}</h4>
                <div className="flex flex-wrap gap-1.5">
                  {cat.skills.map((skill) => (
                    <span key={skill} className={`text-xs px-2.5 py-1 rounded-full font-medium ${cat.badgeCls}`}>
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatedBlock>

        {/* ══════════ GITHUB CALENDAR ══════════ */}
        <AnimatedBlock>
          <SubHead>
            Activité <span className="text-gradient">GitHub</span>
          </SubHead>
          <div className="p-6 rounded-2xl bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border overflow-x-auto">
            <GithubCalendar username="Wil-01" />
          </div>
        </AnimatedBlock>

      </div>
    </section>
  );
};

export default About;
