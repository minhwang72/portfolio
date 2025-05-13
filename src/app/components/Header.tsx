'use client';

import { useEffect, useState } from 'react';

const Header = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-background-color/80 backdrop-blur-sm border-b border-border-color">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center h-16 px-4">
          <h1 className="text-xl font-bold text-text-color md:text-center md:flex-1">Min Hwang</h1>
        </div>
      </div>
    </header>
  );
};

export default Header; 