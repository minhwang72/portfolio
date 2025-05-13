'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.8, 1]);
  const y = useTransform(scrollYProgress, [0, 0.2], [20, 0]);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.2,
        ease: "easeOut"
      }
    }
  };

  const skills = [
    {
      category: "Language",
      items: [
        { name: 'Dart', badge: 'https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white' },
        { name: 'Java', badge: 'https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=java&logoColor=white' },
        { name: 'JavaScript', badge: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black' },
        { name: 'Kotlin', badge: 'https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white' },
        { name: 'Python', badge: 'https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white' },
        { name: 'TypeScript', badge: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white' },
      ]
    },
    {
      category: "Frontend",
      items: [
        { name: 'Flutter', badge: 'https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white' },
        { name: 'Next.js', badge: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white' },
        { name: 'React', badge: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black' },
        { name: 'Tailwind CSS', badge: 'https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white' },
      ]
    },
    {
      category: "Backend",
      items: [
        { name: 'Django', badge: 'https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white' },
        { name: 'Firebase', badge: 'https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black' },
        { name: 'MariaDB', badge: 'https://img.shields.io/badge/MariaDB-003545?style=for-the-badge&logo=mariadb&logoColor=white' },
        { name: 'MySQL', badge: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white' },
        { name: 'Spring Boot', badge: 'https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white' },
        { name: 'Supabase', badge: 'https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white' },
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
        { name: 'Android Studio', badge: 'https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white' },
        { name: 'Cursor', badge: 'https://img.shields.io/badge/Cursor-000000?style=for-the-badge&logo=cursor&logoColor=white' },
        { name: 'Figma', badge: 'https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white' },
        { name: 'IntelliJ IDEA', badge: 'https://img.shields.io/badge/IntelliJ_IDEA-000000?style=for-the-badge&logo=intellij-idea&logoColor=white' },
        { name: 'VS Code', badge: 'https://img.shields.io/badge/VS_Code-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white' },
        { name: 'Zeplin', badge: 'https://img.shields.io/badge/Zeplin-FFAE00?style=for-the-badge&logo=zeplin&logoColor=white' },
      ]
    },
  ];

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
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-white overflow-hidden">
            <motion.span 
              initial="hidden"
              animate="visible"
              variants={titleVariants}
              className="text-blue-400 text-lg sm:text-xl mr-2"
            >
              {'//'}
            </motion.span>
            <motion.span
              initial="hidden"
              animate="visible"
              variants={contentVariants}
            >
              SKILLS
            </motion.span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {skills.map((group) => (
              <div key={group.category} className="glass p-4 sm:p-6 lg:p-8 rounded-2xl">
                <h3 className="text-lg sm:text-xl font-semibold mb-6 sm:mb-8 text-white">{group.category}</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  {group.items.map((skill) => (
                    <Image
                      key={skill.name}
                      src={skill.badge}
                      alt={skill.name}
                      width={200}
                      height={80}
                      unoptimized
                      className="h-12 sm:h-16 lg:h-20 object-contain hover:scale-105 transition-transform duration-300"
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
