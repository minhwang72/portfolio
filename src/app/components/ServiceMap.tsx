'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Cloud, Database, Globe, Heart, LineChart, Music, PenLine, Server, type LucideIcon } from 'lucide-react';
import type { ServiceStatus } from '../lib/useStatus';

// 서비스 지도 — 실제 구성 그대로(2026-10 monsil 기준):
//   나 → monsil(nginx) → 뮤직시트·Balance Desk·CBT·블로그·포트폴리오, 그중 넷은 MariaDB 공유
//   나 → AWS → MOID
// 빛 점은 '나 → 허브 → 서비스' 로 오가고, 왕복 시간은 실제 응답 속도(ms)에 비례.
const W = 900;
const H = 500;
const ME = { x: 450, y: 250 };

type Hub = { id: string; label: string; sub: string; x: number; y: number; icon: LucideIcon };
const hubs: Hub[] = [
  { id: 'monsil', label: 'monsil', sub: 'nginx · Docker', x: 300, y: 250, icon: Server },
  { id: 'aws', label: 'AWS', sub: 'Seoul', x: 640, y: 175, icon: Cloud },
  { id: 'db', label: 'MariaDB', sub: '공유 DB', x: 470, y: 395, icon: Database },
];

type Planet = { name: string; hub: 'monsil' | 'aws'; x: number; y: number; r: number; color: string; icon: LucideIcon; ring?: boolean; db?: boolean; moons: string[] };
const planets: Record<string, Planet> = {
  'conti.eungming.com': { name: '뮤직시트', hub: 'monsil', x: 115, y: 345, r: 30, color: '#8b5cf6', icon: Music, ring: true, db: true, moons: ['YOLO', 'Claude'] },
  'stock.eungming.com': { name: 'Balance Desk', hub: 'monsil', x: 640, y: 440, r: 24, color: '#14b8a6', icon: LineChart, db: true, moons: ['KIS API', 'Redis'] },
  'cbt.eungming.com': { name: 'CBT', hub: 'monsil', x: 285, y: 445, r: 20, color: '#f59e0b', icon: BookOpen, db: true, moons: ['Prisma'] },
  'eungming.com': { name: '블로그', hub: 'monsil', x: 130, y: 120, r: 22, color: '#3b82f6', icon: PenLine, db: true, moons: ['WordPress'] },
  'pf.eungming.com': { name: '포트폴리오', hub: 'monsil', x: 330, y: 60, r: 21, color: '#64748b', icon: Globe, moons: ['RAG', 'Claude'] },
  'moid.co.kr': { name: 'MOID', hub: 'aws', x: 800, y: 110, r: 27, color: '#f43f5e', icon: Heart, moons: ['S3', 'Prisma'] },
};

const hubOf = (id: string) => hubs.find((h) => h.id === id)!;
const live = 'rgb(var(--live))';
const down = 'rgb(var(--down))';

function Moons({ p }: { p: Planet }) {
  // 위성(쓰는 기술): 행성 옆(중심 반대쪽)에 세로로 쌓음 — 아래 이름표와 겹치지 않게
  const side = p.x >= ME.x ? 1 : -1;
  return (
    <>
      {p.moons.map((m, k) => {
        const x = p.x + side * (p.r + 26);
        const y = p.y - (p.moons.length - 1) * 9 + k * 18;
        return (
          <g key={m} opacity={0.9}>
            <line x1={p.x + side * (p.r + 4)} y1={p.y} x2={x} y2={y} stroke="rgb(var(--line))" strokeWidth="0.8" />
            <circle cx={x} cy={y} r="3" fill={p.color} />
            <text x={x + side * 7} y={y + 4} textAnchor={side > 0 ? 'start' : 'end'} className="fill-sub text-[17px] sm:text-[10.5px]">
              {m}
            </text>
          </g>
        );
      })}
    </>
  );
}

