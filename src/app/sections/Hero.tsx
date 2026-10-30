'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUp, ChevronDown, Sparkles } from 'lucide-react';
import Live from '../components/Live';
import { openAsk } from '../lib/useAsk';
import { useStatus } from '../lib/useStatus';

/** 첫 화면: 항상 어두운 배경의 큰 문장 + 질문창(스크롤하면 아래 알약으로 따라옴) */
export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const status = useStatus();
  const [q, setQ] = useState('');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const zoom = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const up = status?.services.filter((s) => s.up).length;

  return (
    <div ref={ref} className="dark relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black text-fg">
      {/* 배경 빛 */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[720px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: 'radial-gradient(circle, rgba(41,151,255,0.35), rgba(48,209,88,0.12) 45%, transparent 70%)' }}
        animate={{ scale: [1, 1.08, 1], rotate: [0, 20, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div style={{ y, opacity: fade, scale: zoom }} className="relative z-10 mx-auto w-full max-w-[980px] px-5 pt-16 text-center">
        <motion.a
          href="#projects"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-3.5 py-1.5 text-[13px] text-sub backdrop-blur"
        >
          <Live pulse up={up === undefined || up > 0} />
          {status ? (
            <>
              <span className="text-fg">서비스 {up}/{status.services.length} 운영 중</span> · 지금 이 사이트도 집 서버에서
            </>
          ) : (
            '집 서버에서 직접 운영 중'
          )}
        </motion.a>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-[44px] font-bold leading-[1.08] tracking-[-0.045em] sm:text-[72px] lg:text-[96px]"
        >
          만들고, 배포하고,
          <br />
          <span className="bg-gradient-to-r from-[#2997ff] via-[#5ac8fa] to-[#30d158] bg-clip-text text-transparent">운영합니다.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto mt-6 max-w-[560px] text-[17px] leading-relaxed text-sub sm:text-xl"
        >
          풀스택 &amp; AI 엔지니어 <span className="font-semibold text-fg">황민</span>입니다.
          <br className="hidden sm:block" /> 웹과 앱을 만들고, 집 서버 한 대로 서비스 여섯 개를 직접 운영해요.
        </motion.p>

        <motion.form
          id="hero-ask"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          onSubmit={(e) => {
            e.preventDefault();
            openAsk(q || undefined);
            setQ('');
          }}
          className="mx-auto mt-10 flex max-w-[520px] items-center gap-3 rounded-full border border-line bg-surface/70 py-2 pl-5 pr-2 backdrop-blur-xl"
        >
          <Sparkles className="h-4 w-4 flex-none text-accent" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="저에 대해 무엇이든 물어보세요"
            aria-label="황민에게 질문"
            className="min-w-0 flex-1 bg-transparent text-[16px] text-fg placeholder:text-sub focus:outline-none"
          />
          <button type="submit" className="flex h-10 w-10 items-center justify-center rounded-full bg-fg text-black" aria-label="질문하기">
            <ArrowUp className="h-4 w-4" />
          </button>
        </motion.form>
        <p className="mt-3 text-[13px] text-sub">포트폴리오 문서를 찾아 Claude가 답해요 · 스크롤해도 아래에서 따라와요</p>
      </motion.div>

      <motion.a
        href="#intro"
        aria-label="아래로"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sub"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity }}
      >
        <ChevronDown className="h-6 w-6" />
      </motion.a>
    </div>
  );
}
