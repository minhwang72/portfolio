'use client';

import { useRef } from 'react';
import { motion, MotionValue, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import { certifications, getCareerDurations } from '../lib/portfolio-data';
import { useStatus } from '../lib/useStatus';

const sentence =
  '웹과 앱을 만드는 풀스택 엔지니어입니다. 커머스 서비스의 API부터 웹·앱까지 만들었고, 지금은 LLM과 MCP로 일을 자동화합니다. 퇴근 후에도 제가 만든 서비스들이 집 서버에서 돌아가고 있어요.';

function Word({ word, i, n, progress }: { word: string; i: number; n: number; progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [i / n, (i + 1) / n], [0.15, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

function Count({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!seen) return;
    const t0 = performance.now();
    let id = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 900);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [seen, to]);
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

export default function Intro() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] });
  const words = sentence.split(' ');
  const status = useStatus();
  const { hexa, cocoa } = getCareerDurations();
  const ups = status?.services.filter((s) => s.up && s.ms != null).map((s) => s.ms as number) ?? [];
  const avg = ups.length ? Math.round(ups.reduce((a, b) => a + b, 0) / ups.length) : 0;
  const months = (hexa.years + cocoa.years) * 12 + hexa.months + cocoa.months;

  const stats = [
    { node: <><Count to={Math.floor(months / 12)} />년 <Count to={months % 12} />개월</>, label: '개발 경력' },
    { node: avg ? <><Count to={avg} />ms</> : '—', label: '직접 운영 중인 서비스 평균 응답', live: true },
    { node: <Count to={3} />, label: '토스 앱인토스 미니앱' },
    { node: <Count to={certifications.length} />, label: '자격증 · Claude 아키텍트 포함' },
  ];

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-28 sm:py-40">
      <div ref={ref}>
        <p className="text-[28px] font-bold leading-[1.45] tracking-[-0.03em] text-fg sm:text-[44px]">
          {words.map((w, i) => (
            <Word key={i} word={w} i={i} n={words.length} progress={scrollYProgress} />
          ))}
        </p>
      </div>

      <dl className="mt-20 grid grid-cols-2 gap-y-10 sm:mt-28 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="border-l border-line pl-5"
          >
            <dd className={`text-[34px] font-bold tracking-[-0.04em] sm:text-[48px] ${s.live ? 'text-live' : 'text-fg'}`}>{s.node}</dd>
            <dt className="mt-1 text-sm text-sub">{s.label}</dt>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
