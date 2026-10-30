'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import Live from '../components/Live';
import { useStatus } from '../lib/useStatus';

// 대표작 MuT. 설명·수치는 portfolio-data.ts projects[0] 과 같은 출처(mut README 실측)
const steps = [
  { k: '문제', t: 'AI에게 통째로 맡긴 악보', d: '1세대 CONTI는 악보 이미지를 Gemini에 통째로 맡겼어요. 코드는 잘 읽었지만 박자를 추측해서 자주 틀렸고, 틀린 악보도 그럴듯하게 나왔어요.' },
  { k: '접근', t: '잘하는 일만 나눠 맡기기', d: '음높이는 좌표 계산(YOLO·OpenCV), 음가·코드는 AI 판독, 이조는 직접 만든 엔진. 박자가 맞는 마디만 MusicXML로 다시 조판해요.' },
  { k: '결과', t: '727/727 · 141/141', d: '악보 4종 내부 측정에서 음높이와 코드가 모두 일치. 확정할 수 없는 마디는 내보내지 않고 사용자에게 확인을 맡겨요.' },
];

function Step({ s, i, progress }: { s: (typeof steps)[number]; i: number; progress: MotionValue<number> }) {
  const a = 0.15 + i * 0.25;
  const opacity = useTransform(progress, [a - 0.12, a, a + 0.2, a + 0.3], i === steps.length - 1 ? [0, 1, 1, 1] : [0, 1, 1, 0]);
  const y = useTransform(progress, [a - 0.12, a], [30, 0]);
  return (
    <motion.div style={{ opacity, y }} className="absolute inset-x-0 top-0">
      <p className="text-sm font-semibold text-accent">{s.k}</p>
      <h3 className="mt-2 text-[30px] font-bold leading-tight tracking-[-0.035em] text-fg sm:text-[40px]">{s.t}</h3>
      <p className="mt-4 text-[17px] leading-relaxed text-sub">{s.d}</p>
    </motion.div>
  );
}

export default function Featured() {
  const ref = useRef<HTMLDivElement>(null);
  const status = useStatus();
  const svc = status?.services.find((s) => s.host === 'conti.eungming.com');
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 0.35], [0.88, 1]);
  const radius = useTransform(scrollYProgress, [0, 0.35], [28, 16]);

  return (
    <div ref={ref} className="relative h-[280vh] bg-surface">
      <div className="sticky top-0 flex h-[100svh] items-center">
        <div className="mx-auto grid w-full max-w-[1080px] items-center gap-10 px-5 lg:grid-cols-[380px_1fr] lg:gap-16">
          <div>
            <p className="text-sm font-semibold text-sub">대표작</p>
            <h2 className="mt-1 text-[40px] font-bold tracking-[-0.045em] text-fg sm:text-[56px]">뮤직시트</h2>
            <p className="mt-1 text-[17px] text-sub">악보 사진을 원하는 키의 새 악보로.</p>
            <div className="relative mt-8 h-[220px]">
              {steps.map((s, i) => (
                <Step key={s.k} s={s} i={i} progress={scrollYProgress} />
              ))}
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
              <a href="https://conti.eungming.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 rounded-full bg-fg px-4 py-2 font-medium text-bg">
                사이트 보기 <ArrowUpRight className="h-4 w-4" />
              </a>
              <span className="inline-flex items-center gap-2 text-sub">
                <Live up={svc?.up ?? true} />
                {svc ? (svc.up ? `운영 중 · 응답 ${svc.ms}ms` : '응답 없음') : '운영 중'}
              </span>
            </div>
          </div>

          <motion.div style={{ scale, borderRadius: radius }} className="overflow-hidden border border-line bg-bg shadow-[0_30px_80px_rgba(0,0,0,0.15)]">
            <Image src="/images/work/mut.png" alt="뮤직시트 화면" width={1440} height={900} className="h-auto w-full" priority={false} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
