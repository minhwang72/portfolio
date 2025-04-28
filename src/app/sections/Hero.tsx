'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // 스크롤에 따른 애니메이션 값들
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 0.3], [0, 10]);

  // 각 텍스트 요소의 랜덤한 이동 방향을 위한 값들
  const textVariants = {
    initial: { opacity: 1, y: 0, x: 0 },
    scroll: (i: number) => ({
      opacity: 0,
      y: [0, -50, 100],
      x: [0, (i % 2 === 0 ? -1 : 1) * 100, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    }),
    return: (i: number) => ({
      opacity: 1,
      y: [100, -50, 0],
      x: [0, (i % 2 === 0 ? -1 : 1) * 100, 0],
      transition: {
        duration: 0.8,
        times: [0, 0.5, 1],
        ease: "easeInOut"
      }
    })
  };

  return (
    <section 
      ref={ref}
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div 
        style={{ y, opacity, scale, rotate }}
        className="container mx-auto px-6 text-center"
      >
        <motion.div
          className="space-y-8"
        >
          <motion.h1 
            custom={0}
            variants={textVariants}
            initial="initial"
            animate={scrollYProgress.get() > 0.3 ? "scroll" : "return"}
            className="text-6xl md:text-8xl font-bold text-primary-color"
          >
            Min Hwang
          </motion.h1>
          
          <motion.p 
            custom={1}
            variants={textVariants}
            initial="initial"
            animate={scrollYProgress.get() > 0.3 ? "scroll" : "return"}
            className="text-2xl md:text-4xl text-text-color/80 font-light tracking-wider"
          >
            FULL STACK DEVELOPER
          </motion.p>

          <motion.p 
            custom={2}
            variants={textVariants}
            initial="initial"
            animate={scrollYProgress.get() > 0.3 ? "scroll" : "return"}
            className="text-xl md:text-2xl text-text-color/60 max-w-2xl mx-auto font-light italic"
          >
            &ldquo;Code is poetry, and I&apos;m the poet.&rdquo;
          </motion.p>

          <motion.p 
            custom={3}
            variants={textVariants}
            initial="initial"
            animate={scrollYProgress.get() > 0.3 ? "scroll" : "return"}
            className="text-xl md:text-2xl text-text-color/60 max-w-2xl mx-auto font-light"
          >
            Crafting digital experiences that matter.
          </motion.p>
        </motion.div>

        <motion.div
          style={{ opacity }}
          className="mt-12"
        >
          <div className="animate-bounce">
            <svg 
              className="w-6 h-6 mx-auto text-text-color/60" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero; 