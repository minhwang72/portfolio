'use client';

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
    <section id="projects" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-color">
          Projects
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.title} className="bg-section-bg p-6 rounded-xl border border-border-color group">
              <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-accent-color/20"></div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2 text-primary-color">{project.title}</h3>
              <p className="text-text-color mb-4">{project.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm bg-accent-color/10 text-accent-color rounded"
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
                  GitHub →
                </a>
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-text-color hover:text-accent-color transition-colors"
                >
                  Live Demo →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 