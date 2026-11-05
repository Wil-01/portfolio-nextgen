import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { resetSupabaseMock, tableResults } from '../test/supabaseMock';
import { DbProject } from '../types/admin';
import { projectsData } from '../data/projectData';
import { dbToProject, useExperiences, useProjects, useSkillCategories } from './usePortfolioData';

vi.mock('../lib/supabase', async () => ({
  supabase: (await import('../test/supabaseMock')).supabaseMock,
}));

const row = (over: Partial<DbProject> = {}): DbProject => ({
  id: 'uuid-1', order_index: 3, category: 'personnel', title: 'Projet', company: null,
  stack: ['React'], description: 'desc', image_url: null, video_url: null,
  github_link: null, demo_link: null, axes: ['qualité'], gradient: 'g',
  context: 'ctx', what_i_did: ['fait'], learned: 'appris',
  created_at: '', updated_at: '', ...over,
});

beforeEach(resetSupabaseMock);

describe('dbToProject', () => {
  it('convertit les colonnes snake_case vers le modèle du front', () => {
    const p = dbToProject(row({ image_url: 'i', github_link: 'g', what_i_did: ['x'] }));
    expect(p).toMatchObject({ id: 3, image: 'i', githubLink: 'g', whatIDid: ['x'] });
  });

  it('transforme les valeurs null en undefined', () => {
    const p = dbToProject(row());
    expect(p.company).toBeUndefined();
    expect(p.video).toBeUndefined();
    expect(p.demoLink).toBeUndefined();
  });

  // ANOMALIE CONNUE A-02 : order_index sert d'identifiant et vaut 0 par défaut.
  // it.fails passera au rouge dès que l'anomalie sera corrigée : retirer alors le ".fails".
  it.fails('donne un identifiant distinct à deux projets de même ordre', () => {
    const a = dbToProject(row({ id: 'uuid-a', order_index: 0 }));
    const b = dbToProject(row({ id: 'uuid-b', order_index: 0 }));
    expect(a.id).not.toBe(b.id);
  });
});

describe('useProjects', () => {
  it('affiche les données statiques tant que Supabase ne répond pas', () => {
    const { result } = renderHook(() => useProjects());
    expect(result.current.projects).toEqual(projectsData);
    expect(result.current.loading).toBe(true);
  });

  it('remplace le statique par les données de la base', async () => {
    tableResults.projects = { data: [row({ title: 'Depuis la base' })], error: null };
    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.projects.map((p) => p.title)).toEqual(['Depuis la base']);
  });

  it('conserve le statique si la base renvoie une erreur', async () => {
    tableResults.projects = { data: null, error: { message: 'down' } };
    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.projects).toEqual(projectsData);
  });

  it('conserve le statique si la table est vide', async () => {
    const { result } = renderHook(() => useProjects());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.projects).toEqual(projectsData);
  });
});

describe('useSkillCategories / useExperiences', () => {
  it('renvoie les lignes de la base', async () => {
    tableResults.skill_categories = { data: [{ id: 's' }], error: null };
    tableResults.experiences = { data: [{ id: 'e' }], error: null };
    const skills = renderHook(() => useSkillCategories());
    const exp = renderHook(() => useExperiences());
    await waitFor(() => expect(skills.result.current.loading).toBe(false));
    await waitFor(() => expect(exp.result.current.loading).toBe(false));
    expect(skills.result.current.cats).toEqual([{ id: 's' }]);
    expect(exp.result.current.entries).toEqual([{ id: 'e' }]);
  });

  it('renvoie une liste vide en cas d\'erreur', async () => {
    tableResults.experiences = { data: null, error: { message: 'down' } };
    const { result } = renderHook(() => useExperiences());
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.entries).toEqual([]);
  });
});
