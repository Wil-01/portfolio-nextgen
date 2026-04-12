import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Briefcase, GraduationCap, User } from 'lucide-react';
import { Project } from '../../data/projectData';

/* ─── Config ─────────────────────────────────────────────────────────────── */
const categoryConfig = {
  professionnel: { label: 'Professionnel', icon: <Briefcase size={13} />,    cls: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/[0.2]' },
  personnel:     { label: 'Personnel',     icon: <User size={13} />,          cls: 'bg-violet-500/10 text-violet-400 border border-violet-500/[0.2]' },
  académique:    { label: 'Académique',    icon: <GraduationCap size={13} />, cls: 'bg-amber-500/10  text-amber-400  border border-amber-500/[0.2]'  },
} as const;

const axesConfig = {
  cadrage:       { label: 'Cadrage',       cls: 'bg-blue-500/[0.08]    text-blue-400    border border-blue-500/[0.15]'    },
  développement: { label: 'Développement', cls: 'bg-primary/[0.08]     text-primary-light border border-primary/[0.15]'   },
  qualité:       { label: 'Qualité',       cls: 'bg-emerald-500/[0.08] text-emerald-400  border border-emerald-500/[0.15]' },
} as const;

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface ProjectModalProps {
  project:  Project | null;
  onClose:  () => void;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  /* Close on ESC */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  /* Lock scroll when open */
  useEffect(() => {
    if (project) document.body.style.overflow = 'hidden';
    else         document.body.style.overflow = '';
    return ()  => { document.body.style.overflow = ''; };
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-50 bg-dark/75 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* ── Panel
                Mobile  : bottom-sheet — slides up from bottom, full width, top corners rounded
                Desktop : centred popup — max-w-2xl, all corners rounded
          ── */}
          <motion.div
            className="fixed inset-x-0 bottom-0 sm:inset-0 z-50 flex sm:items-center sm:justify-center sm:p-6 pointer-events-none"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0,      opacity: 1 }}
            exit={{    y: '60%',  opacity: 0 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="relative w-full sm:max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto
                         rounded-t-3xl sm:rounded-2xl
                         bg-dark-surface dark:bg-dark-surface bg-light-surface
                         border border-dark-border dark:border-dark-border border-light-border
                         shadow-2xl pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >

              {/* ── Sticky header band (drag handle on mobile + close button always) ── */}
              <div className="sticky top-0 z-10 flex items-center px-4 py-3
                              bg-dark-surface/95 dark:bg-dark-surface/95 bg-light-surface/95
                              backdrop-blur-sm
                              border-b border-dark-border/30 dark:border-dark-border/30 border-light-border/40">
                {/* Drag handle pill — mobile only */}
                <div className="sm:hidden absolute left-1/2 -translate-x-1/2 w-10 h-[3px] rounded-full
                                bg-dark-border dark:bg-dark-border bg-black/15" />
                {/* Spacer */}
                <div className="flex-1" />
                {/* Close */}
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  className="p-1.5 rounded-lg text-dark/45 dark:text-light/35
                             hover:text-dark/90 dark:hover:text-light/90
                             hover:bg-dark-card dark:hover:bg-dark-card bg-light-card
                             transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* ── Media ── */}
              <div className="relative aspect-[16/7] sm:aspect-video w-full overflow-hidden">
                {project.image ? (
                  <>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                    {project.video && (
                      <video
                        src={project.video}
                        className="absolute inset-0 w-full h-full object-cover"
                        autoPlay loop muted playsInline
                      />
                    )}
                  </>
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: project.gradient }}
                  >
                    <span className="text-xl sm:text-4xl font-black text-white/10 tracking-tight text-center px-6">
                      {project.title.split(' — ')[0]}
                    </span>
                  </div>
                )}
              </div>

              {/* ── Content ── */}
              <div className="p-5 sm:p-8">

                {/* Header badges */}
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full ${categoryConfig[project.category].cls}`}>
                    {categoryConfig[project.category].icon}
                    {categoryConfig[project.category].label}
                  </span>
                  {project.company && (
                    <span className="text-xs text-dark/45 dark:text-light/35 font-medium">
                      {project.company}
                    </span>
                  )}
                  {project.axes.map((axe) => (
                    <span key={axe} className={`text-xs px-2 py-0.5 rounded-full font-medium ${axesConfig[axe].cls}`}>
                      {axesConfig[axe].label}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-xl sm:text-3xl font-black text-dark/90 dark:text-light/90 mb-3 leading-tight">
                  {project.title}
                </h2>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs px-2.5 py-1 rounded-full
                                 bg-dark-card dark:bg-dark-card bg-light-card
                                 text-dark/55 dark:text-light/45
                                 border border-dark-border dark:border-dark-border border-light-border
                                 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <hr className="border-dark-border dark:border-dark-border border-light-border mb-5" />

                {/* Context */}
                <div className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                    Contexte
                  </h4>
                  <p className="text-sm text-dark/65 dark:text-light/55 leading-relaxed">
                    {project.context}
                  </p>
                </div>

                {/* What I did */}
                <div className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                    Ce que j&rsquo;ai fait
                  </h4>
                  <ul className="flex flex-col gap-2">
                    {project.whatIDid.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-dark/65 dark:text-light/55">
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-light shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Compétences démontrées */}
                <div className="mb-5">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                    Compétences démontrées
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.axes.map((axe) => (
                      <span key={axe} className={`text-xs px-3 py-1 rounded-full font-semibold ${axesConfig[axe].cls}`}>
                        {axesConfig[axe].label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Ce que j'ai appris */}
                <div className="mb-6 p-4 rounded-xl bg-primary/[0.06] border border-primary/[0.12]">
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary dark:text-primary-light mb-2">
                    Ce que j&rsquo;ai appris
                  </h4>
                  <p className="text-sm text-dark/65 dark:text-light/55 leading-relaxed italic">
                    &ldquo;{project.learned}&rdquo;
                  </p>
                </div>

                {/* Links */}
                <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                 bg-dark-card dark:bg-dark-card bg-light-card
                                 text-dark/70 dark:text-light/60
                                 border border-dark-border dark:border-dark-border border-light-border
                                 text-sm font-semibold
                                 hover:border-primary/40 hover:text-primary dark:hover:text-primary-light
                                 transition-all duration-200"
                    >
                      <Github size={15} />
                      GitHub
                    </a>
                  )}
                  {project.demoLink && (
                    <a
                      href={project.demoLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl
                                 bg-primary hover:bg-primary-dark text-white
                                 text-sm font-semibold
                                 transition-all duration-200"
                    >
                      <ExternalLink size={15} />
                      Voir la démo
                    </a>
                  )}
                </div>

                {/* Safe-area bottom padding (mobile notch) */}
                <div className="h-4 sm:h-0" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
