'use client';

import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BookOpen, Cloud, Database, Globe, Heart, LineChart, Music, PenLine, Server, type LucideIcon } from 'lucide-react';
import type { ServiceStatus } from '../lib/useStatus';

// 서비스 구성도 — 실제 구성 그대로(2026-10 monsil 기준):
//   나 → monsil(nginx·docker) → 뮤직시트·블로그·포트폴리오·CBT·Balance Desk, 그중 넷은 MariaDB 공유
//   나 → AWS → MOID
// 빛 점은 '나 → 허브 → 서비스 → 허브 → 나' 로 오가고, 왕복 시간은 실제 응답 속도(ms)에 비례.
// 색은 상태(초록/빨강)에만 쓰고 나머지는 무채색.
const W = 1104;
const H = 440;
const ME = { x: 552, y: 220 };

type Hub = { label: string; sub: string; x: number; y: number; icon: LucideIcon };
const hubs: Record<'monsil' | 'aws' | 'db', Hub> = {
  monsil: { label: 'monsil', sub: 'nginx · docker', x: 360, y: 220, icon: Server },
  aws: { label: 'aws', sub: 'seoul', x: 760, y: 130, icon: Cloud },
  db: { label: 'mariadb', sub: 'shared', x: 560, y: 360, icon: Database },
};

type Node = { name: string; hub: 'monsil' | 'aws'; x: number; y: number; icon: LucideIcon; tech: string; db?: boolean };
const nodes: Record<string, Node> = {
  'pf.eungming.com': { name: '포트폴리오', hub: 'monsil', x: 380, y: 52, icon: Globe, tech: 'RAG · Claude' },
  'eungming.com': { name: '블로그', hub: 'monsil', x: 230, y: 120, icon: PenLine, tech: 'WordPress', db: true },
  'conti.eungming.com': { name: '뮤직시트', hub: 'monsil', x: 230, y: 300, icon: Music, tech: 'YOLO · Claude', db: true },
  'cbt.eungming.com': { name: 'CBT', hub: 'monsil', x: 340, y: 360, icon: BookOpen, tech: 'Prisma', db: true },
  'stock.eungming.com': { name: 'Balance Desk', hub: 'monsil', x: 800, y: 350, icon: LineChart, tech: 'KIS API · Redis', db: true },
  'moid.co.kr': { name: 'MOID', hub: 'aws', x: 880, y: 120, icon: Heart, tech: 'S3 · Prisma' },
};

const C = { ink: 'rgb(var(--fg))', sub: 'rgb(var(--sub))', line: 'rgb(var(--line))', node: 'rgb(var(--surface))', live: 'rgb(var(--live))', down: 'rgb(var(--down))' };
const MONO = 'ui-monospace, SFMono-Regular, Menlo, monospace';

