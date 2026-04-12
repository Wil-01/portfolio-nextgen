import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Project, ProjectCategory } from '../data/projectData';
import { useProjects } from '../hooks/usePortfolioData';
import ProjectCard  from '../components/Projects/ProjectCard';
import ProjectModal from '../components/Projects/ProjectModal';

/* ─── Filter config ──────────────────────────────────────────────────────── */
type Filter = 'all' | ProjectCategory;

const filters: { id: Filter; label: string }[] = [
  { id: 'all',           label: 'Tous les projets' },
  { id: 'professionnel', label: 'Professionnel'    },
  { id: 'personnel',     label: 'Personnel'        },
  { id: 'académique',    label: 'Académique'       },
];

/* ─── Component ──────────────────────────────────────────────────────────── */
const Projects: React.FC = () => {
  const [activeFilter,  setActiveFilter]  = useState<Filter>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { projects, loading } = useProjects();

  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const filtered = activeFilter === 'all'
    ? projects
    : projects.filter((p) => p.category === activeFilter);

  return (
    <div className="py-28 px-6">
      <div className="container mx-auto max-w-6xl">

        {/* ── Header ── */}
        <motion.div
          ref={ref}
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-primary dark:text-primary-light mb-3">
            Projets
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
            Projets <span className="text-gradient">sélectionnés</span>
          </h2>
          <p className="text-sm text-dark/55 dark:text-light/45 max-w-2xl mx-auto leading-relaxed">
            Six projets choisis pour illustrer les compétences attendues : cadrage, développement
            et assurance qualité, dans des contextes académique, personnel et professionnel.
          </p>
        </motion.div>

        {/* ── Filter tabs ── */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`relative px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeFilter === f.id
                  ? 'text-white'
                  : 'text-dark/55 dark:text-light/45 hover:text-dark/80 dark:hover:text-light/70 bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/60 hover:bg-dark-card dark:hover:bg-dark-card'
              }`}
            >
              {activeFilter === f.id && (
                <motion.span
                  layoutId="filter-pill"
                  className="absolute inset-0 rounded-xl bg-primary"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{f.label}</span>
            </button>
          ))}
        </motion.div>

        {/* ── Grid ── */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-7 h-7 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1     }}
                exit={{ opacity: 0, scale: 0.92     }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  onOpen={setSelectedProject}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        )}

        {/* ── Note assets ── */}
        <motion.p
          className="text-center text-xs text-dark/30 dark:text-light/25 mt-8"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Les projets Alfred Meeting et Gomuscu seront illustrés dès réception des captures.
        </motion.p>
      </div>

      {/* ── Modal ── */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};

export default Projects;
