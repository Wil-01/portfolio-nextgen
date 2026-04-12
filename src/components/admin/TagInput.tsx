import React, { useState, KeyboardEvent } from 'react';
import { X } from 'lucide-react';

interface Props {
  values:   string[];
  onChange: (v: string[]) => void;
  placeholder?: string;
}

const TagInput: React.FC<Props> = ({ values, onChange, placeholder = 'Ajouter…' }) => {
  const [input, setInput] = useState('');

  const add = () => {
    const trimmed = input.trim();
    if (trimmed && !values.includes(trimmed)) onChange([...values, trimmed]);
    setInput('');
  };

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ',') { e.preventDefault(); add(); }
    if (e.key === 'Backspace' && !input && values.length) onChange(values.slice(0, -1));
  };

  const remove = (idx: number) => onChange(values.filter((_, i) => i !== idx));

  return (
    <div className="flex flex-wrap gap-1.5 p-2 rounded-xl border border-dark-border dark:border-dark-border border-light-border bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 min-h-[42px]">
      {values.map((v, i) => (
        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary dark:text-primary-light text-xs font-medium">
          {v}
          <button type="button" onClick={() => remove(i)} className="hover:text-red-400"><X size={11} /></button>
        </span>
      ))}
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={onKey}
        onBlur={add}
        placeholder={placeholder}
        className="flex-1 min-w-[80px] bg-transparent text-sm text-dark/85 dark:text-light/85 placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none"
      />
    </div>
  );
};

export default TagInput;
