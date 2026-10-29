'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import SectionTitle from '../components/SectionTitle';
import { getCareerDurations } from '../lib/portfolio-data';

const Career = () => {
  const { hexa, cocoa, total: totalDuration } = getCareerDurations();

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
          <SectionTitle suffix={
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-sm sm:text-base text-slate-500 ml-6"
            >
              총 경력 {totalDuration}
            </motion.span>
          }>
            CAREER
          </SectionTitle>

          {/* 코코아소프트 */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-50 p-2 shadow-md ring-4 ring-slate-100">
                <Image
                  src="/images/company/cocoa.png"
                  alt="코코아소프트"
                  fill
                  loading="lazy"
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">코코아소프트</h3>
                  <p className="text-sm sm:text-base text-teal-600 font-semibold ml-2">책임연구원</p>
                </div>
                <p className="text-sm sm:text-base text-slate-500 mb-4">2025.06.16 - 현재 ({cocoa.formatted})</p>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                      AI센터에서 대기업 그룹사 8개 계열사의 RPA 900여 과제를 단독으로 운영하고,
                      RPA 개발자 중심 조직에서 사내 웹앱 개발과 서버 관리를 전담하고 있습니다.
                      LLM 기반 RAG 챗봇, n8n 업무 자동화, MCP 기반 시스템 등 AI를 실무에 적용하고 있습니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-slate-600 font-medium">
                      {[
                        '그룹사 8개 계열사 RPA 900여 과제 단독 운영',
                        '공통 모듈 표준화로 월 장애 90건 → 10건',
                        '그룹웨어 전면 전환 대응 — 메일·DRM 모듈 신규 개발',
                        '사내 웹앱 개발 및 서버 관리 전담',
                        'n8n + LLM 기반 RAG 챗봇·업무 자동화',
                        'MCP 기반 UiPath 구동 시스템 설계 및 개발',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HEXAVEIL */}
          <div className="bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-50 p-2 shadow-md ring-4 ring-slate-100">
                <Image
                  src="/images/company/hexaveil_logo.png"
                  alt="HEXAVEIL"
                  fill
                  loading="lazy"
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900">HEXAVEIL</h3>
                  <p className="text-sm sm:text-base text-teal-600 font-semibold ml-2">주임연구원</p>
                </div>
                <p className="text-sm sm:text-base text-slate-500 mb-4">2023.03.27 - 2025.05.16 ({hexa.formatted})</p>
                <div className="space-y-6">
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                      웹·앱 풀스택 개발자로 커머스 서비스의 백엔드 API부터 웹 프론트엔드, 모바일 앱까지 개발했습니다.
                      결제·본인인증 연동과 한국어·베트남어 다국어 서비스를 다뤘고,
                      Docker·Kubernetes 환경에서 CI/CD로 배포했습니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-slate-600 font-medium">
                      {[
                        'Kotlin · Spring Boot, Django 기반 백엔드 API 개발',
                        '커머스 서비스 PG 결제 및 본인인증 연동',
                        'Flutter 모바일 앱(Android · iOS) 개발',
                        'React · Next.js 웹 프론트엔드 개발',
                        '한국어 · 베트남어 다국어(i18n) 서비스',
                        'Docker · Kubernetes 환경, GitHub Actions · TeamCity 배포',
                      ].map((item, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-600 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Career;