export default function ServiceMap({ services, photo }: { services: ServiceStatus[] | null; photo: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const byHost = new Map((services ?? []).map((s) => [s.host, s]));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full max-w-[880px] overflow-visible" role="img" aria-label="직접 운영 중인 서비스 구성도">
      <defs>
        <radialGradient id="halo">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0" />
        </radialGradient>
        {Object.entries(planets).map(([host, p]) => (
          <radialGradient key={host} id={`pl-${host.replace(/\W/g, '')}`} cx="35%" cy="30%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="35%" stopColor={p.color} stopOpacity="0.95" />
            <stop offset="100%" stopColor={p.color} stopOpacity="0.55" />
          </radialGradient>
        ))}
        <clipPath id="me">
          <circle cx={ME.x} cy={ME.y} r="36" />
        </clipPath>
      </defs>

      {/* 궤도 두 겹 */}
      <ellipse cx={ME.x} cy={ME.y} rx="190" ry="150" fill="none" stroke="rgb(var(--line))" strokeDasharray="2 6" />
      <ellipse cx={ME.x} cy={ME.y} rx="370" ry="215" fill="none" stroke="rgb(var(--line))" strokeDasharray="2 8" opacity="0.7" />
      <circle cx={ME.x} cy={ME.y} r="100" fill="url(#halo)" />

      {/* 나 → 허브 */}
      {hubs
        .filter((h) => h.id !== 'db')
        .map((h) => (
          <line key={h.id} x1={ME.x} y1={ME.y} x2={h.x} y2={h.y} stroke="rgb(var(--accent))" strokeOpacity="0.35" strokeWidth="1.2" />
        ))}
      <line x1={hubOf('monsil').x} y1={hubOf('monsil').y} x2={hubOf('db').x} y2={hubOf('db').y} stroke="rgb(var(--sub))" strokeOpacity="0.35" strokeDasharray="3 4" />

      {/* 허브 → 서비스, 서비스 → DB */}
      {Object.entries(planets).map(([host, p]) => {
        const s = byHost.get(host);
        const up = s?.up ?? true;
        const h = hubOf(p.hub);
        const on = hover === host;
        const db = hubOf('db');
        return (
          <g key={`l-${host}`}>
            <line x1={h.x} y1={h.y} x2={p.x} y2={p.y} stroke={up ? live : down} strokeOpacity={on ? 0.7 : 0.25} strokeWidth={on ? 1.6 : 1} />
            {p.db && <line x1={p.x} y1={p.y} x2={db.x} y2={db.y} stroke="rgb(var(--sub))" strokeOpacity={on ? 0.45 : 0.15} strokeDasharray="3 4" />}
          </g>
        );
      })}

      {/* 요청 빛 점: 나 → 허브 → 서비스 → 허브 → 나 */}
      {!reduce &&
        Object.entries(planets).map(([host, p], i) => {
          const s = byHost.get(host);
          if (!s?.up) return null;
          const h = hubOf(p.hub);
          const dur = 1.4 + Math.min(s.ms ?? 300, 600) / 140;
          return (
            <motion.circle
              key={`pk-${host}`}
              r="3.2"
              fill={live}
              initial={{ cx: ME.x, cy: ME.y, opacity: 0 }}
              animate={{ cx: [ME.x, h.x, p.x, h.x, ME.x], cy: [ME.y, h.y, p.y, h.y, ME.y], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: dur, repeat: Infinity, repeatDelay: 0.8 + i * 0.2, delay: i * 0.45, ease: 'easeInOut' }}
            />
          );
        })}

      {/* 허브 */}
      {hubs.map((h) => {
        const Icon = h.icon;
        return (
          <g key={h.id}>
            <rect x={h.x - 52} y={h.y - 19} width="104" height="38" rx="10" fill="rgb(var(--surface))" stroke="rgb(var(--line))" />
            <Icon x={h.x - 44} y={h.y - 8} width="16" height="16" className="text-sub" />
            <text x={h.x - 22} y={h.y - 2} className="fill-fg text-[19px] font-semibold sm:text-[12px]">
              {h.label}
            </text>
            <text x={h.x - 22} y={h.y + 12} className="fill-sub text-[15px] sm:text-[9.5px]">
              {h.sub}
            </text>
          </g>
        );
      })}

      {/* 행성(서비스) */}
      {Object.entries(planets).map(([host, p], i) => {
        const s = byHost.get(host);
        const up = s?.up ?? true;
        const Icon = p.icon;
        const on = hover === host;
        return (
          <a key={host} href={`https://${host}`} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHover(host)} onMouseLeave={() => setHover(null)}>
            <motion.g
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={{ duration: 4.5 + i * 0.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ cursor: 'pointer' }}
            >
              <Moons p={p} />
              {p.ring && <ellipse cx={p.x} cy={p.y} rx={p.r + 14} ry={(p.r + 14) * 0.32} fill="none" stroke={p.color} strokeOpacity="0.6" strokeWidth="2" transform={`rotate(-18 ${p.x} ${p.y})`} />}
              <circle cx={p.x} cy={p.y} r={p.r + 4} fill="none" stroke={up ? live : down} strokeWidth={on ? 2.2 : 1.4} strokeOpacity={on ? 1 : 0.8} />
              <circle cx={p.x} cy={p.y} r={p.r} fill={`url(#pl-${host.replace(/\W/g, '')})`} />
              <Icon x={p.x - p.r * 0.45} y={p.y - p.r * 0.45} width={p.r * 0.9} height={p.r * 0.9} color="#fff" strokeWidth={2} />
              <text x={p.x} y={p.y + p.r + 22} textAnchor="middle" className="fill-fg text-[22px] font-semibold sm:text-[13px]">
                {p.name}
              </text>
              <text x={p.x} y={p.y + p.r + 38} textAnchor="middle" className={`text-[18px] sm:text-[11px] ${up ? 'fill-sub' : 'fill-down'}`}>
                {s ? (up ? `응답 ${s.ms}ms` : '응답 없음') : '확인 중'}
              </text>
            </motion.g>
          </a>
        );
      })}

      {/* 가운데: 나 */}
      <circle cx={ME.x} cy={ME.y} r="40" fill="rgb(var(--bg))" stroke="rgb(var(--accent))" strokeOpacity="0.5" />
      <image href={photo} x={ME.x - 36} y={ME.y - 36} width="72" height="72" clipPath="url(#me)" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
