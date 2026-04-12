import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink, ArrowRight } from 'lucide-react';
import { Project } from '../../data/projectData';

/* ─── Config maps ────────────────────────────────────────────────────────── */
const categoryConfig = {
  professionnel: { label: 'Pro',       cls: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/[0.2]' },
  personnel:     { label: 'Perso',     cls: 'bg-violet-500/10 text-violet-400 border border-violet-500/[0.2]' },
  académique:    { label: 'Académique',cls: 'bg-amber-500/10  text-amber-400  border border-amber-500/[0.2]'  },
} as const;

const axesConfig = {
  cadrage:        { label: 'Cadrage',       cls: 'bg-blue-500/[0.08]    text-blue-400    border border-blue-500/[0.15]'    },
  développement:  { label: 'Développement', cls: 'bg-primary/[0.08]     text-primary-light border border-primary/[0.15]'  },
  qualité:        { label: 'Qualité',       cls: 'bg-emerald-500/[0.08] text-emerald-400  border border-emerald-500/[0.15]' },
} as const;

/* ─── Props ──────────────────────────────────────────────────────────────── */
interface ProjectCardProps {
  project:  Project;
  onOpen:   (p: Project) => void;
}

/* ─── Component ──────────────────────────────────────────────────────────── */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpen }) => {
  const [hovering, setHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setHovering(true);
    videoRef.current?.play().catch(() => {});
  };
  const handleMouseLeave = () => {
    setHovering(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const catCfg  = categoryConfig[project.category];
  const hasMedia = !!project.image;

  return (
    <motion.article
      layout
      className="group relative flex flex-col rounded-2xl border border-dark-border dark:border-dark-border border-light-border bg-dark-card/50 dark:bg-dark-card/50 bg-light-card/70 overflow-hidden cursor-pointer transition-all duration-300 hover:border-primary/[0.3] hover:shadow-xl hover:shadow-primary/[0.07]"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Media area ── */}
      <div
        className="relative aspect-video overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => onOpen(project)}
      >
        {hasMedia ? (
          <>
            {/* Static image */}
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                hovering && project.video ? 'opacity-0' : 'opacity-100'
              }`}
            />
            {/* Video (hover) */}
            {project.video && (
              <video
                ref={videoRef}
                src={project.video}
                loop
                muted
                playsInline
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-400 ${
                  hovering ? 'opacity-100' : 'opacity-0'
                }`}
              />
            )}
          </>
        ) : (
          /* Gradient placeholder */
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-3"
            style={{ background: project.gradient }}
          >
            {project.company && (
              <span className="text-xs font-bold uppercase tracking-widest text-white/50">
                {project.company}
              </span>
            )}
            <span className="text-4xl font-black text-white/15 tracking-tight text-center px-4">
              {project.title.split(' — ')[0]}
            </span>
            <span className="text-xs text-white/40 font-medium">Assets à venir</span>
          </div>
        )}

        {/* Overlay on hover */}
        <div className={`absolute inset-0 bg-dark/60 flex items-center justify-center transition-opacity duration-300 ${hovering ? 'opacity-100' : 'opacity-0'}`}>
          <span className="text-white text-sm font-semibold flex items-center gap-2">
            Voir l&rsquo;étude de cas <ArrowRight size={15} />
          </span>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-col flex-grow p-5 gap-4">
        {/* Category + axes */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${catCfg.cls}`}>
            {catCfg.label}
          </span>
          {project.company && (
            <span className="text-[10px] text-dark/40 dark:text-light/35 font-medium">
              {project.company}
            </span>
          )}
          <div className="ml-auto flex gap-1">
            {project.axes.map((axe) => (
              <span key={axe} className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${axesConfig[axe].cls}`}>
                {axesConfig[axe].label}
              </span>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <h3 className="text-base font-bold text-dark/90 dark:text-light/90 leading-snug mb-1.5 group-hover:text-primary dark:group-hover:text-primary-light transition-colors duration-200">
            {project.title}
          </h3>
          <p className="text-xs text-dark/55 dark:text-light/45 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-0.5 rounded-full bg-dark-surface/70 dark:bg-dark-surface/70 bg-light/70 text-dark/50 dark:text-light/40 border border-dark-border dark:border-dark-border border-light-border font-medium"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer actions */}
        <div className="flex items-center gap-2 mt-auto pt-2 border-t border-dark-border/50 dark:border-dark-border/50 border-light-border/50">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="GitHub"
              className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-dark/80 dark:hover:text-light/70 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
            >
              <Github size={15} />
            </a>
          )}
          {project.demoLink && (
            <a
              href={project.demoLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              aria-label="Démo"
              className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-dark/80 dark:hover:text-light/70 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all duration-200"
            >
              <ExternalLink size={15} />
            </a>
          )}
          <button
            onClick={() => onOpen(project)}
            className="ml-auto text-xs font-semibold text-primary dark:text-primary-light hover:text-primary-dark dark:hover:text-white flex items-center gap-1 transition-colors duration-200"
          >
            Étude de cas
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.article>
  );
};

export default ProjectCard;
