import React, { ReactNode, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import Navbar        from '../Navbar/Navbar';
import Footer        from '../Footer/Footer';
import ScrollControls from './ScrollControls';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
    lenisRef.current = lenis;
    // Expose globally so any component can call lenis.scrollTo()
    (window as any).__lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
      delete (window as any).__lenis;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      {/* Skip-to-content — keyboard/screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[70]
                   focus:px-4 focus:py-2 focus:rounded-lg
                   focus:bg-primary focus:text-white focus:text-sm focus:font-semibold
                   focus:shadow-lg focus:shadow-primary/30"
      >
        Aller au contenu principal
      </a>

      <ScrollControls />
      <Navbar />
      <main id="main-content" className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
