import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Briefcase, GraduationCap } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { DbExperience } from '../../../types/admin';
import TagInput  from '../../../components/admin/TagInput';
import ListInput from '../../../components/admin/ListInput';

const labelCls = 'block text-xs font-semibold text-dark/50 dark:text-light/40 mb-1';
const inputCls = 'w-full px-3 py-2 rounded-xl text-sm border border-dark-border dark:border-dark-border border-light-border bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 text-dark/85 dark:text-light/85 placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';

const EMPTY: Omit<DbExperience,'id'|'created_at'> = {
  order_index: 0, type: 'experience', period: '', is_current: false,
  title: '', organization: '', location: null, points: [], tags: [],
};

const ParcoursTab: React.FC = () => {
  const [entries, setEntries] = useState<DbExperience[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<DbExperience> | null>(null);
  const [saving,  setSaving]  = useState(false);
  const [filter,  setFilter]  = useState<'all' | 'experience' | 'education'>('all');

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('experiences').select('*').order('order_index');
    setEntries(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const save = async () => {
    if (!editing || !editing.title) return;
    setSaving(true);
    if (editing.id) await supabase.from('experiences').update(editing).eq('id', editing.id);
    else             await supabase.from('experiences').insert([editing]);
    setEditing(null);
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer cet élément ?')) return;
    await supabase.from('experiences').delete().eq('id', id);
    await load();
  };

  const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);

  const Form = () => (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-12 overflow-y-auto bg-dark/60 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-dark-surface dark:bg-dark-surface bg-light-surface border border-dark-border dark:border-dark-border border-light-border shadow-2xl mb-8">
        <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border dark:border-dark-border border-light-border">
          <h3 className="font-bold text-dark/90 dark:text-light/90">{editing?.id ? 'Modifier' : 'Ajouter'}</h3>
          <button onClick={() => setEditing(null)} className="p-1.5 rounded-lg text-dark/45 dark:text-light/35 hover:bg-dark-card dark:hover:bg-dark-card transition-all"><X size={17} /></button>
        </div>

        <div className="p-6 flex flex-col gap-4">
          {/* Type */}
          <div className="flex gap-3">
            {(['experience','education'] as const).map(t => (
              <button type="button" key={t} onClick={() => setEditing(p => ({ ...p, type: t }))}
                className={`flex-1 py-2 rounded-xl text-xs font-semibold border transition-all ${editing?.type === t ? 'bg-primary text-white border-primary' : 'text-dark/55 dark:text-light/45 border-dark-border dark:border-dark-border bg-dark-card/40 dark:bg-dark-card/40'}`}>
                {t === 'experience' ? '💼 Expérience' : '🎓 Formation'}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Titre *</label>
              <input value={editing?.title ?? ''} onChange={e => setEditing(p => ({ ...p, title: e.target.value }))} placeholder="Développeur Full Stack…" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Organisation *</label>
              <input value={editing?.organization ?? ''} onChange={e => setEditing(p => ({ ...p, organization: e.target.value }))} placeholder="Alfred Meeting…" className={inputCls} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Période</label>
              <input value={editing?.period ?? ''} onChange={e => setEditing(p => ({ ...p, period: e.target.value }))} placeholder="Sept. 2025 → Aujourd'hui" className={inputCls} />
            </div>
            <div>
              <label className={labelCls}>Lieu</label>
              <input value={editing?.location ?? ''} onChange={e => setEditing(p => ({ ...p, location: e.target.value || null }))} placeholder="Paris…" className={inputCls} />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" id="is_current" checked={editing?.is_current ?? false} onChange={e => setEditing(p => ({ ...p, is_current: e.target.checked }))} className="accent-primary w-4 h-4" />
            <label htmlFor="is_current" className="text-sm text-dark/70 dark:text-light/60">En cours</label>
          </div>

          <div>
            <label className={labelCls}>Points clés</label>
            <ListInput values={editing?.points ?? []} onChange={v => setEditing(p => ({ ...p, points: v }))} placeholder="Point" />
          </div>

          <div>
            <label className={labelCls}>Technologies</label>
            <TagInput values={editing?.tags ?? []} onChange={v => setEditing(p => ({ ...p, tags: v }))} placeholder="Laravel, PHP…" />
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
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark/90 dark:text-light/90">Parcours</h2>
          <p className="text-xs text-dark/45 dark:text-light/35 mt-0.5">{entries.length} entrée{entries.length > 1 ? 's' : ''}</p>
        </div>
        <div className="flex gap-2">
          {(['all','experience','education'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${filter === f ? 'bg-primary text-white border-primary' : 'text-dark/55 dark:text-light/45 border-dark-border dark:border-dark-border'}`}>
              {f === 'all' ? 'Tout' : f === 'experience' ? '💼 Expériences' : '🎓 Formations'}
            </button>
          ))}
        </div>
        <button onClick={() => setEditing({ ...EMPTY })} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : filtered.length === 0 ? (
        <p className="text-center py-16 text-dark/40 dark:text-light/35 text-sm">Aucune entrée.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map(e => (
            <div key={e.id} className={`flex items-start gap-4 p-4 rounded-2xl border ${e.type === 'experience' ? 'border-primary/20 bg-primary/[0.03]' : 'border-accent/20 bg-accent/[0.03]'} dark:bg-dark-card/40 bg-light-card/70`}>
              <div className={`p-2 rounded-lg shrink-0 ${e.type === 'experience' ? 'bg-primary/10 text-primary dark:text-primary-light' : 'bg-accent/10 text-accent dark:text-accent-light'}`}>
                {e.type === 'experience' ? <Briefcase size={15} /> : <GraduationCap size={15} />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-sm font-semibold text-dark/90 dark:text-light/90">{e.title}</p>
                  {e.is_current && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">En cours</span>}
                </div>
                <p className="text-xs text-primary dark:text-primary-light font-medium">{e.organization}</p>
                <p className="text-xs text-dark/40 dark:text-light/35">{e.period}{e.location ? ` · ${e.location}` : ''}</p>
              </div>
              <div className="flex gap-1 shrink-0">
                <button onClick={() => setEditing({ ...e })} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-primary dark:hover:text-primary-light hover:bg-primary/[0.08] transition-all"><Pencil size={13} /></button>
                <button onClick={() => remove(e.id)} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"><Trash2 size={13} /></button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && <Form />}
    </div>
  );
};

export default ParcoursTab;
