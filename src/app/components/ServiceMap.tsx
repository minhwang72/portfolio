'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { ServiceStatus } from '../lib/useStatus';

// 서비스 지도: 가운데(황민)에서 실제 운영 중인 서비스로 빛 점이 오감.
// 왕복 시간은 실제 응답 속도(ms)에 비례 — 빠른 서비스는 빨리, 느린 서비스는 천천히.
const W = 760;
const H = 380;
const C = { x: W / 2, y: H / 2 };
const short: Record<string, string> = {
  '뮤직시트 (MuT)': '뮤직시트',
  'CBT 학습 플랫폼': 'CBT',
  '기술 블로그': '블로그',
  포트폴리오: '이 사이트',
};

function place(i: number, n: number) {
  // 위·아래로 살짝 눌린 타원, 위쪽부터 시계 방향
  const a = -Math.PI / 2 + (i / n) * Math.PI * 2 + 0.35;
  return { x: C.x + Math.cos(a) * 300, y: C.y + Math.sin(a) * 140 };
}

export default function ServiceMap({ services, photo }: { services: ServiceStatus[] | null; photo: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const list = services ?? [];

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[760px] overflow-visible" role="img" aria-label="직접 운영 중인 서비스 지도">
      <defs>
        <radialGradient id="halo">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.25" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </radialGradient>
        <clipPath id="me">
          <circle cx={C.x} cy={C.y} r="34" />
        </clipPath>
      </defs>

      {/* 궤도 */}
      <ellipse cx={C.x} cy={C.y} rx="300" ry="140" fill="none" stroke="rgb(var(--line))" strokeDasharray="2 6" />
      <circle cx={C.x} cy={C.y} r="90" fill="url(#halo)" />

      {list.map((s, i) => {
        const p = place(i, list.length);
        const ms = s.ms ?? 400;
        // 응답 속도를 눈에 보이는 왕복 시간으로(50ms → 1.4초, 300ms → 3초 정도)
        const dur = 1 + Math.min(ms, 600) / 150;
        const on = hover === s.host;
        return (
          <g key={s.host}>
            <line x1={C.x} y1={C.y} x2={p.x} y2={p.y} stroke={s.up ? 'rgb(var(--live))' : 'rgb(var(--down))'} strokeOpacity={on ? 0.6 : 0.18} strokeWidth={on ? 1.5 : 1} />
            {s.up && !reduce && (
              <motion.circle
                r="3"
                fill="rgb(var(--live))"
                initial={{ cx: C.x, cy: C.y, opacity: 0 }}
                animate={{ cx: [C.x, p.x, C.x], cy: [C.y, p.y, C.y], opacity: [0, 1, 1, 0] }}
                transition={{ duration: dur, repeat: Infinity, repeatDelay: 0.6 + i * 0.15, delay: i * 0.35, ease: 'easeInOut' }}
              />
            )}
            <a href={s.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHover(s.host)} onMouseLeave={() => setHover(null)}>
              <motion.g
                animate={reduce ? undefined : { y: [0, -4, 0] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                style={{ cursor: 'pointer' }}
              >
                <circle cx={p.x} cy={p.y} r={on ? 26 : 22} fill="rgb(var(--bg))" stroke={s.up ? 'rgb(var(--live))' : 'rgb(var(--down))'} strokeWidth="1.5" />
                <circle cx={p.x} cy={p.y} r="5" fill={s.up ? 'rgb(var(--live))' : 'rgb(var(--down))'} />
                <text x={p.x} y={p.y + 44} textAnchor="middle" className="fill-fg text-[22px] font-semibold sm:text-[13px]">
                  {short[s.name] ?? s.name}
                </text>
                <text x={p.x} y={p.y + 62} textAnchor="middle" className="fill-sub text-[19px] sm:text-[11px]">
                  {s.up ? `${s.ms}ms` : '응답 없음'}
                </text>
              </motion.g>
            </a>
          </g>
        );
      })}

      {/* 가운데: 나 */}
      <circle cx={C.x} cy={C.y} r="38" fill="rgb(var(--bg))" stroke="rgb(var(--line))" />
      <image href={photo} x={C.x - 34} y={C.y - 34} width="68" height="68" clipPath="url(#me)" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
