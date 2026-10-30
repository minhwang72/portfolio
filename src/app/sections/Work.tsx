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
      <SectionHead
        no="02"
        label="operations case"
        title="RPA 900개 과제를 혼자 운영하기"
        desc="대기업 그룹사 8개 계열사의 RPA를 UiPath 경험 없이 입사해 1개월 만에 단독으로 넘겨받았습니다. 고객사 이름은 밝히지 않습니다."
      />
      <div className="grid gap-px overflow-hidden rounded-xl border border-line bg-line md:grid-cols-3">
        <div className="bg-panel p-6">
          <p className="font-mono text-xs text-accent">문제</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">과제마다 제각각인 예외처리 때문에 한 달 장애가 90건. 그룹웨어 전면 전환으로 메일·DRM 모듈이 막혀 전 계열사 과제가 멈출 위기.</p>
        </div>
        <div className="bg-panel p-6">
          <p className="font-mono text-xs text-accent">접근</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">공통 모듈을 표준화하고 예외처리를 보강, UiPath 23.10 → 24로 올려 반복 장애를 없앰. 막힌 메일·DRM 모듈은 새로 개발.</p>
        </div>
        <div className="bg-panel p-6">
          <p className="font-mono text-xs text-accent">결과</p>
          <p className="mt-3 text-sm leading-relaxed text-mute">
            월 장애 <span className="font-mono text-live">90 → 10건</span>. 그룹웨어 전환 약 1개월 만에 전 계열사 과제 정상화. 지금은 n8n·LLM·MCP로 운영 자동화를 넓히는 중.
          </p>
        </div>
      </div>

      <div id="work" className="mt-20 scroll-mt-20">
        <SectionHead no="03" label="side projects" title="직접 만들고 운영하는 것들" />
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
