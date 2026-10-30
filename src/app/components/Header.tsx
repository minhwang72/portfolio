'use client';

import { useEffect, useState } from 'react';
import { openChat } from './ChatBot';

const navLinks = [
  { label: 'Work', href: '#featured' },
  { label: 'Experience', href: '#experience' },
  { label: 'Stack', href: '#stack' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        scrolled ? 'bg-ink/85 backdrop-blur-md border-b border-line' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-mono text-sm text-mute hover:text-fg transition-colors">
          <span className="text-live">min</span>@monsil<span className="text-dim">:~$</span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="hidden sm:inline text-sm text-mute hover:text-fg transition-colors">
              {l.label}
            </a>
          ))}
          <button
            onClick={() => openChat()}
            className="ml-2 rounded-md border border-accent/40 bg-accent/10 px-3 py-1.5 font-mono text-xs text-accent hover:bg-accent/20 transition-colors"
          >
            ask&nbsp;AI
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
