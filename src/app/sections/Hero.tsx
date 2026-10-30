'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import StatusBoard, { useStatus } from '../components/StatusBoard';
import { openChat } from '../components/ChatBot';
import { CONTACT, getCareerDurations } from '../lib/portfolio-data';

const examples = ['대표 프로젝트는?', 'RPA 운영은 어떻게 했나요?', '이 상태판은 어떻게 만들었나요?'];

export default function Hero() {
  const status = useStatus();
  const [q, setQ] = useState('');
  const { total } = getCareerDurations();
  const up = status ? `${status.services.filter((s) => s.up).length}/${status.services.length}` : '—';

  const kpis = [
    { value: '900+', label: 'RPA 과제 단독 운영', sub: '8개 계열사' },
    { value: '90→10', label: '월 장애 건수', sub: '공통 모듈 표준화 후' },
    { value: up, label: '지금 운영 중인 서비스', sub: '홈서버 직접 운영', live: true },
    { value: total, label: '개발 경력', sub: '풀스택 → AI·운영' },
  ];

  const ask = (text: string) => {
    if (!text.trim()) return;
    openChat(text.trim());
    setQ('');
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-12 px-4 pb-20 pt-28 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:pt-36">
      <div>
        <p className="mb-5 font-mono text-xs text-mute">
          <span className="text-live">●</span> seoul · fullstack &amp; ai engineer
        </p>
        <h1 className="font-serif text-6xl font-bold leading-[0.95] tracking-tight text-fg sm:text-7xl">
          Hwang
          <br />
          <span className="text-accent">Min</span>
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
          서비스를 <span className="text-fg">만들고, 배포하고, 운영합니다.</span>
          <br />
          지금 이 순간에도 돌아가는 것으로 보여 드릴게요.
        </p>

        <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          {kpis.map((k) => (
            <div key={k.label} className="bg-ink px-4 py-4">
              <dd className={`whitespace-nowrap font-mono text-xl font-semibold ${k.live ? 'text-live' : 'text-fg'}`}>{k.value}</dd>
              <dt className="mt-1 text-xs leading-snug text-mute">{k.label}</dt>
              <p className="mt-0.5 text-[11px] text-dim">{k.sub}</p>
            </div>
          ))}
        </dl>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(q);
          }}
          className="mt-8 flex items-center gap-2 rounded-xl border border-line bg-panel px-4 py-3 focus-within:border-accent/60 transition-colors"
        >
          <span className="font-mono text-sm text-accent">&gt;</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="황민에 대해 무엇이든 물어보세요"
            aria-label="AI에게 질문"
            className="min-w-0 flex-1 bg-transparent text-sm text-fg placeholder:text-dim focus:outline-none"
          />
          <button type="submit" aria-label="질문 보내기" className="rounded-md p-1.5 text-mute hover:bg-panel2 hover:text-accent transition-colors">
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
        <div className="mt-3 flex flex-wrap gap-2">
          {examples.map((e) => (
            <button
              key={e}
              onClick={() => ask(e)}
              className="rounded-full border border-line px-3 py-1 text-xs text-mute hover:border-accent/50 hover:text-fg transition-colors"
            >
              {e}
            </button>
          ))}
          <a href={`mailto:${CONTACT.email}`} className="rounded-full px-3 py-1 text-xs text-dim hover:text-fg transition-colors">
            {CONTACT.email}
          </a>
        </div>
      </div>

      <StatusBoard data={status} />
    </div>
  );
}
