'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // 스크롤에 따른 섹션 전환 효과
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const projects = [
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Next.js and Tailwind CSS',
      image: '/projects/portfolio.png',
      tags: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
      links: {
        github: 'https://github.com/yourusername/portfolio',
        live: 'https://your-portfolio.com',
      },
    },
    {
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce platform with user authentication and payment integration',
      image: '/projects/ecommerce.png',
      tags: ['React', 'Node.js', 'MongoDB', 'Express'],
      links: {
        github: 'https://github.com/yourusername/ecommerce',
        live: 'https://your-ecommerce.com',
      },
    },
    {
      title: 'Task Management App',
      description: 'Real-time task management application with team collaboration features',
      image: '/projects/taskapp.png',
      tags: ['React', 'Firebase', 'Material-UI', 'Redux'],
      links: {
        github: 'https://github.com/yourusername/taskapp',
        live: 'https://your-taskapp.com',
      },
    },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-0">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
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
              PROJECTS
            </motion.span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                className="bg-gray-800/50 p-6 rounded-lg hover:bg-gray-800/70 transition-colors duration-300"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                  <div className="absolute inset-0 bg-accent-color/20"></div>
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-700/50 rounded-full text-sm text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-4 mt-4">
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-color hover:text-accent-color transition-colors"
                  >
                    <span className="terminal">GitHub →</span>
                  </a>
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-text-color hover:text-accent-color transition-colors"
                  >
                    <span className="terminal">Live Demo →</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects; 