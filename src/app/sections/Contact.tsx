'use client';

import { useState } from 'react';
import { ArrowUpRight, Check, Copy, Github, Linkedin, Mail, PenLine } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { CONTACT } from '../lib/portfolio-data';

/** 연락: 이름표가 붙은 행. 메일은 복사·메일 쓰기, 나머지는 새 탭 */
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

  const links = [
    { icon: Github, label: 'GitHub', value: 'github.com/minhwang72', href: CONTACT.github },
    { icon: Linkedin, label: 'LinkedIn', value: 'linkedin.com/in/min-hwang', href: CONTACT.linkedin },
    { icon: PenLine, label: '블로그', value: 'eungming.com', href: 'https://eungming.com' },
  ];
  const row = 'flex items-center gap-4 border-b border-line py-5';

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-32 sm:pt-44">
      <SectionHead title="연락" note="메일이 가장 빨라요" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <p className="text-[28px] font-bold leading-[1.3] tracking-[-0.04em] text-fg sm:text-[36px]">
          함께 만들 일이 있다면,
          <br />
          편하게 연락 주세요.
        </p>
        <div className="border-t border-line">
          <div className={row}>
            <Mail className="h-5 w-5 flex-none text-sub" />
            <div className="min-w-0 flex-1">
              <p className="text-xs text-sub">이메일</p>
              <p className="truncate font-mono text-[15px] tracking-normal text-fg">{CONTACT.email}</p>
            </div>
            <button onClick={copy} className="inline-flex items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-[13px] text-fg hover:border-fg/40" aria-label="메일 주소 복사">
              {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
              {copied ? '복사됨' : '복사'}
            </button>
            <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-1.5 rounded-lg bg-fg px-3 py-2 text-[13px] font-semibold text-bg">
              메일 쓰기
            </a>
          </div>
          {links.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={`${row} group`}>
              <Icon className="h-5 w-5 flex-none text-sub" />
              <div className="min-w-0 flex-1">
                <p className="text-xs text-sub">{label}</p>
                <p className="truncate font-mono text-[15px] tracking-normal text-fg">{value}</p>
              </div>
              <ArrowUpRight className="h-4 w-4 text-sub transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-fg" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
