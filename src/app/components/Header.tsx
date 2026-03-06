'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!mounted) return null;

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm' : 'bg-transparent'
    }`}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center h-16 px-4">
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">
            Min<span className="text-teal-600">.</span>
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
