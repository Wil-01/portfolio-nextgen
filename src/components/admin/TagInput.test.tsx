import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TagInput from './TagInput';

const Harness = ({ initial = [] as string[] }) => {
  const [values, setValues] = useState(initial);
  return (
    <>
      <TagInput values={values} onChange={setValues} placeholder="tag" />
      <output>{values.join('|')}</output>
    </>
  );
};

describe('TagInput', () => {
  it('ajoute un tag nettoyé avec Entrée', async () => {
    render(<Harness />);
    await userEvent.type(screen.getByPlaceholderText('tag'), '  React {Enter}');
    expect(screen.getByRole('status')).toHaveTextContent('React');
  });

  it('valide aussi avec la virgule', async () => {
    render(<Harness />);
    await userEvent.type(screen.getByPlaceholderText('tag'), 'PHP,Laravel,');
    expect(screen.getByRole('status')).toHaveTextContent('PHP|Laravel');
  });

  it('refuse les doublons et les valeurs vides', async () => {
    render(<Harness initial={['PHP']} />);
    await userEvent.type(screen.getByPlaceholderText('tag'), 'PHP{Enter}   {Enter}');
    expect(screen.getByRole('status').textContent).toBe('PHP');
  });

  it('retire le dernier tag avec Retour arrière si le champ est vide', async () => {
    render(<Harness initial={['A', 'B']} />);
    await userEvent.type(screen.getByPlaceholderText('tag'), '{Backspace}');
    expect(screen.getByRole('status').textContent).toBe('A');
  });

  it('retire le tag choisi avec sa croix', async () => {
    render(<Harness initial={['A', 'B']} />);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('status').textContent).toBe('B');
  });
});
