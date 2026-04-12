import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { DbSkillCategory } from '../../../types/admin';
import TagInput from '../../../components/admin/TagInput';

const labelCls = 'block text-xs font-semibold text-dark/50 dark:text-light/40 mb-1';
const inputCls = 'w-full px-3 py-2 rounded-xl text-sm border border-dark-border dark:border-dark-border border-light-border bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 text-dark/85 dark:text-light/85 placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';

const EMPTY: Omit<DbSkillCategory,'id'|'created_at'> = {
  order_index: 0, label: '', skills: [], badge_cls: '', head_cls: '',
};

const COLOR_PRESETS = [
  { label: 'Indigo',   badge: 'bg-primary/[0.08] text-primary-light border border-primary/[0.18]',     head: 'text-primary-light' },
  { label: 'Bleu',     badge: 'bg-blue-500/[0.08] text-blue-400 border border-blue-500/[0.18]',        head: 'text-blue-400' },
  { label: 'Cyan',     badge: 'bg-cyan-500/[0.08] text-cyan-400 border border-cyan-500/[0.18]',        head: 'text-cyan-400' },
  { label: 'Violet',   badge: 'bg-violet-500/[0.08] text-violet-400 border border-violet-500/[0.18]',  head: 'text-violet-400' },
  { label: 'Ambre',    badge: 'bg-amber-500/[0.08] text-amber-400 border border-amber-500/[0.18]',     head: 'text-amber-400' },
  { label: 'Émeraude', badge: 'bg-emerald-500/[0.08] text-emerald-400 border border-emerald-500/[0.18]', head: 'text-emerald-400' },
  { label: 'Slate',    badge: 'bg-slate-500/[0.08] text-slate-400 border border-slate-500/[0.18]',     head: 'text-slate-400' },
];

const SkillsTab: React.FC = () => {
  const [cats,    setCats]    = useState<DbSkillCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DbSkillCategory> | null>(null);
  const [saving,  setSaving]  = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('skill_categories').select('*').order('order_index');
    setCats(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing || !editing.label) return;
    setSaving(true);
    if (editing.id) await supabase.from('skill_categories').update(editing).eq('id', editing.id);
    else             await supabase.from('skill_categories').insert([editing]);
    setEditing(null);
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return;
    await supabase.from('skill_categories').delete().eq('id', id);
    await load();
  };

  const Form = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-dark-surface dark:bg-dark-surface bg-light-surface border border-dark-border dark:border-dark-border border-light-border shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border dark:border-dark-border border-light-border">
          <h3 className="font-bold text-dark/90 dark:text-light/90">{editing?.id ? 'Modifier' : 'Nouvelle catégorie'}</h3>
          <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg text-dark/45 dark:text-light/35 hover:bg-dark-card dark:hover:bg-dark-card transition-all"><X size={17} /></button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          <div>
            <label className={labelCls}>Nom de la catégorie *</label>
            <input value={editing?.label ?? ''} onChange={e => setEditing(p => ({ ...p, label: e.target.value }))} placeholder="Front-End, Back-End…" className={inputCls} />
          </div>

          <div>
            <label className={labelCls}>Compétences</label>
            <TagInput values={editing?.skills ?? []} onChange={v => setEditing(p => ({ ...p, skills: v }))} placeholder="Ajouter…" />
          </div>

          <div>
            <label className={labelCls}>Couleur</label>
            <div className="grid grid-cols-4 gap-2">
              {COLOR_PRESETS.map(c => (
                <button type="button" key={c.label} onClick={() => setEditing(p => ({ ...p, badge_cls: c.badge, head_cls: c.head }))}
                  className={`px-2 py-1.5 rounded-lg text-xs font-medium border transition-all ${editing?.head_cls === c.head ? 'border-primary ring-1 ring-primary' : 'border-dark-border dark:border-dark-border border-light-border'} ${c.badge}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className={labelCls}>Ordre d'affichage</label>
            <input type="number" value={editing?.order_index ?? 0} onChange={e => setEditing(p => ({ ...p, order_index: +e.target.value }))} className={inputCls} />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-6 py-4 border-t border-dark-border dark:border-dark-border border-light-border">
          <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-xl text-sm font-semibold text-dark/60 dark:text-light/50 border border-dark-border dark:border-dark-border hover:border-primary/40 transition-all">Annuler</button>
          <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark disabled:opacity-50 text-white transition-all flex items-center gap-2">
            {saving ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
            {editing?.id ? 'Enregistrer' : 'Créer'}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark/90 dark:text-light/90">Compétences</h2>
          <p className="text-xs text-dark/45 dark:text-light/35 mt-0.5">{cats.length} catégorie{cats.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : cats.length === 0 ? (
        <p className="text-center py-16 text-dark/40 dark:text-light/35 text-sm">Aucune catégorie.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {cats.map(c => (
            <div key={c.id} className="p-4 rounded-2xl border border-dark-border dark:border-dark-border border-light-border bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70">
              <div className="flex items-start justify-between mb-3">
                <h4 className={`text-sm font-bold ${c.head_cls}`}>{c.label}</h4>
                <div className="flex gap-1">
                  <button onClick={() => setEditing({ ...c })} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-primary dark:hover:text-primary-light hover:bg-primary/[0.08] transition-all"><Pencil size={13} /></button>
                  <button onClick={() => remove(c.id)} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"><Trash2 size={13} /></button>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {c.skills.map(s => <span key={s} className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.badge_cls}`}>{s}</span>)}
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <Form />}
    </div>
  );
};

export default SkillsTab;
