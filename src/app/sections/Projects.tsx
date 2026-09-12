'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SectionTitle from '../components/SectionTitle';

interface Project {
  title: string;
  description: string;
  tags: string[];
  github: string;
  demo?: string;
  isPrivate?: boolean;
  badge?: string;
}

const projects: Project[] = [
  {
    title: "CONTI",
    description: "악보 키 변환 및 셋리스트 관리 도구. Gemini AI로 악보 이미지에서 코드·가사를 자동 추출하고 음악 이론 기반으로 원하는 키로 변환 후 악보를 재생성합니다. 드래그 앤 드롭 셋리스트 관리와 PNG/PDF/DOCX 내보내기를 지원합니다.",
    tags: ["Next.js", "TypeScript", "Google Gemini AI", "DnD Kit", "Shadcn UI"],
    github: "https://github.com/minhwang72/conti",
    demo: "https://conti.eungming.com"
  },
  {
    title: "뮤직시트 (MuT)",
    description: "악보 이미지를 넣으면 키가 변환된 새 악보를 돌려주는 서비스. CV(컴퓨터 비전)로 오선·코드 박스를 검출하고 AI로 코드를 판독한 뒤 키 변환 코어 엔진으로 재생성합니다. 코드 재현율 100%, 정밀도 98%.",
    tags: ["Python", "OpenCV", "Claude API", "Next.js", "TypeScript"],
    github: "https://github.com/minhwang72/conti",
    isPrivate: true,
    badge: "개발 중"
  },
  {
    title: "Balance Desk",
    description: "KIS Open API 기반 ISA 포트폴리오 대시보드. 실시간 잔고·수익률·자산 배분 현황을 시각화하고, 목표 비중 대비 드리프트 알림, 거래 내역 원장, 매매 API까지 통합한 개인 자산관리 도구입니다.",
    tags: ["Next.js", "TypeScript", "KIS Open API", "MCP", "MySQL", "Docker"],
    github: "https://github.com/minhwang72/isa-portal",
    demo: "https://stock.eungming.com",
    isPrivate: true
  },
  {
    title: "CBT 학습 플랫폼",
    description: "정보처리기사 필기 기출문제 CBT 서비스. 2020~2025년 전 회차 문제를 파싱·정제하여 DB에 적재하고, 랜덤 출제·오답 노트·회차별 풀기를 지원하는 학습 플랫폼입니다.",
    tags: ["Next.js", "TypeScript", "Prisma", "MySQL", "Docker"],
    github: "https://github.com/minhwang72/cbt",
    demo: "https://cbt.eungming.com",
    isPrivate: true
  },
  {
    title: "MOID",
    description: "모바일 청첩장 SaaS MVP. 블록형 빌더로 청첩장을 만들고 공개 URL로 공유합니다. 로그인 전 무료 시안 빌더, 결제 전 워터마크 정책, RSVP 저장 API, GitHub Actions CI/CD를 갖춘 프로덕션 준비 구조입니다.",
    tags: ["Next.js", "TypeScript", "Prisma", "AWS S3", "GitHub Actions"],
    github: "https://github.com/minhwang72/moid",
    isPrivate: true,
    badge: "개발 중"
  },
  {
    title: "오늘운",
    description: "앱인토스 미니앱 · 사주 기반 일일 운세. 생년월일로 사주 원국을 계산하고 오늘 날짜와의 관계로 운세를 산출합니다. 개인정보 보호를 위해 사주 계산은 전량 클라이언트에서 처리하며 서버로 전송하지 않습니다.",
    tags: ["React", "TypeScript", "앱인토스", "사주 알고리즘"],
    github: "https://github.com/hwangmins/oneulun",
    isPrivate: true
  },
  {
    title: "KAIROS",
    description: "NPC들이 스스로 살아가고 성장하는 지속형 세계 시뮬레이션 게임. LLM 기반 NPC 인지 시스템, 틱 루프 엔진, 경제·정치·사회 시뮬레이션을 설계 중입니다. 유저는 그 세계에 들어가 NPC의 삶에 개입하는 참여자입니다.",
    tags: ["Next.js", "TypeScript", "Claude API", "Docker", "시뮬레이션"],
    github: "https://github.com/minhwang72/kairos",
    isPrivate: true,
    badge: "기획 중"
  },
  {
    title: "웨딩 초대장 시리즈",
    description: "지인들의 결혼식을 위해 제작한 모바일 청첩장 시리즈 (4개). 카카오맵 연동, 계좌 복사, 방명록, 사진 갤러리 등을 포함한 맞춤 제작 웹 청첩장입니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "카카오맵 API"],
    github: "https://github.com/minhwang72/monsil-invitation",
    demo: "https://taetaecouple.eungming.com"
  },
  {
    title: "포트폴리오",
    description: "현재 보고 계신 개인 포트폴리오 웹사이트. Gemini AI 기반 RAG 챗봇, Framer Motion 스크롤 애니메이션, 다크/라이트 모드를 지원합니다.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Gemini AI"],
    github: "https://github.com/minhwang72/portfolio",
    demo: "https://pf.eungming.com",
    badge: "현재 페이지"
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
          <SectionTitle>PROJECTS</SectionTitle>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 items-stretch">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center justify-between flex-wrap gap-2">
                    <span className="flex items-center gap-2">
                      {project.title}
                      {project.isPrivate && (
                        <span className="px-2 py-0.5 rounded text-xs bg-slate-100 text-slate-500 font-normal">🔒 비공개</span>
                      )}
                    </span>
                    {project.badge && (
                      <span className="px-3 py-1 rounded-full bg-teal-50 text-xs text-teal-600 font-medium">{project.badge}</span>
                    )}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 mb-6 whitespace-pre-line">{project.description}</p>
                </div>
                <div className="mt-auto">
                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1 text-xs sm:text-sm rounded-full bg-slate-100 text-slate-600 font-medium"
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
                      className="text-slate-500 hover:text-teal-600 transition-colors duration-300"
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
                        className="text-slate-500 hover:text-teal-600 transition-colors duration-300"
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
