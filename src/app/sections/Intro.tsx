'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { certifications, getCareerDurations } from '../lib/portfolio-data';
import { useStatus } from '../lib/useStatus';

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

/** 숫자 네 개: 경력, 실제 평균 응답, 미니앱, 자격증 */
export default function Intro() {
  const status = useStatus();
  const { hexa, cocoa } = getCareerDurations();
  const months = (hexa.years + cocoa.years) * 12 + hexa.months + cocoa.months;
  const ups = status?.services.filter((s) => s.up && s.ms != null).map((s) => s.ms as number) ?? [];
  const avg = ups.length ? Math.round(ups.reduce((a, b) => a + b, 0) / ups.length) : 0;

  const stats = [
    { node: <><Count to={Math.floor(months / 12)} />년 <Count to={months % 12} />개월</>, label: '개발 경력' },
    { node: avg ? <><Count to={avg} />ms</> : '—', label: '운영 중 서비스 평균 응답' },
    { node: <Count to={3} />, label: '토스 앱인토스 미니앱' },
    { node: <Count to={certifications.length} />, label: '자격증 · Claude 아키텍트' },
  ];

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-28 sm:pt-36">
      <dl className="grid grid-cols-2 border-t border-fg lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            className={`pt-5 ${i % 2 ? 'pl-4' : ''} ${i ? 'lg:pl-6' : ''} ${i > 1 ? 'mt-6 lg:mt-0' : ''}`}
          >
            <dd className="text-[28px] font-bold tracking-[-0.04em] text-fg sm:text-[40px]">{s.node}</dd>
            <dt className="mt-0.5 text-[13px] text-sub">{s.label}</dt>
          </motion.div>
        ))}
      </dl>
    </div>
  );
}
