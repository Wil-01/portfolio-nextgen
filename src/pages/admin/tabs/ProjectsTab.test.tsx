import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { resetSupabaseMock, tableResults, writes } from '../../../test/supabaseMock';
import ProjectsTab from './ProjectsTab';

vi.mock('../../../lib/supabase', async () => ({
  supabase: (await import('../../../test/supabaseMock')).supabaseMock,
}));

const existing = {
  id: 'uuid-1', order_index: 1, category: 'personnel', title: 'Gomuscu', company: null,
  stack: ['React'], description: '', image_url: null, video_url: null, github_link: null,
  demo_link: null, axes: [], gradient: '', context: '', what_i_did: [], learned: '',
  created_at: '', updated_at: '',
};

beforeEach(resetSupabaseMock);

describe('Administration des projets (intégration onglet + base)', () => {
  it('liste les projets existants', async () => {
    tableResults.projects = { data: [existing], error: null };
    render(<ProjectsTab />);
    expect(await screen.findByText('Gomuscu')).toBeInTheDocument();
    expect(screen.getByText('1 projet')).toBeInTheDocument();
  });

  it('indique quand la liste est vide', async () => {
    render(<ProjectsTab />);
    expect(await screen.findByText(/aucun projet/i)).toBeInTheDocument();
  });

  it('refuse de créer un projet sans titre', async () => {
    render(<ProjectsTab />);
    await userEvent.click(await screen.findByRole('button', { name: /ajouter/i }));
    await userEvent.click(screen.getByRole('button', { name: 'Créer' }));
    expect(writes.insert).not.toHaveBeenCalled();
  });

  it('supprime après confirmation seulement', async () => {
    tableResults.projects = { data: [existing], error: null };
    const confirm = vi.fn(() => false);
    vi.stubGlobal('confirm', confirm);
    render(<ProjectsTab />);
    await screen.findByText('Gomuscu');
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[buttons.length - 1]);
    expect(confirm).toHaveBeenCalled();
    expect(writes.remove).not.toHaveBeenCalled();
    confirm.mockReturnValue(true);
    await userEvent.click(screen.getAllByRole('button').at(-1)!);
    await waitFor(() => expect(writes.remove).toHaveBeenCalled());
  });

  // ANOMALIE CONNUE A-01 : <Form> est déclaré dans le composant, donc recréé à chaque frappe.
  // it.fails passera au rouge dès que l'anomalie sera corrigée : retirer alors le ".fails".
  it.fails('garde le focus dans le champ Titre pendant la saisie', async () => {
    render(<ProjectsTab />);
    await userEvent.click(await screen.findByRole('button', { name: /ajouter/i }));
    await userEvent.type(screen.getByPlaceholderText('Nom du projet'), 'Portfolio');
    expect(screen.getByPlaceholderText('Nom du projet')).toHaveValue('Portfolio');
  });
});
