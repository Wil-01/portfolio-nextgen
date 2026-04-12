import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FolderKanban, Code2, BookOpen, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProjectsTab from './tabs/ProjectsTab';
import SkillsTab   from './tabs/SkillsTab';
import ParcoursTab from './tabs/ParcoursTab';

type Tab = 'projects' | 'skills' | 'parcours';

const TABS: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: 'projects', label: 'Projets',      icon: <FolderKanban size={18} /> },
  { id: 'skills',   label: 'Compétences',  icon: <Code2 size={18} /> },
  { id: 'parcours', label: 'Parcours',     icon: <BookOpen size={18} /> },
];

const AdminDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate          = useNavigate();
  const [tab,     setTab]     = useState<Tab>('projects');
  const [sideOpen, setSideOpen] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin', { replace: true });
  };

  const NavItem = ({ t }: { t: typeof TABS[0] }) => (
    <button
      onClick={() => { setTab(t.id); setSideOpen(false); }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
        tab === t.id
          ? 'bg-primary/10 text-primary dark:text-primary-light'
          : 'text-dark/55 dark:text-light/45 hover:text-dark/90 dark:hover:text-light/90 hover:bg-black/[0.05] dark:hover:bg-white/[0.05]'
      }`}
    >
      <span className={tab === t.id ? 'text-primary dark:text-primary-light' : 'text-dark/40 dark:text-light/35'}>{t.icon}</span>
      {t.label}
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-dark dark:bg-dark bg-light">
      {/* ── Top navbar ── */}
      <header className="sticky top-0 z-40 flex items-center justify-between px-5 py-3.5 border-b border-dark-border dark:border-dark-border border-light-border bg-dark-surface/95 dark:bg-dark-surface/95 bg-light-surface/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          {/* Mobile menu toggle */}
          <button onClick={() => setSideOpen(p => !p)} className="lg:hidden p-1.5 rounded-lg text-dark/45 dark:text-light/45 hover:bg-black/[0.06] dark:hover:bg-white/[0.06] transition-all">
            {sideOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <span className="text-lg font-black tracking-tight">
            <span className="text-gradient">WKG</span>
            <span className="text-primary text-xl leading-none">.</span>
          </span>
          <span className="hidden sm:block text-xs text-dark/40 dark:text-light/30 font-medium border-l border-dark-border dark:border-dark-border border-light-border pl-3">Admin</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-xs text-dark/40 dark:text-light/30 truncate max-w-[180px]">{user?.email}</span>
          <button onClick={handleLogout} className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-dark/55 dark:text-light/45 border border-dark-border dark:border-dark-border border-light-border hover:border-red-500/40 hover:text-red-400 transition-all">
            <LogOut size={13} /> Déconnexion
          </button>
        </div>
      </header>

      <div className="flex flex-1">
        {/* ── Sidebar — desktop ── */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-dark-border dark:border-dark-border border-light-border bg-dark-surface/50 dark:bg-dark-surface/50 bg-light-surface/50 p-4 gap-1">
          {TABS.map(t => <NavItem key={t.id} t={t} />)}
        </aside>

        {/* ── Sidebar — mobile drawer ── */}
        {sideOpen && (
          <div className="lg:hidden fixed inset-0 z-30" onClick={() => setSideOpen(false)}>
            <div className="absolute inset-0 bg-dark/50" />
            <aside className="relative w-60 h-full border-r border-dark-border dark:border-dark-border border-light-border bg-dark-surface dark:bg-dark-surface bg-light-surface p-4 flex flex-col gap-1" onClick={e => e.stopPropagation()}>
              <p className="text-xs font-semibold uppercase tracking-widest text-dark/35 dark:text-light/30 px-4 py-2">Navigation</p>
              {TABS.map(t => <NavItem key={t.id} t={t} />)}
            </aside>
          </div>
        )}

        {/* ── Main content ── */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            {tab === 'projects' && <ProjectsTab />}
            {tab === 'skills'   && <SkillsTab />}
            {tab === 'parcours' && <ParcoursTab />}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
