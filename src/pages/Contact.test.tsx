import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import emailjs from '@emailjs/browser';
import Contact from './Contact';

vi.mock('@emailjs/browser', () => ({ default: { sendForm: vi.fn() } }));
const sendForm = vi.mocked(emailjs.sendForm);

const fill = async () => {
  await userEvent.type(screen.getByLabelText(/^nom/i), 'Jury');
  await userEvent.type(screen.getByLabelText(/^email/i), 'jury@exemple.fr');
  await userEvent.type(screen.getByLabelText(/^message/i), 'Bonjour');
};
const submit = () => userEvent.click(screen.getByRole('button', { name: /envoyer/i }));

beforeEach(() => {
  sendForm.mockReset();
});

describe('Formulaire de contact', () => {
  it('n\'envoie rien si les champs obligatoires sont vides', async () => {
    render(<Contact />);
    await submit();
    expect(sendForm).not.toHaveBeenCalled();
  });

  it('confirme l\'envoi et vide le formulaire', async () => {
    sendForm.mockResolvedValue({ status: 200, text: 'OK' });
    render(<Contact />);
    await fill();
    await submit();
    expect(await screen.findByText(/message envoyé avec succès/i)).toBeInTheDocument();
    expect(sendForm).toHaveBeenCalledTimes(1);
    expect(screen.getByLabelText(/^nom/i)).toHaveValue('');
  });

  it('signale l\'échec et conserve la saisie', async () => {
    sendForm.mockImplementation(() => Promise.reject(new Error('réseau')));
    render(<Contact />);
    await fill();
    await submit();
    expect(await screen.findByText(/une erreur est survenue/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^message/i)).toHaveValue('Bonjour');
  });

  it('bloque un double envoi pendant le traitement', async () => {
    sendForm.mockReturnValue(new Promise(() => undefined));
    render(<Contact />);
    await fill();
    await submit();
    expect(screen.getByRole('button', { name: /envoi en cours/i })).toBeDisabled();
  });
});
