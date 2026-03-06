'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface MobileNavigationProps {
  sections: Section[];
  activeSection: string;
  scrollToSection: (sectionId: string) => void;
}

export default function MobileNavigation({ sections, activeSection, scrollToSection }: MobileNavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={toggleMenu}
        className="p-2 rounded-lg bg-background-color shadow-lg hover:bg-background-color/90 transition-colors duration-200"
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300" 
          style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300" 
          style={{ opacity: isOpen ? 0 : 1 }} />
        <div className="w-6 h-0.5 bg-current transition-all duration-300" 
          style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-background-color z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl overflow-hidden z-50"
            >
              <div className="p-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.05 }}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full px-4 py-3 text-left text-sm rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-violet-500/10 text-violet-400 font-medium'
                        : 'text-gray-400 hover:bg-zinc-800 hover:text-slate-200'
                    }`}
                  >
                    {section.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
} 