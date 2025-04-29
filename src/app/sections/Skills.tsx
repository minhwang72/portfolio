'use client';

import { motion } from 'framer-motion';

const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'GraphQL'],
    },
    {
      category: 'DevOps',
      items: ['Docker', 'AWS', 'Git', 'CI/CD', 'Linux'],
    },
    {
      category: 'Tools',
      items: ['VS Code', 'GitHub', 'Figma', 'Postman', 'Jira'],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="section-header mb-12"
        >
          <h2 className="section-title">Skills</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="code-block p-6 rounded-lg"
            >
              <h3 className="text-xl font-bold mb-4 text-accent-color">
                {skill.category}
              </h3>
              <div className="space-y-2">
                {skill.items.map((item) => (
                  <div
                    key={item}
                    className="tech-tag"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills; 