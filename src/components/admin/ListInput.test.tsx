import { useState } from 'react';
import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ListInput from './ListInput';

const Harness = ({ initial = [] as string[] }) => {
  const [values, setValues] = useState(initial);
  return (
    <>
      <ListInput values={values} onChange={setValues} placeholder="Action" />
      <output>{JSON.stringify(values)}</output>
    </>
  );
};

describe('ListInput', () => {
  it('ajoute une ligne vide numérotée', async () => {
    render(<Harness />);
    await userEvent.click(screen.getByRole('button', { name: /ajouter une ligne/i }));
    expect(screen.getByPlaceholderText('Action 1')).toBeInTheDocument();
    expect(screen.getByRole('status').textContent).toBe('[""]');
  });

  it('modifie uniquement la ligne éditée', async () => {
    render(<Harness initial={['a', 'b']} />);
    await userEvent.type(screen.getByPlaceholderText('Action 2'), 'c');
    expect(screen.getByRole('status').textContent).toBe('["a","bc"]');
  });

  it('supprime la ligne demandée', async () => {
    render(<Harness initial={['a', 'b']} />);
    await userEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByRole('status').textContent).toBe('["b"]');
  });
});
