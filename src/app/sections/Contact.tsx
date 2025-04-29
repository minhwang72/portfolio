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
      icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'Email',
      href: 'mailto:zxcyui6181@naver.com',
      color: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600',
      description: 'zxcyui6181@naver.com'
    },
    {
      icon: <Github className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'GitHub',
      href: 'https://github.com/minhwang72',
      color: 'bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700',
      description: 'github.com/minhwang72'
    },
    {
      icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/min-hwang-071b18316/',
      color: 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600',
      description: 'linkedin.com/in/min-hwang'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-left text-gray-900 dark:text-white">
            <span className="text-blue-600 dark:text-blue-400 text-lg sm:text-xl lg:text-2xl mr-2">{'//'}</span>CONTACT
          </h2>

          <div className="bg-white/50 dark:bg-gray-800/50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
              {contactButtons.map((button, index) => (
                <motion.a
                  key={index}
                  href={button.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`${button.color} p-6 sm:p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex flex-col items-center justify-center gap-4 sm:gap-6 group`}
                >
                  <div className="p-3 sm:p-4 rounded-full bg-gray-200/50 dark:bg-white/10 group-hover:bg-gray-300/50 dark:group-hover:bg-white/20 transition-colors duration-300">
                    {button.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2">{button.label}</h3>
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-300">
                      {button.description}
                    </p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Contact; 