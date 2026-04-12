import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DbProject, DbSkillCategory, DbExperience } from '../types/admin';

/* ── map DB → Project type used by portfolio ── */
import { Project } from '../data/projectData';
import { projectsData as staticProjects } from '../data/projectData';

export function dbToProject(p: DbProject): Project {
  return {
    id:          parseInt(p.order_index.toString()) || 0,
    category:    p.category,
    title:       p.title,
    company:     p.company ?? undefined,
    stack:       p.stack,
    description: p.description,
    image:       p.image_url ?? undefined,
    video:       p.video_url ?? undefined,
    githubLink:  p.github_link ?? undefined,
    demoLink:    p.demo_link ?? undefined,
    axes:        p.axes as any,
    gradient:    p.gradient,
    context:     p.context,
    whatIDid:    p.what_i_did,
    learned:     p.learned,
  };
}

/* ── Projects ── */
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>(staticProjects);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    supabase
      .from('projects')
      .select('*')
      .order('order_index')
      .then(({ data, error }) => {
        if (!error && data && data.length > 0) {
          setProjects(data.map(dbToProject));
        }
        setLoading(false);
      });
  }, []);

  return { projects, loading };
}

/* ── Skill categories ── */
export function useSkillCategories() {
  const [cats,    setCats]    = useState<DbSkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('skill_categories')
      .select('*')
      .order('order_index')
      .then(({ data, error }) => {
        if (!error && data) setCats(data);
        setLoading(false);
      });
  }, []);

  return { cats, loading };
}

/* ── Experiences ── */
export function useExperiences() {
  const [entries, setEntries] = useState<DbExperience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('experiences')
      .select('*')
      .order('order_index')
      .then(({ data, error }) => {
        if (!error && data) setEntries(data);
        setLoading(false);
      });
  }, []);

  return { entries, loading };
}
