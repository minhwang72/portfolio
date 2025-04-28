'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'career', label: 'Career' },
    { id: 'contact', label: 'Contact' }
  ];
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => {
          const element = document.getElementById(section.id);
          if (element) {
            observerRef.current?.unobserve(element);
          }
        });
      }
    };
  }, [sections]);

  return (
    <nav className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden md:block z-50">
      <ul className="space-y-4">
        {sections.map((section) => (
          <li key={section.id} className="group relative flex items-center">
            <span className="absolute left-0 transform -translate-x-full -translate-x-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-background-color border border-border-color rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {section.label}
            </span>
            {activeSection === section.id && (
              <span className="absolute right-0 w-8 h-[2px] bg-primary-color transform translate-x-2 rounded-full" />
            )}
            <Link
              href={`#${section.id}`}
              className={`relative block w-3 h-3 rounded-full transition-all duration-300 ${
                activeSection === section.id 
                ? 'bg-text-color border-2 border-text-color' 
                : 'border-2 border-text-color/50 hover:border-text-color'
              }`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation; 