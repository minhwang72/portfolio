'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 스크롤에 따른 섹션 전환 효과
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const getTextVariants = (direction: 'left' | 'right' | 'up' | 'down') => ({
    hidden: { 
      opacity: 0,
      x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
      y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0,
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        delay: i * 0.02,
        duration: 0.5,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    })
  });

  const lines = [
    { text: "BUILDING IDEAS", align: "center", color: "text-line-1", direction: 'left' },
    { text: "INTO REALITY", align: "center", color: "text-line-2", direction: 'up' },
    { text: "FULL-STACK ENGINEER", align: "center", color: "text-line-3", direction: 'right' },
    { text: "MIN HWANG", align: "center", size: "small", color: "text-line-4", direction: 'down' }
  ];

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center overflow-hidden relative px-0 sm:px-6 lg:px-8">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto"
      >
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial="hidden"
            animate="visible"
            className="w-full flex justify-center mb-2 sm:mb-4 md:mb-8"
          >
            <div className="flex flex-wrap justify-center">
              {line.text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={getTextVariants(line.direction as 'left' | 'right' | 'up' | 'down')}
                  className={`inline-block ${line.color}`}
                  style={{
                    fontSize: line.size === "small" 
                      ? 'clamp(1.25rem, 4vw, 3.5rem)'
                      : lineIndex === 0 
                      ? 'clamp(2rem, 6vw, 7rem)' 
                      : lineIndex === 1 
                      ? 'clamp(1.75rem, 5vw, 6rem)' 
                      : 'clamp(1.5rem, 4vw, 4.5rem)',
                    fontWeight: lineIndex === 2 ? '700' : '900',
                    letterSpacing: line.size === "small" ? '-0.02em' : '-0.04em',
                    lineHeight: '1.1',
                    textTransform: 'uppercase',
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Hero;
