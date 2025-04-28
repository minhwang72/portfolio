'use client';

const Skills: React.FC = () => {
  const skills = {
    frontend: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 85 },
      { name: 'Tailwind CSS', level: 90 },
    ],
    backend: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'Python', level: 75 },
      { name: 'Django', level: 70 },
    ],
    database: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'Redis', level: 75 },
    ],
    devops: [
      { name: 'Docker', level: 80 },
      { name: 'AWS', level: 75 },
      { name: 'CI/CD', level: 70 },
    ],
  };

  return (
    <section id="skills" className="min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-primary-color">
          Technical Skills
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-section-bg p-6 rounded-xl border border-border-color">
              <h3 className="text-xl font-semibold mb-6 capitalize text-primary-color">
                {category}
              </h3>
              <div className="space-y-4">
                {items.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-text-color">{skill.name}</span>
                      <span className="text-accent-color">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-subtle-color rounded-full h-2">
                      <div
                        className="bg-accent-color h-2 rounded-full transition-all duration-300"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 