'use client';

import { motion } from 'framer-motion';

const Career: React.FC = () => {
  const experiences = [
    {
      company: 'Tech Company A',
      position: 'Senior Full Stack Developer',
      period: '2022 - Present',
      description: 'Leading the development of enterprise web applications using modern technologies.',
      achievements: [
        'Improved application performance by 40%',
        'Implemented CI/CD pipeline',
        'Mentored junior developers',
      ],
    },
    {
      company: 'Tech Startup B',
      position: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Developed and maintained multiple web applications for clients.',
      achievements: [
        'Built responsive web applications',
        'Integrated payment systems',
        'Implemented real-time features',
      ],
    },
    {
      company: 'Software Corp C',
      position: 'Frontend Developer',
      period: '2018 - 2020',
      description: 'Focused on creating user-friendly interfaces and improving user experience.',
      achievements: [
        'Developed reusable component library',
        'Reduced loading time by 50%',
        'Implemented analytics system',
      ],
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="w-full max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="section-header"
          >
            <h2 className="section-title">Career</h2>
          </motion.div>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={exp.company} className="bg-section-bg p-6 rounded-xl border border-border-color relative">
                {index !== experiences.length - 1 && (
                  <div className="absolute w-px h-full bg-accent-color/20 top-0 left-[24px]"></div>
                )}
                
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-full bg-accent-color/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-3 h-3 rounded-full bg-accent-color"></div>
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h3 className="text-xl font-semibold text-primary-color">{exp.company}</h3>
                      <span className="text-sm text-text-color">{exp.period}</span>
                    </div>
                    
                    <h4 className="text-lg text-accent-color mb-2">{exp.position}</h4>
                    <p className="text-text-color mb-4">{exp.description}</p>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement) => (
                        <li key={achievement} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-color"></span>
                          <span className="text-text-color">{achievement}</span>
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
    </div>
  );
};

export default Career; 