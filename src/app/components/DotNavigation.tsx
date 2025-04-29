'use client';

import { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import MobileNavigation from './MobileNavigation';

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'career', label: 'Career' },
  { id: 'contact', label: 'Contact' },
];

export default function DotNavigation() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // 스크롤 감지 로직 개선
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY;
    let currentSection = 'home';

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        const { top, height } = element.getBoundingClientRect();
        const elementTop = top + window.scrollY;
        
        if (scrollPosition >= elementTop - height * 0.3) {
          currentSection = section.id;
        }
      }
    });

    setActiveSection(currentSection);
  }, []);

  // 모바일 체크
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 스크롤 이벤트 최적화
  useEffect(() => {
    let timeoutId: NodeJS.Timeout | undefined;
    const throttledScroll = () => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handleScroll();
        timeoutId = undefined;
      }, 100);
    };

    window.addEventListener('scroll', throttledScroll);
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handleScroll]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (pathname !== '/') return null;

  if (isMobile) {
    return <MobileNavigation sections={sections} activeSection={activeSection} scrollToSection={scrollToSection} />;
  }

  return (
    <nav 
      className="fixed z-50 right-8 top-1/2 transform -translate-y-1/2 flex-col flex gap-4"
      aria-label="Page navigation"
    >
      {sections.map((section) => (
        <div key={section.id} className="relative group">
          <button
            onClick={() => scrollToSection(section.id)}
            className="w-3 h-3 rounded-full transition-all duration-300"
            aria-label={`Go to ${section.label} section`}
            aria-current={activeSection === section.id ? 'true' : 'false'}
          >
            <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
              activeSection === section.id
                ? 'bg-current scale-125'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`} />
          </button>
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <div className="bg-background-color text-current text-xs px-2 py-1 rounded whitespace-nowrap shadow-lg shadow-black/10 dark:shadow-white/10">
              {section.label}
            </div>
            <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-background-color rotate-45 shadow-lg shadow-black/10 dark:shadow-white/10" />
          </div>
        </div>
      ))}
    </nav>
  );
} 