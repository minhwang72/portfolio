'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Github, Linkedin, Mail, PenLine } from 'lucide-react';
import { CONTACT, certifications } from '../lib/portfolio-data';

/** 연락: 먹색 패널 + 아이콘(메일 앱 열기 / 주소 복사 / 새 탭) */
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = `mailto:${CONTACT.email}`;
    }
  };

  const icons = [
    { icon: Mail, label: '메일 보내기', href: `mailto:${CONTACT.email}`, primary: true },
    { icon: copied ? Check : Copy, label: copied ? '복사됨' : '메일 주소 복사', onClick: copy },
    { icon: Github, label: 'GitHub', href: CONTACT.github },
    { icon: Linkedin, label: 'LinkedIn', href: CONTACT.linkedin },
    { icon: PenLine, label: '블로그', href: 'https://eungming.com' },
  ];

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-24 sm:pt-32">
      <div className="flex flex-col gap-8 rounded-[20px] bg-fg px-6 py-8 text-bg sm:px-14 sm:py-14 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-[28px] font-bold leading-[1.2] tracking-[-0.045em] sm:text-[40px]">
            함께 만들 일이 있다면,
            <br />
            편하게 연락 주세요.
          </h2>
          <p className="mt-3.5 font-mono text-sm tracking-normal opacity-60">{CONTACT.email}</p>
          <AnimatePresence>
            {copied && (
              <motion.p initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-2 text-sm text-live">
                메일 주소를 복사했어요
              </motion.p>
            )}
          </AnimatePresence>
        </div>
        <div className="flex flex-wrap gap-2.5">
          {icons.map(({ icon: Icon, label, href, onClick, primary }) => {
            const cls = `group relative flex h-12 w-12 items-center justify-center rounded-xl border transition-colors ${
              primary ? 'border-bg bg-bg text-fg' : 'border-bg/25 hover:border-bg/60'
            }`;
            const tip = (
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-bg px-2 py-1 text-xs text-fg opacity-0 transition-opacity group-hover:opacity-100">
                {label}
              </span>
            );
            return href ? (
              <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer" aria-label={label} className={cls}>
                {tip}
                <Icon className="h-5 w-5" />
              </a>
            ) : (
              <button key="copy" onClick={onClick} aria-label={label} className={cls}>
                {tip}
                <Icon className="h-5 w-5" />
              </button>
            );
          })}
        </div>
      </div>
      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-sub">
        {certifications.map((c) =>
          c.url ? (
            <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
              {c.name} ↗
            </a>
          ) : (
            <span key={c.name}>{c.name}</span>
          )
        )}
      </p>
    </div>
  );
}
