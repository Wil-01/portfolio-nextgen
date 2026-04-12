import React, { useEffect, useState, useCallback } from 'react';
import { Plus, Pencil, Trash2, X, Upload, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../../../lib/supabase';
import { DbProject } from '../../../types/admin';
import TagInput  from '../../../components/admin/TagInput';
import ListInput from '../../../components/admin/ListInput';

/* ─── helpers ─── */
const EMPTY: Omit<DbProject,'id'|'created_at'|'updated_at'> = {
  order_index: 0, category: 'académique', title: '', company: null,
  stack: [], description: '', image_url: null, video_url: null,
  github_link: null, demo_link: null,
  axes: [], gradient: 'linear-gradient(135deg,#6366f1 0%,#4338ca 100%)',
  context: '', what_i_did: [], learned: '',
};

const labelCls = 'block text-xs font-semibold text-dark/50 dark:text-light/40 mb-1';
const inputCls = 'w-full px-3 py-2 rounded-xl text-sm border border-dark-border dark:border-dark-border border-light-border bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 text-dark/85 dark:text-light/85 placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all';

const CATEGORIES = ['professionnel','personnel','académique'] as const;
const AXES       = ['cadrage','développement','qualité'] as const;

/* ─── upload helper ─── */
async function uploadFile(file: File, folder: string): Promise<string | null> {
  const ext  = file.name.split('.').pop();
  const path = `${folder}/${Date.now()}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true });
  if (error) { console.error(error); return null; }
  const { data } = supabase.storage.from('media').getPublicUrl(path);
  return data.publicUrl;
}

/* ─── Component ─── */
const ProjectsTab: React.FC = () => {
  const [projects, setProjects] = useState<DbProject[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [editing,  setEditing]  = useState<Partial<DbProject> | null>(null);
  const [saving,   setSaving]   = useState(false);
  const [imgFile,  setImgFile]  = useState<File | null>(null);
  const [vidFile,  setVidFile]  = useState<File | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from('projects').select('*').order('order_index');
    setProjects(data ?? []);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  const startAdd  = () => setEditing({ ...EMPTY });
  const startEdit = (p: DbProject) => { setEditing({ ...p }); setImgFile(null); setVidFile(null); };
  const cancel    = () => { setEditing(null); setImgFile(null); setVidFile(null); };

  const toggleAxe = (axe: typeof AXES[number]) => {
    if (!editing) return;
    const axes = editing.axes ?? [];
    setEditing({ ...editing, axes: axes.includes(axe) ? axes.filter(a => a !== axe) : [...axes, axe] });
  };

  const save = async () => {
    if (!editing || !editing.title) return;
    setSaving(true);

    let imgUrl = editing.image_url ?? null;
    let vidUrl = editing.video_url ?? null;
    if (imgFile) { const u = await uploadFile(imgFile, 'images'); if (u) imgUrl = u; }
    if (vidFile) { const u = await uploadFile(vidFile, 'videos'); if (u) vidUrl = u; }

    const payload = { ...editing, image_url: imgUrl, video_url: vidUrl, updated_at: new Date().toISOString() };

    if (editing.id) {
      await supabase.from('projects').update(payload).eq('id', editing.id);
    } else {
      await supabase.from('projects').insert([payload]);
    }
    cancel();
    await load();
    setSaving(false);
  };

  const remove = async (id: string) => {
    if (!confirm('Supprimer ce projet ?')) return;
    await supabase.from('projects').delete().eq('id', id);
    await load();
  };

  /* ── Form ── */
  const Form = () => {
    if (!editing) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto bg-dark/60 backdrop-blur-sm">
        <div className="w-full max-w-2xl rounded-2xl bg-dark-surface dark:bg-dark-surface bg-light-surface border border-dark-border dark:border-dark-border border-light-border shadow-2xl" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border dark:border-dark-border border-light-border">
            <h3 className="font-bold text-dark/90 dark:text-light/90">{editing.id ? 'Modifier le projet' : 'Nouveau projet'}</h3>
            <button onClick={cancel} className="p-1.5 rounded-lg text-dark/45 dark:text-light/35 hover:bg-dark-card dark:hover:bg-dark-card transition-all"><X size={17} /></button>
          </div>

          <div className="p-6 flex flex-col gap-5">
            {/* Row: category + title */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className={labelCls}>Catégorie</label>
                <select value={editing.category} onChange={e => setEditing({ ...editing, category: e.target.value as any })} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Titre *</label>
                <input value={editing.title ?? ''} onChange={e => setEditing({ ...editing, title: e.target.value })} placeholder="Nom du projet" className={inputCls} />
              </div>
            </div>

            {/* Company */}
            <div>
              <label className={labelCls}>Entreprise (optionnel)</label>
              <input value={editing.company ?? ''} onChange={e => setEditing({ ...editing, company: e.target.value || null })} placeholder="Alfred Meeting…" className={inputCls} />
            </div>

            {/* Stack */}
            <div>
              <label className={labelCls}>Stack (Entrée ou virgule pour valider)</label>
              <TagInput values={editing.stack ?? []} onChange={v => setEditing({ ...editing, stack: v })} placeholder="React, Laravel…" />
            </div>

            {/* Description */}
            <div>
              <label className={labelCls}>Description courte</label>
              <textarea rows={2} value={editing.description ?? ''} onChange={e => setEditing({ ...editing, description: e.target.value })} placeholder="Description affichée sur la card…" className={`${inputCls} resize-none`} />
            </div>

            {/* Axes */}
            <div>
              <label className={labelCls}>Axes de compétences</label>
              <div className="flex flex-wrap gap-2">
                {AXES.map(axe => (
                  <button type="button" key={axe} onClick={() => toggleAxe(axe)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${(editing.axes ?? []).includes(axe) ? 'bg-primary text-white border-primary' : 'text-dark/55 dark:text-light/45 border-dark-border dark:border-dark-border bg-dark-card/40 dark:bg-dark-card/40'}`}>
                    {axe}
                  </button>
                ))}
              </div>
            </div>

            {/* Image + Video */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Image (URL ou fichier)</label>
                <input value={editing.image_url ?? ''} onChange={e => setEditing({ ...editing, image_url: e.target.value || null })} placeholder="https://…" className={`${inputCls} mb-2`} />
                <label className="flex items-center gap-2 cursor-pointer text-xs text-primary dark:text-primary-light hover:text-primary-dark">
                  <Upload size={13} />
                  <span>Uploader un fichier</span>
                  <input type="file" accept="image/*" className="hidden" onChange={e => setImgFile(e.target.files?.[0] ?? null)} />
                </label>
                {imgFile && <p className="text-[10px] text-emerald-400 mt-1">{imgFile.name}</p>}
              </div>
              <div>
                <label className={labelCls}>Vidéo (URL ou fichier)</label>
                <input value={editing.video_url ?? ''} onChange={e => setEditing({ ...editing, video_url: e.target.value || null })} placeholder="https://…" className={`${inputCls} mb-2`} />
                <label className="flex items-center gap-2 cursor-pointer text-xs text-primary dark:text-primary-light hover:text-primary-dark">
                  <Upload size={13} />
                  <span>Uploader un fichier</span>
                  <input type="file" accept="video/*" className="hidden" onChange={e => setVidFile(e.target.files?.[0] ?? null)} />
                </label>
                {vidFile && <p className="text-[10px] text-emerald-400 mt-1">{vidFile.name}</p>}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>GitHub</label>
                <input value={editing.github_link ?? ''} onChange={e => setEditing({ ...editing, github_link: e.target.value || null })} placeholder="https://github.com/…" className={inputCls} />
              </div>
              <div>
                <label className={labelCls}>Démo</label>
                <input value={editing.demo_link ?? ''} onChange={e => setEditing({ ...editing, demo_link: e.target.value || null })} placeholder="https://…" className={inputCls} />
              </div>
            </div>

            {/* Gradient */}
            <div>
              <label className={labelCls}>Gradient (placeholder sans image)</label>
              <div className="flex gap-2 items-center">
                <input value={editing.gradient ?? ''} onChange={e => setEditing({ ...editing, gradient: e.target.value })} className={`${inputCls} flex-1`} />
                <div className="w-10 h-10 rounded-xl shrink-0" style={{ background: editing.gradient ?? '' }} />
              </div>
            </div>

            {/* Context */}
            <div>
              <label className={labelCls}>Contexte</label>
              <textarea rows={3} value={editing.context ?? ''} onChange={e => setEditing({ ...editing, context: e.target.value })} placeholder="Contexte du projet…" className={`${inputCls} resize-none`} />
            </div>

            {/* What I did */}
            <div>
              <label className={labelCls}>Ce que j'ai fait</label>
              <ListInput values={editing.what_i_did ?? []} onChange={v => setEditing({ ...editing, what_i_did: v })} placeholder="Action" />
            </div>

            {/* Learned */}
            <div>
              <label className={labelCls}>Ce que j'ai appris</label>
              <textarea rows={3} value={editing.learned ?? ''} onChange={e => setEditing({ ...editing, learned: e.target.value })} placeholder="Apprentissage clé…" className={`${inputCls} resize-none`} />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 px-6 py-4 border-t border-dark-border dark:border-dark-border border-light-border">
            <button onClick={cancel} className="px-4 py-2 rounded-xl text-sm font-semibold text-dark/60 dark:text-light/50 border border-dark-border dark:border-dark-border hover:border-primary/40 transition-all">Annuler</button>
            <button onClick={save} disabled={saving} className="px-5 py-2 rounded-xl text-sm font-semibold bg-primary hover:bg-primary-dark disabled:opacity-50 text-white transition-all flex items-center gap-2">
              {saving ? <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : null}
              {editing.id ? 'Enregistrer' : 'Créer'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-dark/90 dark:text-light/90">Projets</h2>
          <p className="text-xs text-dark/45 dark:text-light/35 mt-0.5">{projects.length} projet{projects.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={startAdd} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold transition-all">
          <Plus size={15} /> Ajouter
        </button>
      </div>

      {/* List */}
      {loading ? (
        <div className="flex justify-center py-12"><div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin" /></div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-dark/40 dark:text-light/35 text-sm">
          Aucun projet. Cliquez sur "Ajouter" pour commencer.
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {projects.map(p => (
            <div key={p.id} className="rounded-2xl border border-dark-border dark:border-dark-border border-light-border bg-dark-card/40 dark:bg-dark-card/40 bg-light-card/70 overflow-hidden">
              <div className="flex items-center gap-4 p-4">
                {/* Thumbnail */}
                <div className="w-16 h-11 rounded-lg overflow-hidden shrink-0" style={{ background: p.gradient }}>
                  {p.image_url && <img src={p.image_url} alt={p.title} className="w-full h-full object-cover" />}
                </div>
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-dark/90 dark:text-light/90 truncate">{p.title}</p>
                  <p className="text-xs text-dark/45 dark:text-light/35">{p.category}{p.company ? ` · ${p.company}` : ''}</p>
                </div>
                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button onClick={() => setExpanded(expanded === p.id ? null : p.id)} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-dark/80 dark:hover:text-light/70 hover:bg-dark-surface dark:hover:bg-dark-surface transition-all">
                    {expanded === p.id ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                  </button>
                  <button onClick={() => startEdit(p)} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-primary dark:hover:text-primary-light hover:bg-primary/[0.08] transition-all"><Pencil size={15} /></button>
                  <button onClick={() => remove(p.id)} className="p-1.5 rounded-lg text-dark/40 dark:text-light/35 hover:text-red-400 hover:bg-red-500/[0.08] transition-all"><Trash2 size={15} /></button>
                </div>
              </div>
              {expanded === p.id && (
                <div className="px-4 pb-4 pt-0 border-t border-dark-border/40 dark:border-dark-border/40 border-light-border/40">
                  <p className="text-xs text-dark/55 dark:text-light/45 leading-relaxed mt-3">{p.description || '—'}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.stack.map(t => <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-dark-surface/70 dark:bg-dark-surface/70 bg-light/70 text-dark/50 dark:text-light/40 border border-dark-border dark:border-dark-border border-light-border">{t}</span>)}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Form modal */}
      {editing && <Form />}
    </div>
  );
};

export default ProjectsTab;
