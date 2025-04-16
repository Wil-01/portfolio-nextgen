import React, { ReactNode, useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis'; 
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import ThemeToggle from '../Theme/ThemeToggle'; 

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, 
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow pt-20">
          {children}
      </main>
      <Footer />
      <ThemeToggle /> 
    </div>
  );
};

export default Layout;