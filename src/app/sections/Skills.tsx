'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const skills = [
    {
      category: "Language",
      items: [
        { name: 'Dart', badge: 'https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white' },
        { name: 'Java', badge: 'https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white' },
        { name: 'Kotlin', badge: 'https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white' },
        { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
        { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
        { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white' },
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white' },
        { name: 'React', badge: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black' },
        { name: 'Tailwind CSS', badge: 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white' },
        { name: 'Flutter', badge: 'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white' },
      ]
    },
    {
      category: "Backend",
      items: [
        { name: 'Spring Boot', badge: 'https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white' },
        { name: 'Django', badge: 'https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white' },
        { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' },
        { name: 'Supabase', badge: 'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white' },
        { name: 'MariaDB', badge: 'https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white' },
        { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white' },
      ]
    },
    {
      category: "DevOps",
      items: [
        { name: 'AWS', badge: 'https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazon-aws&logoColor=white' },
        { name: 'Docker', badge: 'https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white' },
        { name: 'Git', badge: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
        { name: 'GitHub Actions', badge: 'https://img.shields.io/badge/GitHub_Actions-2088FF?style=for-the-badge&logo=github-actions&logoColor=white' },
        { name: 'TeamCity', badge: 'https://img.shields.io/badge/TeamCity-000000?style=for-the-badge&logo=teamcity&logoColor=white' },
      ]
    },
    {
      category: "Tools & IDE",
      items: [
        { name: 'VS Code', badge: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white' },
        { name: 'IntelliJ IDEA', badge: 'https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white' },
        { name: 'Android Studio', badge: 'https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white' },
        { name: 'Figma', badge: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' },
        { name: 'Zeplin', badge: 'https://img.shields.io/badge/Zeplin-FFAE00?style=for-the-badge&logo=zeplin&logoColor=white' },
        { name: 'Cursor', badge: 'https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white' },
      ]
    },
  ];  

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 sm:mb-12 text-left text-white">
            <span className="text-blue-400 text-lg sm:text-xl lg:text-2xl mr-2">//</span>SKILLS
          </h2>

          <div className="bg-gray-800/50 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl flex flex-col gap-8 sm:gap-10 lg:gap-12">
            {skills.map((group) => (
              <div key={group.category}>
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-4 sm:mb-6 lg:mb-8 text-white">{group.category}</h3>
                <div className="flex flex-wrap gap-3 sm:gap-4 lg:gap-6">
                  {group.items.map((skill) => (
                    <img
                      key={skill.name}
                      src={skill.badge}
                      alt={skill.name}
                      className="h-7 sm:h-8 lg:h-10 object-contain hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Skills;
