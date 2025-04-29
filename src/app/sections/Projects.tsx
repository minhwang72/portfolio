'use client';

import { motion } from 'framer-motion';

const Projects: React.FC = () => {
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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2 className="section-title">Projects</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.title}
              className="project-card"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-accent-color/20"></div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-text-color">{project.title}</h3>
              <p className="text-text-color mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="tech-tag"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex gap-4">
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
        </motion.div>
      </div>
    </div>
  );
};

export default Projects; 