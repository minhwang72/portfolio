'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Mail, Github, Linkedin } from 'lucide-react';

const Contact = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 스크롤에 따른 섹션 전환 효과
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const contactButtons = [
    {
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      label: 'Email',
      href: 'mailto:zxcyui6181@naver.com',
      color: 'glass hover:bg-white/10',
      description: '이메일로 연락하기'
    },
    {
      icon: <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      label: 'GitHub',
      href: 'https://github.com/minhwang72',
      color: 'glass hover:bg-white/10',
      description: '깃허브 프로필 보기'
    },
    {
      icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/min-hwang-071b18316/',
      color: 'glass hover:bg-white/10',
      description: '링크드인 프로필 보기'
    }
  ];

  return (
    <div className="w-full py-12 sm:py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-white overflow-hidden">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 text-lg sm:text-xl mr-2"
            >
              {'//'}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CONTACT
            </motion.span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {contactButtons.map((button, index) => (
              <motion.a
                key={index}
                href={button.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`glass p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-3 sm:gap-4 group cursor-pointer`}
              >
                <div className="p-2 sm:p-3 rounded-full bg-gray-200/50 dark:bg-white/10 group-hover:bg-gray-300/50 dark:group-hover:bg-white/20 transition-colors duration-300">
                  {button.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">{button.label}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 group-hover:text-white transition-colors duration-300">
                    {button.description}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 