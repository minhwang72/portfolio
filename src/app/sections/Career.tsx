'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Career = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 스크롤에 따른 섹션 전환 효과
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const experiences = [
    {
      company: "Company A",
      period: "2020 - Present",
      position: "Full Stack Developer",
      description: "Description of work at Company A",
      achievements: [
        "Achievement 1",
        "Achievement 2",
        "Achievement 3"
      ]
    },
    {
      company: "Company B",
      period: "2018 - 2020",
      position: "Frontend Developer",
      description: "Description of work at Company B",
      achievements: [
        "Achievement 1",
        "Achievement 2"
      ]
    }
  ];

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-left text-white overflow-hidden">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 text-xl sm:text-2xl mr-2"
            >
              {'//'}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CAREER
            </motion.span>
          </h2>

          <div className="bg-white/50 dark:bg-gray-800/50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl overflow-hidden">
            <div className="space-y-8 overflow-hidden">
              {experiences.map((exp, index) => (
                <div key={exp.company} className="bg-gray-800/50 p-6 rounded-lg relative">
                  {index !== experiences.length - 1 && (
                    <div className="absolute w-px h-full bg-accent-color/20 top-0 left-[24px]"></div>
                  )}
                  
                  <div className="flex gap-6">
                    <div className="w-12 h-12 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0">
                      <div className="w-3 h-3 rounded-full bg-accent-color"></div>
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                        <span className="text-sm text-gray-300">{exp.period}</span>
                      </div>
                      
                      <h4 className="text-lg text-accent-color mb-2">{exp.position}</h4>
                      <p className="text-gray-300 mb-4">{exp.description}</p>
                      
                      <ul className="space-y-2">
                        {exp.achievements.map((achievement) => (
                          <li key={achievement} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent-color"></span>
                            <span className="text-gray-300">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Career; 