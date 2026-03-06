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
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleSectionClick = (sectionId: string) => {
    scrollToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2.5 rounded-lg bg-white border border-slate-200 shadow-md hover:shadow-lg transition-all"
        aria-label="Toggle navigation menu"
      >
        <div className="w-5 h-0.5 bg-slate-600 mb-1 transition-all duration-300"
          style={{ transform: isOpen ? 'rotate(45deg) translate(3px, 3px)' : 'none' }} />
        <div className="w-5 h-0.5 bg-slate-600 mb-1 transition-all duration-300"
          style={{ opacity: isOpen ? 0 : 1 }} />
        <div className="w-5 h-0.5 bg-slate-600 transition-all duration-300"
          style={{ transform: isOpen ? 'rotate(-45deg) translate(3px, -3px)' : 'none' }} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/10 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-14 right-0 w-48 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50"
            >
              <div className="p-1.5">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    onClick={() => handleSectionClick(section.id)}
                    className={`w-full px-3.5 py-2.5 text-left text-sm rounded-lg transition-all duration-200 ${
                      activeSection === section.id
                        ? 'bg-teal-50 text-teal-600 font-medium'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
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
