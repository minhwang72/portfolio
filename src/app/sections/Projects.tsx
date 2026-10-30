'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github, Lock } from 'lucide-react';
import Status from '../components/Status';
import SectionHead from '../components/SectionHead';
import { projects } from '../lib/portfolio-data';
import { useStatus } from '../lib/useStatus';

const host = (url?: string) => (url ? new URL(url).host : '');
const MONO = 'font-mono tracking-normal';

export default function Projects() {
  const status = useStatus();
  // 화면용 한 줄(line)이 있는 것만 카드로. 대표작(feature: MuT·MOID)을 앞으로
  const list = projects.filter((p) => p.line);
  list.sort((a, b) => Number(!!b.feature) - Number(!!a.feature));

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-32 sm:pt-44">
      <SectionHead
        title="프로젝트"
        note="OK · ms 는 서버가 1분마다 직접 확인한 실제 응답"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => {
          const s = status?.services.find((x) => x.host === host(p.demo));
          const tall = p.thumb?.includes('oneulun');
          const appintoss = p.tags.includes('앱인토스');
          return (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.06 }}
              className="group flex flex-col overflow-hidden rounded-[14px] border border-line bg-surface transition-colors hover:border-fg/30"
            >
              <div className={`h-[168px] overflow-hidden border-b border-line bg-bg px-[18px] pt-[18px] ${tall ? 'flex justify-center' : ''}`}>
                {p.thumb && (
                  <Image
                    src={p.thumb}
                    alt={`${p.title} 화면`}
                    width={tall ? 300 : 720}
                    height={tall ? 494 : 450}
                    className={`block border border-b-0 border-line transition-transform duration-500 group-hover:-translate-y-1 ${tall ? 'w-[104px] rounded-t-[14px]' : 'w-full rounded-t-lg'}`}
                  />
                )}
              </div>
              <div className="flex flex-1 flex-col px-5 py-[18px]">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold tracking-[-0.03em] text-fg">{p.title === 'CBT 학습 플랫폼' ? 'CBT 학습' : p.title}</h3>
                  {s ? (
                    <Status up={s.up} ms={s.ms} />
                  ) : (
                    appintoss && <span className="text-xs text-sub">앱인토스</span>
                  )}
                </div>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-fg/75">{p.line}</p>
                <p className={`mt-2.5 text-xs text-sub ${MONO}`}>{p.tags.slice(0, 3).join(' · ')}</p>
                <div className="mt-4 flex items-center gap-4 border-t border-line pt-3.5 text-[13px] font-semibold text-fg">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 hover:underline">
                      <ArrowUpRight className="h-3.5 w-3.5" /> 사이트
                    </a>
                  )}
                  {appintoss && (
                    <span className="inline-flex items-center gap-1 text-fg/80">
                      <ArrowUpRight className="h-3.5 w-3.5" /> 토스에서 보기
                    </span>
                  )}
                  {!p.isPrivate && (
                    <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:underline">
                      <Github className="h-3.5 w-3.5" /> GitHub
                    </a>
                  )}
                  {p.isPrivate && (
                    <span className="ml-auto inline-flex items-center gap-1 text-[11.5px] font-normal text-sub">
                      <Lock className="h-3 w-3" /> 비공개 저장소
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
