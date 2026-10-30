'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Search } from 'lucide-react';
import ServiceMap from '../components/ServiceMap';
import { getCareerDurations } from '../lib/portfolio-data';
import { openAsk } from '../lib/useAsk';
import { useStatus } from '../lib/useStatus';

// 질문창 자리표시자에 차례로 타이핑되는 예시
const prompts = ['대표 프로젝트는 뭔가요?', '어떤 기술을 쓰나요?', '서버는 어떻게 운영하나요?', '이 질문창은 어떻게 동작하나요?'];
const chips: [string, string][] = [
  ['대표 프로젝트', '대표 프로젝트는?'],
  ['쓰는 기술', '쓰는 기술은?'],
  ['경력', '경력은?'],
  ['연락처', '연락처 알려 주세요'],
];

function useTyping(lines: string[]) {
  const [text, setText] = useState('');
  useEffect(() => {
    let li = 0;
    let ci = 0;
    let del = false;
    let id: ReturnType<typeof setTimeout>;
    const tick = () => {
      const line = lines[li];
      ci += del ? -1 : 1;
      setText(line.slice(0, ci));
      let wait = del ? 35 : 85;
      if (!del && ci === line.length) {
        del = true;
        wait = 1800;
      } else if (del && ci === 0) {
        del = false;
        li = (li + 1) % lines.length;
        wait = 400;
      }
      id = setTimeout(tick, wait);
    };
    id = setTimeout(tick, 600);
    return () => clearTimeout(id);
  }, [lines]);
  return text;
}

const ease = [0.16, 1, 0.3, 1] as const;

/** 첫 화면: 큰 문장 + 실제 서비스 구성도 캔버스 + 질문창(스크롤하면 아래 알약으로 따라옴) */
export default function Hero() {
  const status = useStatus();
  const [q, setQ] = useState('');
  const typed = useTyping(prompts);
  const allUp = status ? status.services.every((s) => s.up) : true;
  const { total } = getCareerDurations();

  const ask = (text?: string) => {
    openAsk(text?.trim() || undefined);
    setQ('');
  };

  return (
    <div className="mx-auto flex min-h-[100svh] max-w-[1104px] flex-col justify-center px-5 pb-10 pt-24">
      <div className="grid items-end gap-8 lg:grid-cols-[1fr_360px] lg:gap-16">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease }}>
          <a href="#projects" className={`mb-6 inline-block font-mono text-xs tracking-normal hover:text-fg ${allUp ? 'text-sub' : 'text-down'}`}>
            {allUp ? 'status: all OK · 1분마다 직접 확인' : 'status: 일부 서비스 응답 없음'}
          </a>
          <h1 className="text-[44px] font-bold leading-[1.04] tracking-[-0.05em] text-fg sm:text-[64px] lg:text-[76px]">
            직접 만들고,
            <br />
            끝까지 운영합니다.
          </h1>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1, ease }}>
          <p className="text-[17px] leading-[1.7] text-fg/80">
            풀스택 &amp; AI 엔지니어 <b className="text-fg">황민</b>입니다. 웹과 앱을 만들고, 집 서버에서 서비스를 직접 운영해요.
          </p>
          <p className="mt-3 text-[13px] text-sub">서울 · 경력 {total}</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease }}
        className="dot-grid relative mt-10 overflow-x-auto rounded-2xl border border-line bg-surface"
      >
        <div className="pointer-events-none absolute inset-x-4 top-3.5 flex justify-between text-xs text-sub">
          <span>지금 돌아가는 서비스</span>
          <span className="font-mono">live · nginx → service</span>
        </div>
        <div className="min-w-[760px] px-2 pt-6">
          <ServiceMap services={status?.services ?? null} photo="/_next/image?url=%2Fimages%2Fprofile%2Fprofile.jpeg&w=256&q=75" />
        </div>
      </motion.div>

      <motion.form
        id="hero-ask"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35, ease }}
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
        className="relative z-10 mx-auto -mt-7 flex w-[calc(100%-24px)] max-w-[600px] items-center gap-3 rounded-[14px] border border-line bg-surface py-2 pl-[18px] pr-2 shadow-[0_12px_32px_rgba(0,0,0,0.08)]"
      >
        <Search className="h-[18px] w-[18px] flex-none text-sub" />
        <div className="relative min-w-0 flex-1">
          <input value={q} onChange={(e) => setQ(e.target.value)} aria-label="황민에게 질문" className="w-full bg-transparent py-2 text-[16px] text-fg focus:outline-none" />
          {!q && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-[16px] text-sub">
              {typed}
              <span className="typing-cursor" />
            </span>
          )}
        </div>
        <button type="submit" className="flex h-10 w-10 flex-none items-center justify-center rounded-[10px] bg-fg text-bg" aria-label="질문하기">
          <ArrowUp className="h-4 w-4" />
        </button>
      </motion.form>

      <div className="mt-3.5 flex flex-wrap justify-center gap-2">
        {chips.map(([label, question]) => (
          <button key={label} onClick={() => ask(question)} className="rounded-lg border border-line bg-surface px-3 py-1.5 text-[13px] text-fg/80 hover:border-fg/40 hover:text-fg">
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
