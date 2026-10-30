'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Lock, Smartphone } from 'lucide-react';
import Live from '../components/Live';
import { projects } from '../lib/portfolio-data';
import { useStatus } from '../lib/useStatus';

const host = (url?: string) => (url ? new URL(url).host : '');

export default function Projects() {
  const status = useStatus();
  // 화면용 한 줄(line)이 있는 것만 카드로. 대표작(feature: MuT·MOID)을 앞으로
  const list = projects.filter((p) => p.line);
  list.sort((a, b) => Number(!!b.feature) - Number(!!a.feature));

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-28 sm:py-36">
      <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-sub">프로젝트</p>
          <h2 className="mt-1 text-[36px] font-bold tracking-[-0.045em] text-fg sm:text-[48px]">직접 만들고, 지금도 운영 중.</h2>
        </div>
        <p className="flex items-center gap-2 text-sm text-sub">
          <Live /> 서버가 1분마다 직접 확인한 실제 상태
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const s = status?.services.find((x) => x.host === host(p.demo));
          const tall = p.thumb?.includes('oneulun');
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-line/70 bg-surface"
            >
              <div className={`relative h-44 overflow-hidden ${tall ? 'flex justify-center bg-gradient-to-b from-line/40 to-surface pt-5' : ''}`}>
                {p.thumb && (
                  <Image
                    src={p.thumb}
                    alt={`${p.title} 화면`}
                    width={tall ? 300 : 720}
                    height={tall ? 494 : 450}
                    className={tall ? 'h-auto w-28 rounded-2xl shadow-lg' : 'h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]'}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="flex items-center gap-2 text-xl font-bold tracking-[-0.03em] text-fg">
                    {p.title === '포트폴리오' ? '이 사이트' : p.title}
                    {i === 0 && <span className="rounded-md bg-accent/10 px-1.5 py-0.5 text-[11px] font-semibold text-accent">대표작</span>}
                  </h3>
                  {s && (
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-xs text-sub">
                      <Live up={s.up} /> {s.up ? `${s.ms}ms` : '응답 없음'}
                    </span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-sub">{p.line}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 4).map((t) => (
                    <span key={t} className="rounded-md bg-bg px-2 py-1 text-xs text-sub">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex items-center gap-4 border-t border-line/70 pt-4 text-sm">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-medium text-accent hover:underline">
                      사이트 <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                  )}
                  {!p.isPrivate && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-fg hover:text-accent">
                      <Github className="h-4 w-4" /> GitHub
                    </a>
                  )}
                  {p.tags.includes('앱인토스') && (
                    <span className="inline-flex items-center gap-1.5 text-sub">
                      <Smartphone className="h-4 w-4" /> 토스 앱에서
                    </span>
                  )}
                  {p.isPrivate && (
                    <span className="ml-auto inline-flex items-center gap-1 text-xs text-sub">
                      <Lock className="h-3.5 w-3.5" /> 비공개 저장소
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </div>
  );
}