export default function ServiceMap({ services, photo }: { services: ServiceStatus[] | null; photo: string }) {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<string | null>(null);
  const byHost = new Map((services ?? []).map((s) => [s.host, s]));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label="직접 운영 중인 서비스 구성도">
      <defs>
        <clipPath id="me-clip">
          <circle cx={ME.x} cy={ME.y} r="34" />
        </clipPath>
      </defs>

      {/* 연결선: 나 → 허브, monsil → DB */}
      {(['monsil', 'aws'] as const).map((k) => (
        <line key={k} x1={ME.x} y1={ME.y} x2={hubs[k].x} y2={hubs[k].y} stroke={C.sub} strokeWidth="1.2" />
      ))}
      <line x1={hubs.monsil.x} y1={hubs.monsil.y} x2={hubs.db.x} y2={hubs.db.y} stroke={C.line} strokeDasharray="3 4" />

      {/* 허브 → 서비스, 서비스 → DB */}
      {Object.entries(nodes).map(([host, n]) => {
        const on = hover === host;
        const h = hubs[n.hub];
        return (
          <g key={`l-${host}`}>
            <line x1={h.x} y1={h.y} x2={n.x} y2={n.y} stroke={on ? C.ink : C.line} strokeWidth={on ? 1.4 : 1} />
            {n.db && <line x1={n.x} y1={n.y} x2={hubs.db.x} y2={hubs.db.y} stroke={C.line} strokeDasharray="3 4" />}
          </g>
        );
      })}

      {/* 요청 빛 점 */}
      {!reduce &&
        Object.entries(nodes).map(([host, n], i) => {
          const s = byHost.get(host);
          if (!s?.up) return null;
          const h = hubs[n.hub];
          const dur = 1.4 + Math.min(s.ms ?? 300, 600) / 140;
          return (
            <motion.circle
              key={`pk-${host}`}
              r="3"
              fill={C.live}
              initial={{ cx: ME.x, cy: ME.y, opacity: 0 }}
              animate={{ cx: [ME.x, h.x, n.x, h.x, ME.x], cy: [ME.y, h.y, n.y, h.y, ME.y], opacity: [0, 1, 1, 1, 0] }}
              transition={{ duration: dur, repeat: Infinity, repeatDelay: 0.8 + i * 0.2, delay: i * 0.45, ease: 'easeInOut' }}
            />
          );
        })}

      {/* 허브 */}
      {Object.entries(hubs).map(([k, h]) => {
        const Icon = h.icon;
        return (
          <g key={k}>
            <rect x={h.x - 62} y={h.y - 20} width="124" height="40" rx="8" fill={C.node} stroke={C.line} />
            <Icon x={h.x - 50} y={h.y - 8} width="16" height="16" color={C.sub} strokeWidth={1.75} />
            <text x={h.x - 28} y={h.y - 2} fontFamily={MONO} fontSize="12" fontWeight="600" fill={C.ink}>
              {h.label}
            </text>
            <text x={h.x - 28} y={h.y + 12} fontFamily={MONO} fontSize="10" fill={C.sub}>
              {h.sub}
            </text>
          </g>
        );
      })}

      {/* 서비스 노드 */}
      {Object.entries(nodes).map(([host, n]) => {
        const s = byHost.get(host);
        const up = s?.up ?? true;
        const Icon = n.icon;
        const side = n.x >= ME.x ? 1 : -1;
        const tx = n.x + side * 34;
        const on = hover === host;
        return (
          <a key={host} href={`https://${host}`} target="_blank" rel="noopener noreferrer" onMouseEnter={() => setHover(host)} onMouseLeave={() => setHover(null)}>
            <g style={{ cursor: 'pointer' }}>
              <rect x={n.x - 22} y={n.y - 22} width="44" height="44" rx="12" fill={C.node} stroke={on ? C.ink : C.line} strokeWidth={on ? 1.5 : 1} />
              <Icon x={n.x - 10} y={n.y - 10} width="20" height="20" color={C.ink} strokeWidth={1.75} />
              <circle cx={n.x + 18} cy={n.y - 18} r="4.5" fill={up ? C.live : C.down} stroke={C.node} strokeWidth="2" />
              <text x={tx} y={n.y - 3} textAnchor={side > 0 ? 'start' : 'end'} fontSize="14" fontWeight="700" fill={C.ink}>
                {n.name}
              </text>
              <text x={tx} y={n.y + 14} textAnchor={side > 0 ? 'start' : 'end'} fontFamily={MONO} fontSize="11" fill={up ? C.sub : C.down}>
                {s ? (up ? `${s.ms}ms` : '응답 없음') : '…'} · {n.tech}
              </text>
            </g>
          </a>
        );
      })}

      {/* 가운데: 나 */}
      <circle cx={ME.x} cy={ME.y} r="38" fill={C.node} stroke={C.ink} strokeWidth="1.5" />
      <image href={photo} x={ME.x - 34} y={ME.y - 34} width="68" height="68" clipPath="url(#me-clip)" preserveAspectRatio="xMidYMid slice" />
    </svg>
  );
}
