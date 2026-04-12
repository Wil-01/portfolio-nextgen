import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Download, MapPin, Calendar } from 'lucide-react';
import cvFile from '../Assets/williams.pdf';
import { useExperiences } from '../hooks/usePortfolioData';
import { DbExperience } from '../types/admin';

/* ─── Types ──────────────────────────────────────────────────────────────── */
interface TimelineEntry {
  type:         'experience' | 'education';
  period:       string;
  current?:     boolean;
  title:        string;
  organization: string;
  location?:    string;
  points:       string[];
  tags?:        string[];
}

function dbToTimeline(e: DbExperience): TimelineEntry {
  return {
    type:         e.type as 'experience' | 'education',
    period:       e.period,
    current:      e.is_current,
    title:        e.title,
    organization: e.organization,
    location:     e.location ?? undefined,
    points:       e.points ?? [],
    tags:         e.tags ?? [],
  };
}

/* ─── Static fallback data ───────────────────────────────────────────────── */
const staticExperiences: TimelineEntry[] = [
  {
    type:         'experience',
    period:       'Sept. 2025 → Aujourd\'hui',
    current:      true,
    title:        'Développeur Web Full Stack — Alternance',
    organization: 'Alfred Meeting',
    location:     'Paris, Île-de-France',
    points: [
      "Évolution de fonctionnalités métier sur l'espace partenaire et le CRM",
      "Gestion des règles de commissions, promotions et historique",
      "Développement de scrapers pour enrichir le catalogue de lieux",
      "Amélioration des interfaces d'administration et de l'expérience utilisateur",
      "Travail sur un codebase réel : maintenabilité, qualité, impacts métier",
    ],
    tags: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Blade'],
  },
  {
    type:         'experience',
    period:       'Août 2023 → Mars 2025 · 1 an 7 mois',
    title:        'Développeur Python',
    organization: 'Hélice',
    location:     'Cotonou, Bénin',
    points: [
      "Conception et développement de solutions web, logicielles et backend",
      "Intégration du web scraping pour l'extraction et le traitement de données",
      "Optimisation des processus internes et amélioration des performances",
    ],
    tags: ['Python', 'Django', 'PostgreSQL', 'Web Scraping', 'BeautifulSoup'],
  },
  {
    type:         'experience',
    period:       'Avr. 2024 → Sept. 2024 · 6 mois',
    title:        'Développeur Python',
    organization: 'CED Consult',
    location:     'Calavi, Bénin',
    points: [
      "Automatisation des processus internes via des scripts Python",
      "Optimisation de code existant et amélioration des performances",
      "Résolution de problèmes techniques liés aux projets clients",
    ],
    tags: ['Python', 'Pandas', 'NumPy', 'Automatisation'],
  },
  {
    type:         'experience',
    period:       'Fév. 2024 → Mars 2024 · 1 mois',
    title:        'Data Analyste',
    organization: 'Digital Management',
    location:     'Saint-Denis, France',
    points: [
      "Extraction et analyse de données via du scraping web",
      "Aide à la mise en place de campagnes publicitaires ciblées",
    ],
    tags: ['Python', 'Web Scraping', 'Data Analysis'],
  },
  {
    type:         'experience',
    period:       'Mai 2023 → Août 2023 · 4 mois',
    title:        'Développeur Full-Stack',
    organization: 'English for Busy People (EBP)',
    location:     'Cotonou, Bénin',
    points: [
      "Développement et amélioration d'un site web",
      "Optimisation de l'expérience utilisateur et stabilité applicative",
    ],
    tags: ['JavaScript', 'Django', 'HTML/CSS'],
  },
];

