'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "개발자 블로그",
    description: "Next.js 14와 TypeScript로 구축한 개인 개발 블로그입니다. Drizzle ORM과 MySQL을 사용한 데이터베이스 관리, 관리자 대시보드, 댓글 시스템, Google AdSense 연동, 다크모드 등 완전한 블로그 기능을 제공합니다. 티스토리와 차별화된 독특한 레이아웃과 모던한 디자인을 적용했습니다.",
    tags: ["Next.js 14", "TypeScript", "MySQL", "Drizzle ORM", "Tailwind CSS"],
    github: "https://github.com/minhwang72/blog",
    demo: "https://www.eungming.com"
  },
  {
    title: "MCP 서버",
    description: "Model Context Protocol을 구현한 AI 도구 서버입니다. 블로그 관리를 위한 AI 도구들을 제공하며, HTTP/STDIO 전송을 지원합니다. Docker 컨테이너화, 자동 배포, API 키 인증, CORS 보안 등 프로덕션 환경에 필요한 모든 기능을 포함합니다. GitHub Actions를 통한 1분 내 자동 배포가 가능합니다.",
    tags: ["TypeScript", "MCP Protocol", "Docker", "GitHub Actions", "API"],
    github: "https://github.com/minhwang72/mcp",
    demo: "https://mcp.eungming.com"
  },
  {
    title: "모바일 청첩장",
    description: "Next.js 기반의 개인 모바일 청첩장 웹사이트입니다. App Router와 Tailwind CSS로 UI를 구성하고, Next.js API Routes를 통해 방명록, 이미지 업로드, 초대장, 관리자 페이지 등의 기능을 제공합니다. 전체 기획 및 개발을 직접 수행한 개인 프로젝트입니다.",
    tags: ["Next.js", "Tailwind CSS", "Next.js API Routes"],
    github: "https://github.com/minhwang72/monsil-invitation",
    demo: "https://monsil.eungming.com"
  },
  {
    title: "포트폴리오",
    description: "Next.js와 TypeScript를 기반으로 한 개인 포트폴리오 웹사이트. Framer Motion을 활용한 부드러운 애니메이션과 반응형 디자인을 구현했습니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    github: "https://github.com/minhwang72/portfolio"
  }
];

const Projects = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-full">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8 sm:mb-12 text-left text-white overflow-hidden flex items-center">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 text-lg sm:text-xl mr-2"
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass p-6 sm:p-8 lg:p-10 rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 flex items-center justify-between">
                    {project.title}
                    {project.title === "포트폴리오" && (
                      <span className="px-3 py-1 rounded-full bg-blue-600 text-xs text-white align-middle">현재 페이지</span>
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-300 mb-6 whitespace-pre-line">{project.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs sm:text-sm rounded-full bg-blue-600/20 text-blue-400"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-4 pt-2">
                    <Link
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </Link>
                    {project.demo && (
                      <Link
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-white transition-colors duration-300"
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </Link>
                    )}
                  </div>
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
