'use client';

import { motion } from 'framer-motion';
import { titleVariants, contentVariants } from '../lib/animations';

interface SectionTitleProps {
  children: string;
  suffix?: React.ReactNode;
}

const SectionTitle = ({ children, suffix }: SectionTitleProps) => {
  return (
    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-white overflow-hidden flex items-end">
      <div className="flex items-center">
        <motion.span
          initial="hidden"
          animate="visible"
          variants={titleVariants}
          className="text-violet-400 text-lg sm:text-xl mr-2"
        >
          {'//'}
        </motion.span>
        <motion.span
          initial="hidden"
          animate="visible"
          variants={contentVariants}
        >
          {children}
        </motion.span>
      </div>
      {suffix}
    </h2>
  );
};

export default SectionTitle;