const staticFormations: TimelineEntry[] = [
  {
    type:         'education',
    period:       'Sept. 2024 → Juin 2026',
    current:      true,
    title:        'Titre RNCP — Développeur Web Full Stack (Niv. 5)',
    organization: 'Web@cadémie · Epitech Paris',
    location:     'Paris',
    points: [
      "Formation intensive au développement web full stack",
      "Projets pratiques : front-end, back-end, BDD, déploiement",
      "Alternance en entreprise sur des projets réels",
      "Validation des 3 axes : cadrage, développement, assurance qualité",
    ],
    tags: ['PHP', 'Laravel', 'React', 'MySQL', 'Git'],
  },
  {
    type:         'education',
    period:       '2022 → 2024',
    title:        'Licence 2 TCOM — option Développeur d\'Application',
    organization: 'Institut CERCO',
    location:     'Bénin',
    points: [
      "Bac+2 en Technologies de la Communication",
      "Spécialisation développement d'applications logicielles et web",
    ],
    tags: ['Algorithmique', 'Réseaux', 'Développement web'],
  },
  {
    type:         'education',
    period:       '2024',
    title:        'Piscine 42 — 9ème de la promotion',
    organization: '42 Paris',
    location:     'Paris',
    points: [
      "Immersion intensive en programmation sur 4 semaines",
      "Classé 9ème de la promotion — apprentissage par les pairs",
    ],
    tags: ['C', 'Algorithmique', 'Shell', 'Unix'],
  },
  {
    type:         'education',
    period:       '2024',
    title:        'IBM Full Stack Software Developer',
    organization: 'Coursera · IBM',
    points: [
      "Approfondissement des compétences full-stack avec les outils IBM",
      "Cloud, DevOps, microservices et développement d'applications modernes",
    ],
    tags: ['JavaScript', 'React', 'Node.js', 'Docker'],
  },
  {
    type:         'education',
    period:       '2023',
    title:        'Spécialisation Python',
    organization: 'Coursera · Université du Michigan',
    points: [
      "Maîtrise avancée du langage Python et de ses applications",
      "Structures de données, POO, automatisation et manipulation de données",
    ],
    tags: ['Python', 'Pandas', 'NumPy'],
  },
  {
    type:         'education',
    period:       '2021 – 2024',
    title:        'Autodidacte — Développement web',
    organization: 'OpenClassrooms · Coursera',
    points: [
      "Apprentissage continu : web, algorithmes, bases de données",
      "Nombreux projets personnels pour consolider les acquis",
    ],
    tags: ['HTML/CSS', 'JavaScript', 'PHP', 'SQL'],
  },
];

/* ─── Stat card ──────────────────────────────────────────────────────────── */
const stats = [
  { value: '5',      label: 'expériences pro'       },
  { value: '2 ans',  label: 'de formation intensive' },
  { value: '6',      label: 'projets sélectionnés'   },
  { value: '3',      label: 'axes de compétences'    },
];

/* ─── Timeline item ──────────────────────────────────────────────────────── */
interface TItemProps { entry: TimelineEntry; delay?: number }

