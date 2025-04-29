'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);

  const textVariants = {
    hidden: { 
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.3,
        duration: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
      }
    })
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen flex items-center justify-center overflow-hidden relative"
    >
      <motion.div
        style={{ y, opacity }}
        className="w-full max-w-6xl mx-auto px-4 text-center"
      >
        <motion.h1
          initial="hidden"
          animate="visible"
          custom={0}
          variants={textVariants}
          className="font-bold text-text-color mb-6"
          style={{
            fontSize: 'clamp(3rem, 10vw, 7rem)',
            lineHeight: '1.1',
            letterSpacing: '-0.02em',
          }}
        >
          Hello, I&apos;m Min
        </motion.h1>
        <motion.p
          initial="hidden"
          animate="visible"
          custom={1}
          variants={textVariants}
          className="text-text-color/80 font-normal"
          style={{
            fontSize: 'clamp(1.25rem, 3vw, 2rem)',
            lineHeight: '1.5',
            letterSpacing: '0.01em',
          }}
        >
          Creating seamless web experiences.
        </motion.p>
      </motion.div>
    </div>
  );
};

export default Hero; 