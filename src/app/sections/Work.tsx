'use client';

import { ArrowUpRight } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { useStatus } from '../components/StatusBoard';
import { projects } from '../lib/portfolio-data';

const host = (url?: string) => (url ? new URL(url).host : '');

export default function Work() {
  const status = useStatus();
  const others = projects.slice(1); // 0번(MuT)은 대표 사례에서 따로 보여 줌

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <div id="work" className="scroll-mt-20">
        <SectionHead no="02" label="side projects" title="직접 만들고 운영하는 것들" />
        <ul className="divide-y divide-line border-y border-line">
          {others.map((p) => {
            const s = status?.services.find((x) => x.host === host(p.demo));
            return (
              <li key={p.title} className="grid gap-3 py-6 md:grid-cols-[220px_1fr_auto] md:gap-8">
                <div>
                  <h3 className="flex items-center gap-2 text-lg font-semibold text-fg">
                    {s && <span className={`h-1.5 w-1.5 rounded-full ${s.up ? 'bg-live' : 'bg-down'}`} title={s.up ? '운영 중' : '응답 없음'} />}
                    {p.title}
                  </h3>
                  {p.badge && <p className="mt-1 font-mono text-[11px] text-dim">{p.badge}</p>}
                </div>
                <div>
                  <p className="text-sm leading-relaxed text-mute">{p.description}</p>
                  <p className="mt-2 font-mono text-[11px] text-dim">{p.tags.join(' · ')}</p>
                </div>
                <div className="flex items-start gap-3 text-sm md:justify-end">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-mute hover:text-accent transition-colors">
                      {host(p.demo)} <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!p.isPrivate && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="text-dim hover:text-fg transition-colors">
                      GitHub
                    </a>
                  )}
                  {p.isPrivate && !p.demo && <span className="font-mono text-[11px] text-dim">private</span>}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
