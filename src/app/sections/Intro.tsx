'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { getCareerDurations } from '../lib/portfolio-data';

function Count({ to }: { to: number }) {
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
  return <span ref={ref}>{n}</span>;
}

// 실제 값(2026-10-30 확인): GitHub 올해 기여 = gh api contributionsCollection, 컨테이너 = monsil `docker ps`
const GITHUB_2026 = 411;
const CONTAINERS = 17;

/** 숫자 세 개: 경력, 올해 GitHub 기여, 집 서버에서 도는 컨테이너 */
export default function Intro() {
  const { hexa, cocoa } = getCareerDurations();
  const months = (hexa.years + cocoa.years) * 12 + hexa.months + cocoa.months;

  const stats = [
    { node: <><Count to={Math.floor(months / 12)} />년 <Count to={months % 12} />개월</>, label: '개발 경력', note: '풀스택 → AI·자동화' },
    { node: <><Count to={GITHUB_2026} />회</>, label: '올해 GitHub 기여', note: '2026.10 기준 · 비공개 저장소 포함' },
    { node: <><Count to={CONTAINERS} />개</>, label: '집 서버에서 도는 컨테이너', note: '서비스·DB·자동화 · 2026.10 기준' },
  ];

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-28 sm:pt-36">
      <dl className="grid border-t border-fg sm:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`pt-5 ${i ? 'mt-6 sm:mt-0 sm:pl-6' : ''}`}
          >
            <dd className="text-[34px] font-bold tracking-[-0.04em] text-fg sm:text-[44px]">{s.node}</dd>
            <dt className="mt-0.5 text-[14px] font-medium text-fg/80">{s.label}</dt>
            <p className="mt-0.5 text-xs text-sub">{s.note}</p>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
