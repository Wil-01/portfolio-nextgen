import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Lock, Mail, Eye, EyeOff } from 'lucide-react';

const AdminLogin: React.FC = () => {
  const { signIn, user } = useAuth();
  const navigate         = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPwd,  setShowPwd]  = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  // Already logged in → redirect
  React.useEffect(() => {
    if (user) navigate('/admin/dashboard', { replace: true });
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const err = await signIn(email, password);
    if (err) { setError('Email ou mot de passe incorrect.'); setLoading(false); }
    else      navigate('/admin/dashboard', { replace: true });
  };

  const inputCls = 'w-full px-4 py-3 rounded-xl text-sm bg-dark-card/60 dark:bg-dark-card/60 bg-light-card/80 text-dark/85 dark:text-light/85 border border-dark-border dark:border-dark-border border-light-border placeholder:text-dark/35 dark:placeholder:text-light/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/50 transition-all';

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-dark dark:bg-dark bg-light">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <span className="text-3xl font-black tracking-tight">
            <span className="text-gradient">WKG</span>
            <span className="text-primary">.</span>
          </span>
          <p className="text-sm text-dark/45 dark:text-light/40 mt-1">Espace administration</p>
        </div>

        <div className="p-7 rounded-2xl bg-dark-card/50 dark:bg-dark-card/50 bg-light-card/70 border border-dark-border dark:border-dark-border border-light-border shadow-xl">
          <h1 className="text-lg font-bold text-dark/90 dark:text-light/90 mb-6">Connexion</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/35 dark:text-light/30 pointer-events-none" />
              <input
                type="email"
                required
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email"
                className={`${inputCls} pl-10`}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-dark/35 dark:text-light/30 pointer-events-none" />
              <input
                type={showPwd ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Mot de passe"
                className={`${inputCls} pl-10 pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPwd(p => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-dark/35 dark:text-light/30 hover:text-dark/70 dark:hover:text-light/60"
              >
                {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 px-3 py-2 rounded-lg">
                {error}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark disabled:opacity-50 text-white text-sm font-semibold transition-all duration-200 mt-1"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : 'Se connecter'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-dark/30 dark:text-light/25 mt-6">
          Portfolio de Williams KOUTON GODONOU
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
