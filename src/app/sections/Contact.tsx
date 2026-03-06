'use client';

import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { containerVariants } from '../lib/animations';

const contactButtons = [
  {
    icon: <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />,
    label: 'Email',
    href: 'mailto:zxcyui6181@naver.com',
    description: '이메일로 연락하기'
  },
  {
    icon: <Github className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />,
    label: 'GitHub',
    href: 'https://github.com/minhwang72',
    description: '깃허브 프로필 보기'
  },
  {
    icon: <Linkedin className="w-5 h-5 sm:w-6 sm:h-6 text-white" aria-hidden="true" />,
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/min-hwang-071b18316/',
    description: '링크드인 프로필 보기'
  }
];

const Contact = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-24">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="w-full"
      >
        <div className="w-full">
          <SectionTitle>CONTACT</SectionTitle>

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
                className="bg-zinc-900/80 border border-zinc-800 p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:border-violet-500/30 hover:shadow-violet-500/5 flex flex-col items-center justify-center gap-3 sm:gap-4 group cursor-pointer"
              >
                <div className="p-2 sm:p-3 rounded-full bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors duration-300">
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
