'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

/**
 * 섹션 연출: 들어올 때 작고 둥근 카드에서 화면 가득으로 커지고, 지나갈 때 살짝 물러남.
 * (애플 제품 페이지의 '페이지가 떠오르고 분리되는' 느낌)
 */
export default function Scene({ id, className = '', children }: { id?: string; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [0.92, 1, 1, 0.96]);
  const radius = useTransform(scrollYProgress, [0, 0.22, 0.8, 1], [40, 0, 0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.88, 1], [0.4, 1, 1, 0.6]);

  return (
    <motion.section
      ref={ref}
      id={id}
      style={reduce ? undefined : { scale, borderRadius: radius, opacity }}
      className={`relative overflow-clip ${className}`}
    >
      {children}
    </motion.section>
  );
}
