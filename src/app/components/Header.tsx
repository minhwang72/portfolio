'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

const links = [
  { label: '프로젝트', href: '#projects' },
  { label: '기술', href: '#stack' },
  { label: '경력', href: '#experience' },
  { label: '연락', href: '#contact' },
];

export default function Header() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'));
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // 저장이 막혀도 이번 화면에서는 바뀜
    }
  };

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-[1104px] items-center justify-between px-5">
        <a href="#top" className="text-[15px] font-bold tracking-tight text-fg">
          황민
        </a>
        <nav className="flex items-center gap-5 text-sm text-sub sm:gap-7">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hidden hover:text-fg sm:inline">
              {l.label}
            </a>
          ))}
          <button onClick={toggle} className="flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-line text-fg hover:bg-surface" aria-label={dark ? '라이트 모드' : '다크 모드'}>
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
