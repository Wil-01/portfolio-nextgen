import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetSupabaseMock } from '../test/supabaseMock';
import { projectsData } from '../data/projectData';
import Projects from './Projects';

vi.mock('../lib/supabase', async () => ({
  supabase: (await import('../test/supabaseMock')).supabaseMock,
}));

beforeEach(resetSupabaseMock);

describe('Galerie de projets (intégration page + hook)', () => {
  it('affiche tous les projets après chargement', async () => {
    render(<Projects />);
    for (const p of projectsData) {
      expect(await screen.findByText(p.title)).toBeInTheDocument();
    }
  });

  it('filtre par catégorie', async () => {
    render(<Projects />);
    const pro = projectsData.find((p) => p.category === 'professionnel')!;
    const perso = projectsData.find((p) => p.category === 'personnel')!;
    await screen.findByText(pro.title);
    await userEvent.click(screen.getByRole('button', { name: 'Personnel' }));
    await waitFor(() => expect(screen.queryByText(pro.title)).not.toBeInTheDocument());
    expect(screen.getByText(perso.title)).toBeInTheDocument();
  });
});