const TimelineItem: React.FC<TItemProps> = ({ entry, delay = 0 }) => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  const isExp   = entry.type === 'experience';
  const accent  = isExp
    ? 'border-l-primary'
    : 'border-l-accent';
  const iconBg  = isExp
    ? 'bg-primary/10 text-primary dark:text-primary-light'
    : 'bg-accent/10 text-accent dark:text-accent-light';

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -16 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative pl-5 border-l-2 ${accent} mb-8 last:mb-0`}
    >
      {/* Dot on the line */}
      <span className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-2 border-dark-surface dark:border-dark-surface border-light-surface ${isExp ? 'bg-primary' : 'bg-accent'} ${entry.current ? 'animate-pulse-slow' : ''}`} />

      <div className="p-5 rounded-2xl bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border">

        {/* Header */}
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <div className={`p-2 rounded-lg shrink-0 ${iconBg}`}>
            {isExp ? <Briefcase size={15} /> : <GraduationCap size={15} />}
          </div>
          <div className="flex-grow min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-0.5">
              <h4 className="text-sm font-bold text-dark/90 dark:text-light/90 leading-snug">
                {entry.title}
              </h4>
              {entry.current && (
                <span className="badge bg-emerald-500/10 text-emerald-400 border border-emerald-500/[0.2] text-[10px]">
                  <span className="w-1 h-1 rounded-full bg-emerald-400 animate-pulse" />
                  En cours
                </span>
              )}
            </div>
            <p className="text-xs font-semibold text-primary dark:text-primary-light">{entry.organization}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap gap-3 mb-3 text-xs text-dark/40 dark:text-light/35">
          <span className="flex items-center gap-1">
            <Calendar size={11} />
            {entry.period}
          </span>
          {entry.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} />
              {entry.location}
            </span>
          )}
        </div>

        {/* Points */}
        <ul className="flex flex-col gap-1.5 mb-4">
          {entry.points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-dark/60 dark:text-light/50 leading-relaxed">
              <span className={`mt-1.5 w-1 h-1 rounded-full shrink-0 ${isExp ? 'bg-primary/60' : 'bg-accent/60'}`} />
              {pt}
            </li>
          ))}
        </ul>

        {/* Tags */}
        {entry.tags && (
          <div className="flex flex-wrap gap-1.5">
            {entry.tags.map((t) => (
              <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dark-surface/60 dark:bg-dark-surface/60 bg-light/70 text-dark/45 dark:text-light/35 border border-dark-border dark:border-dark-border border-light-border font-medium">
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

/* ─── Column header ──────────────────────────────────────────────────────── */
interface ColHeadProps { icon: React.ReactNode; label: string; accent: string }
const ColHead: React.FC<ColHeadProps> = ({ icon, label, accent }) => (
  <div className={`flex items-center gap-2.5 mb-8 pb-4 border-b ${accent}`}>
    <span className="text-dark/60 dark:text-light/50">{icon}</span>
    <h3 className="text-lg font-bold text-dark/90 dark:text-light/90">{label}</h3>
  </div>
);

/* ─── Main section ───────────────────────────────────────────────────────── */
const Parcours: React.FC = () => {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const { entries, loading } = useExperiences();

  const experiences = loading || entries.length === 0
    ? staticExperiences
    : entries.filter(e => e.type === 'experience').map(dbToTimeline);

  const formations = loading || entries.length === 0
    ? staticFormations
    : entries.filter(e => e.type === 'education').map(dbToTimeline);

  return (
    <div className="py-28 px-6 relative">

      {/* Background blob */}
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px]" />
      </div>

      <div className="container mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-3">
            Parcours
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-6">
            Expérience &amp; <span className="text-gradient">Formation</span>
          </h2>

          {/* Download CV */}
          <a
            href={cvFile}
            download="CV_Williams_KOUTON_GODONOU.pdf"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-primary/25 hover:-translate-y-0.5"
          >
            <Download size={16} />
            Télécharger mon CV
          </a>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="p-4 rounded-2xl text-center bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border"
            >
              <p className="text-2xl sm:text-3xl font-black text-gradient mb-0.5">{s.value}</p>
              <p className="text-xs text-dark/50 dark:text-light/40 leading-tight">{s.label}</p>
            </div>
          ))}
        </motion.div>

        {/* ── Two columns ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Expérience */}
          <div>
            <ColHead
              icon={<Briefcase size={18} />}
              label="Expérience professionnelle"
              accent="border-primary/30"
            />
            {experiences.map((entry, i) => (
              <TimelineItem key={i} entry={entry} delay={i * 0.1} />
            ))}
          </div>

          {/* Formation */}
          <div>
            <ColHead
              icon={<GraduationCap size={18} />}
              label="Formation & Certifications"
              accent="border-accent/30"
            />
            {formations.map((entry, i) => (
              <TimelineItem key={i} entry={entry} delay={i * 0.08} />
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Parcours;
