import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Layout        from './components/Layout/Layout';
import MainPage      from './pages/MainPage';
import { ThemeProvider } from './components/Theme/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute   from './components/admin/ProtectedRoute';

/* Admin pages — lazy loaded (ne charge pas pour les visiteurs) */
const AdminLogin     = lazy(() => import('./pages/admin/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));

const AdminFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-dark">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

function App() {
  return (
    <ThemeProvider>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* ── Portfolio ── */}
          <Route path="/" element={
            <Layout><MainPage /></Layout>
          } />

          {/* ── Admin ── */}
          <Route path="/admin" element={
            <Suspense fallback={<AdminFallback />}><AdminLogin /></Suspense>
          } />
          <Route path="/admin/dashboard" element={
            <Suspense fallback={<AdminFallback />}>
              <ProtectedRoute><AdminDashboard /></ProtectedRoute>
            </Suspense>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
