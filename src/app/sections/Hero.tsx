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
    { text: "BUILDING IDEAS", align: "start", color: "text-white", direction: 'left' },
    { text: "INTO REALITY", align: "center", color: "text-gray-200", direction: 'up' },
    { text: "FULL-STACK ENGINEER", align: "end", color: "text-gray-400", direction: 'right' },
    { text: "MIN HWANG", align: "center", color: "text-gray-100", size: "small", direction: 'down' }
  ];  

  return (
    <div ref={containerRef} className="h-screen flex items-center justify-center overflow-hidden relative px-0">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto"
      >
        {lines.map((line, lineIndex) => (
          <motion.div
            key={lineIndex}
            initial="hidden"
            animate="visible"
            className={`w-full flex ${
              line.align === "start" 
                ? "justify-start" 
                : line.align === "center" 
                ? "justify-center" 
                : "justify-end"
            } ${lineIndex === 3 ? "mt-8 sm:mt-16" : "mb-4 sm:mb-8"}`}
          >
            <div className="flex flex-wrap justify-center sm:justify-start">
              {line.text.split('').map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={getTextVariants(line.direction as 'left' | 'right' | 'up' | 'down')}
                  className={`inline-block ${line.color}`}
                  style={{
                    fontSize: line.size === "small" 
                      ? 'clamp(1.5rem, 5vw, 5rem)'
                      : lineIndex === 0 
                      ? 'clamp(2.5rem, 8vw, 10rem)' 
                      : lineIndex === 1 
                      ? 'clamp(2rem, 7vw, 9rem)' 
                      : 'clamp(1.75rem, 6vw, 7rem)',
                    fontWeight: lineIndex === 2 ? '700' : '900',
                    letterSpacing: line.size === "small" ? '-0.02em' : '-0.04em',
                    lineHeight: '1',
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
