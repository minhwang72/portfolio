'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Search } from 'lucide-react';
import Live from '../components/Live';
import ServiceMap from '../components/ServiceMap';
import { openAsk } from '../lib/useAsk';
import { useStatus } from '../lib/useStatus';

// 질문창 자리표시자에 차례로 타이핑되는 예시
const prompts = ['대표 프로젝트는 뭔가요?', '어떤 기술을 쓰나요?', '서버는 어떻게 운영하나요?', '이 질문창은 어떻게 동작하나요?'];
const chips = ['대표 프로젝트', '쓰는 기술', '경력', '연락처'];

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

/** 첫 화면: 검색엔진 첫 화면처럼 이름 + 큰 질문창(스크롤하면 아래 알약으로 따라옴) */
export default function Hero() {
  const status = useStatus();
  const [q, setQ] = useState('');
  const typed = useTyping(prompts);
  const allUp = status ? status.services.every((s) => s.up) : true;

  const ask = (text?: string) => {
    openAsk(text?.trim() || undefined);
    setQ('');
  };

  return (
    <div className="relative flex min-h-[100svh] flex-col items-center justify-center px-5 pb-24 pt-20">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
        <h1 className="text-[36px] font-bold tracking-[-0.04em] text-fg sm:text-[48px]">
          황민 <span className="font-medium text-sub">· 만들고, 배포하고, 운영합니다</span>
        </h1>
        <p className="mt-2 text-[16px] text-sub">풀스택 &amp; AI 엔지니어. 지금 제 서버에서 돌아가는 서비스들이에요.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }} className="mt-6 flex w-full justify-center">
        <ServiceMap services={status?.services ?? null} photo="/_next/image?url=%2Fimages%2Fprofile%2Fprofile.jpeg&w=256&q=75" />
      </motion.div>

      <motion.form
        id="hero-ask"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        onSubmit={(e) => {
          e.preventDefault();
          ask(q);
        }}
        className="mt-6 flex w-full max-w-[600px] items-center gap-3 rounded-full border border-line bg-bg py-2 pl-5 pr-2 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-shadow focus-within:shadow-[0_6px_30px_rgba(0,0,0,0.12)]"
      >
        <Search className="h-5 w-5 flex-none text-sub" />
        <div className="relative min-w-0 flex-1">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            aria-label="황민에게 질문"
            className="w-full bg-transparent py-2 text-[17px] text-fg focus:outline-none"
          />
          {!q && (
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center text-[17px] text-sub">
              {typed}
              <span className="typing-cursor" />
            </span>
          )}
        </div>
        <button type="submit" className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-fg text-bg" aria-label="질문하기">
          <ArrowUp className="h-5 w-5" />
        </button>
      </motion.form>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.3 }} className="mt-4 flex flex-wrap justify-center gap-2">
        {chips.map((c) => (
          <button key={c} onClick={() => ask(c === '연락처' ? '연락처 알려 주세요' : `${c}는?`)} className="rounded-full border border-line px-4 py-2 text-sm text-fg/80 hover:bg-surface">
            {c}
          </button>
        ))}
      </motion.div>


      <a href="#projects" className="absolute bottom-8 inline-flex items-center gap-2 text-[13px] text-sub hover:text-fg">
        <Live up={allUp} pulse />
        {allUp ? '모두 정상 · 1분마다 직접 확인' : '일부 서비스 응답 없음'}
      </a>
    </div>
  );
}
