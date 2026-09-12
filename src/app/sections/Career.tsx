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
                      AI센터에서 UiPath 기반 RPA 자동화 시스템 개발 및 운영을 담당하고 있습니다.
                      현재는 MCP(Model Context Protocol) 기반 UiPath 구동 시스템을 개발 중이며,
                      외부 운영 기업의 RPA 기술 지원 및 장애 대응 업무를 수행하고 있습니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-slate-600 font-medium">
                      {[
                        'MCP 기반 UiPath 구동 시스템 설계 및 개발',
                        'UiPath Studio를 활용한 업무 자동화 프로세스 개발',
                        'UiPath Orchestrator를 통한 로봇 관리 및 모니터링',
                        '외부 운영사 RPA 기술 지원 및 장애 대응',
                        'RPA 프로세스 최적화 및 성능 개선',
                        'AI/ML 기술과 RPA 연동 시스템 구축',
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
                      Kotlin과 Spring Boot 기반 백엔드 API 개발을 중심으로, 커머스 플랫폼을 약 2년간 운영하며
                      결제 연동과 배치 처리, 조회 부하 분산을 담당했습니다. 신규 프로젝트는 Spring Boot 3.x 기반
                      논블로킹 구조로 설계했고, 서비스 인프라의 Kubernetes 이전과 프론트엔드·모바일 앱 개발도 함께 맡았습니다.
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base text-slate-600 font-medium">
                      {[
                        'Kotlin + Spring Boot 3.x API 설계 (WebFlux · 코루틴 · R2DBC)',
                        '커머스 백엔드 운영 — PG 결제 및 본인인증 연동',
                        '배치 처리 설계 및 조회 부하 분산 (read/write 분리)',
                        'Kubernetes 이전 및 30여 개 서비스 매니페스트 운영',
                        'Docker, GitHub Actions, TeamCity 기반 배포 자동화',
                        'Flutter 앱 · Next.js 프론트엔드 · 다국어(i18n) 대응',
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
