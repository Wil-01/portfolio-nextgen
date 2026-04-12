import React from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  values:   string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}

const ListInput: React.FC<Props> = ({ values, onChange, placeholder = 'Élément…' }) => {
  const update = (idx: number, val: string) => {
    const next = [...values];
    next[idx] = val;
    onChange(next);
  };

  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  const add = () => onChange([...values, '']);

  return (
    <div className="flex flex-col gap-2">
      {values.map((v, i) => (
        <div key={i} className="flex gap-2 items-center">
          <input
            value={v}
            onChange={e => update(i, e.target.value)}
            placeholder={`${placeholder} ${i + 1}`}
            className="flex-1 px-3 py-2 rounded-xl text-sm border border-dark-border dark:border-dark-border border-light-border bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 text-dark/85 dark:text-light/85 placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <button type="button" onClick={() => remove(i)} className="p-1.5 text-dark/40 dark:text-light/35 hover:text-red-400 transition-colors">
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={add}
        className="flex items-center gap-1.5 text-xs text-primary dark:text-primary-light hover:text-primary-dark font-medium self-start"
      >
        <Plus size={13} /> Ajouter une ligne
      </button>
    </div>
  );
};

export default ListInput;
