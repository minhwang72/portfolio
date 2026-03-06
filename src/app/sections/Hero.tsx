'use client';

import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';

const Hero = () => {
  const codeLines = [
    { indent: 0, content: [{ text: 'const ', color: '#C792EA' }, { text: 'developer', color: '#82AAFF' }, { text: ' = {', color: '#E2E8F0' }] },
    { indent: 1, content: [{ text: 'name', color: '#F78C6C' }, { text: ': ', color: '#E2E8F0' }, { text: "'황민'", color: '#C3E88D' }, { text: ',', color: '#E2E8F0' }] },
    { indent: 1, content: [{ text: 'role', color: '#F78C6C' }, { text: ': ', color: '#E2E8F0' }, { text: "'Full-Stack & AI Engineer'", color: '#C3E88D' }, { text: ',', color: '#E2E8F0' }] },
    { indent: 1, content: [{ text: 'stack', color: '#F78C6C' }, { text: ': [', color: '#E2E8F0' }, { text: "'React'", color: '#C3E88D' }, { text: ', ', color: '#E2E8F0' }, { text: "'Spring'", color: '#C3E88D' }, { text: ', ', color: '#E2E8F0' }, { text: "'AI/ML'", color: '#C3E88D' }, { text: '],', color: '#E2E8F0' }] },
    { indent: 1, content: [{ text: 'passion', color: '#F78C6C' }, { text: ': ', color: '#E2E8F0' }, { text: "'기술과 AI로 문제를 해결하다'", color: '#C3E88D' }] },
    { indent: 0, content: [{ text: '};', color: '#E2E8F0' }] },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Left - Editorial intro */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-sm font-medium tracking-widest text-teal-600 uppercase mb-4"
          >
            Full-Stack & AI Engineer
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.05] mb-6"
          >
            HWANG
            <br />
            <span className="text-teal-600">MIN</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="w-16 h-0.5 bg-teal-600 mb-6 origin-left"
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-base sm:text-lg text-slate-500 leading-relaxed mb-8 max-w-md"
          >
            풀스택 개발부터 AI 자동화까지,
            <br />
            기술로 문제를 해결합니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <a
              href="https://github.com/minhwang72"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://www.linkedin.com/in/min-hwang-071b18316/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:zxcyui6181@naver.com"
              className="p-2.5 rounded-full border border-slate-200 text-slate-400 hover:text-teal-600 hover:border-teal-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>

        {/* Right - Code terminal */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="code-terminal">
            <div className="code-terminal-header">
              <div className="code-terminal-dot bg-[#FF5F56]" />
              <div className="code-terminal-dot bg-[#FFBD2E]" />
              <div className="code-terminal-dot bg-[#27C93F]" />
              <span className="text-xs text-slate-500 ml-2 font-mono">developer.ts</span>
            </div>
            <div className="code-terminal-body">
              {codeLines.map((line, lineIndex) => (
                <motion.div
                  key={lineIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + lineIndex * 0.1, duration: 0.4 }}
                  style={{ paddingLeft: `${line.indent * 1.5}rem` }}
                >
                  {line.content.map((segment, segIndex) => (
                    <span key={segIndex} style={{ color: segment.color }}>
                      {segment.text}
                    </span>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-slate-400 font-mono tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-4 h-4 text-slate-400" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
