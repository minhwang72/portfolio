'use client';

import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Career', href: '#career' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled
        ? 'bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm'
        : 'bg-transparent'
    }`}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4">
          <span className="text-lg font-bold text-slate-900 tracking-tight">
            Min<span className="text-teal-600">.</span>
          </span>

          <nav className="hidden sm:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-600 hover:text-teal-600:text-teal-400 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>
      </div>
    </header>
  );
};

export default Header;
