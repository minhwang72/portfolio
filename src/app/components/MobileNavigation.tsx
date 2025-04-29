'use client';

import { useState } from 'react';

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
        className="p-2 rounded-lg bg-background-color/80 dark:bg-background-color/80 backdrop-blur-sm shadow-lg"
        aria-label="Toggle navigation menu"
      >
        <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300" 
          style={{ transform: isOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
        <div className="w-6 h-0.5 bg-current mb-1.5 transition-all duration-300" 
          style={{ opacity: isOpen ? 0 : 1 }} />
        <div className="w-6 h-0.5 bg-current transition-all duration-300" 
          style={{ transform: isOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
      </button>

      {isOpen && (
        <div className="absolute top-14 right-0 w-48 bg-background-color/90 dark:bg-background-color/90 backdrop-blur-sm rounded-lg shadow-lg py-2">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors duration-200 ${
                activeSection === section.id
                  ? 'text-current font-medium'
                  : 'text-gray-600 dark:text-gray-400 hover:text-current'
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 