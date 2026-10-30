'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Live from '../components/Live';
import { useStatus } from '../lib/useStatus';

// 대표작 MuT. 설명·수치는 portfolio-data.ts projects[0] 과 같은 출처(mut README 실측)
const steps = [
  { k: '문제', t: 'AI에게 통째로 맡긴 악보', d: '1세대 CONTI는 악보 이미지를 Gemini에 통째로 맡겼어요. 코드는 잘 읽었지만 박자를 추측해서 자주 틀렸고, 틀린 악보도 그럴듯하게 나왔어요.' },
  { k: '접근', t: '잘하는 일만 나눠 맡기기', d: '음높이는 좌표 계산(YOLO·OpenCV), 음가·코드는 AI 판독, 이조는 직접 만든 엔진. 박자가 맞는 마디만 MusicXML로 다시 조판해요.' },
  { k: '결과', t: '727/727 · 141/141', d: '악보 4종 내부 측정에서 음높이와 코드가 모두 일치했어요. 확정할 수 없는 마디는 내보내지 않고 사용자에게 확인을 맡겨요.' },
];

export default function Featured() {
  const status = useStatus();
  const svc = status?.services.find((s) => s.host === 'conti.eungming.com');
  const [tab, setTab] = useState(0);

  return (
    <div className="mx-auto grid max-w-[1080px] items-center gap-12 px-5 py-28 sm:py-36 lg:grid-cols-[400px_1fr] lg:gap-16">
      <div>
        <p className="text-sm font-semibold text-sub">대표작</p>
        <h2 className="mt-1 text-[40px] font-bold tracking-[-0.045em] text-fg sm:text-[52px]">뮤직시트</h2>
        <p className="mt-1 text-[17px] text-sub">악보 사진을 원하는 키의 새 악보로.</p>

        <div className="mt-8 inline-flex rounded-full bg-bg p-1 ring-1 ring-line" role="tablist">
          {steps.map((s, i) => (
            <button
              key={s.k}
              role="tab"
              aria-selected={tab === i}
              onClick={() => setTab(i)}
              className={`relative rounded-full px-5 py-2 text-sm font-medium transition-colors ${tab === i ? 'text-bg' : 'text-sub hover:text-fg'}`}
            >
              {tab === i && <motion.span layoutId="mut-tab" className="absolute inset-0 rounded-full bg-fg" transition={{ type: 'spring', stiffness: 400, damping: 34 }} />}
              <span className="relative">{s.k}</span>
            </button>
          ))}
        </div>

        <div className="relative mt-6 min-h-[170px]">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
              <h3 className="text-[26px] font-bold leading-tight tracking-[-0.03em] text-fg">{steps[tab].t}</h3>
              <p className="mt-3 text-[16px] leading-relaxed text-sub">{steps[tab].d}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm">
          <a href="https://conti.eungming.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-fg px-4 py-2 font-medium text-bg">
            사이트 보기 <ArrowUpRight className="h-4 w-4" />
          </a>
          <span className="inline-flex items-center gap-2 text-sub">
            <Live up={svc?.up ?? true} />
            {svc ? (svc.up ? `운영 중 · 응답 ${svc.ms}ms` : '응답 없음') : '운영 중'}
          </span>
        </div>
        <p className="mt-4 text-xs text-sub">Python · YOLO · OpenCV · Claude API · MusicXML · 초대 계정 전용</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="overflow-hidden rounded-2xl border border-line bg-bg shadow-[0_30px_80px_rgba(0,0,0,0.12)]"
      >
        <Image src="/images/work/mut.png" alt="뮤직시트 화면" width={1440} height={900} className="h-auto w-full" />
      </motion.div>
    </div>
  );
}
