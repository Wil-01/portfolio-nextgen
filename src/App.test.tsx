import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { auth, resetSupabaseMock } from './test/supabaseMock';
import App from './App';

vi.mock('./lib/supabase', async () => ({
  supabase: (await import('./test/supabaseMock')).supabaseMock,
}));
/* Lenis et le calendrier GitHub ne concernent pas ces parcours */
vi.mock('lenis', () => ({ default: class { raf() {} destroy() {} } }));
vi.mock('./components/About/GithubCalendar', () => ({ default: () => null }));

const goTo = (path: string) => window.history.pushState({}, '', path);
const session = { user: { id: 'u1', email: 'admin@exemple.fr' } };

beforeEach(() => {
  resetSupabaseMock();
  goTo('/');
});

describe('Parcours applicatifs (intégration routes + auth)', () => {
  it('sert la page publique sans authentification', async () => {
    render(<App />);
    expect(await screen.findByRole('navigation')).toBeInTheDocument();
    expect(document.getElementById('projets')).toBeInTheDocument();
    expect(document.getElementById('contact')).toBeInTheDocument();
  });

  it('redirige un visiteur anonyme du tableau de bord vers la connexion', async () => {
    goTo('/admin/dashboard');
    render(<App />);
    expect(await screen.findByRole('heading', { name: 'Connexion' })).toBeInTheDocument();
    expect(window.location.pathname).toBe('/admin');
  });

  it('ouvre le tableau de bord à un administrateur connecté', async () => {
    auth.getSession.mockImplementation(async () => ({ data: { session } }));
    goTo('/admin/dashboard');
    render(<App />);
    expect(await screen.findByText('admin@exemple.fr')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /déconnexion/i })).toBeInTheDocument();
  });

  it('affiche une erreur générique si les identifiants sont refusés', async () => {
    auth.signInWithPassword.mockImplementation(async () => ({
      error: { message: 'Invalid login credentials' },
    }));
    goTo('/admin');
    render(<App />);
    await userEvent.type(await screen.findByPlaceholderText('Email'), 'a@b.fr');
    await userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'faux');
    await userEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    expect(await screen.findByText('Email ou mot de passe incorrect.')).toBeInTheDocument();
    expect(window.location.pathname).toBe('/admin');
  });

  it('conduit au tableau de bord après une connexion réussie', async () => {
    /* Comme le vrai client : la connexion émet l'événement d'état avant de répondre */
    let emit: (event: string, s: unknown) => void = () => undefined;
    auth.onAuthStateChange.mockImplementation(((cb: typeof emit) => {
      emit = cb;
      return { data: { subscription: { unsubscribe: () => undefined } } };
    }) as never);
    auth.signInWithPassword.mockImplementation(async () => {
      emit('SIGNED_IN', session);
      return { error: null };
    });
    goTo('/admin');
    render(<App />);
    await userEvent.type(await screen.findByPlaceholderText('Email'), 'a@b.fr');
    await userEvent.type(screen.getByPlaceholderText('Mot de passe'), 'bon');
    await userEvent.click(screen.getByRole('button', { name: /se connecter/i }));
    await waitFor(() => expect(window.location.pathname).toBe('/admin/dashboard'));
  });

  it('revient à la connexion après déconnexion', async () => {
    auth.getSession.mockImplementation(async () => ({ data: { session } }));
    goTo('/admin/dashboard');
    render(<App />);
    await userEvent.click(await screen.findByRole('button', { name: /déconnexion/i }));
    expect(auth.signOut).toHaveBeenCalled();
    await waitFor(() => expect(window.location.pathname).toBe('/admin'));
  });
});
