'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Github, Linkedin, Mail, PenLine } from 'lucide-react';
import { CONTACT, certifications } from '../lib/portfolio-data';

/** 연락: 아이콘을 누르면 바로 동작(메일 앱 열기 / 주소 복사 / 새 탭) */
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
    <div className="dark bg-black px-5 py-28 text-fg sm:py-36">
      <div className="mx-auto max-w-[1080px] text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-[40px] font-bold leading-[1.1] tracking-[-0.045em] sm:text-[64px]"
        >
          함께 만들 일이 있다면,
          <br />
          <span className="text-sub">편하게 연락 주세요.</span>
        </motion.h2>
        <p className="mt-5 text-lg text-sub">{CONTACT.email}</p>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          {icons.map(({ icon: Icon, label, href, onClick, primary }) => {
            const cls = `group relative flex h-14 w-14 items-center justify-center rounded-full transition-transform hover:scale-110 ${
              primary ? 'bg-fg text-black' : 'bg-white/10 text-fg hover:bg-white/20'
            }`;
            const tip = (
              <span className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-fg px-2 py-1 text-xs text-black opacity-0 transition-opacity group-hover:opacity-100">
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
        <AnimatePresence>
          {copied && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 text-sm text-live">
              메일 주소를 복사했어요
            </motion.p>
          )}
        </AnimatePresence>

        <div className="mx-auto mt-20 flex max-w-[640px] flex-wrap justify-center gap-x-8 gap-y-3 border-t border-line pt-8 text-sm text-sub">
          {certifications.map((c) =>
            c.url ? (
              <a key={c.name} href={c.url} target="_blank" rel="noopener noreferrer" className="hover:text-fg">
                {c.name} ↗
              </a>
            ) : (
              <span key={c.name}>{c.name}</span>
            )
          )}
        </div>
      </div>
    </div>
  );
}
