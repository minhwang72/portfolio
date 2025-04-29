'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  // 스크롤 위치에 따른 투명도 변화
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 0, 1]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollTop > windowHeight);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      style={{ opacity }}
      className="fixed bottom-8 right-8 p-3 bg-gray-800/50 rounded-full text-text-color hover:bg-gray-800/70 transition-colors z-50"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <ChevronUp className="w-6 h-6" />
    </motion.button>
  );
};

export default ScrollToTop; 