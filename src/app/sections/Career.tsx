'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const formatDuration = (years: number, months: number): string => {
  if (years === 0 && months === 0) return '';
  if (years === 0) return `${months}개월`;
  if (months === 0) return `${years}년`;
  return `${years}년 ${months}개월`;
};

const calculateDuration = (startDate: Date, endDate: Date) => {
  const diff = Math.abs(endDate.getTime() - startDate.getTime());
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  
  // 더 정확한 년/월 계산
  const years = Math.floor(days / 365);
  const remainingDays = days % 365;
  const months = Math.floor(remainingDays / 30.44); // 평균 월 일수로 계산
  
  return { days, years, months, formatted: formatDuration(years, months) };
};

const Career = () => {
  const hexa = calculateDuration(new Date('2023-03-27'), new Date('2025-05-16'));
  const cocoa = calculateDuration(new Date('2025-06-16'), new Date());

  const totalDays = hexa.days + cocoa.days;
  const totalYears = Math.floor(totalDays / 365);
  const totalMonths = Math.floor((totalDays % 365) / 30);
  const totalDuration = formatDuration(totalYears, totalMonths);

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <div className="w-full">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-left text-white overflow-hidden flex items-end">
          <div className="flex items-end">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="text-blue-400 text-xl sm:text-2xl mr-2"
            >
              {'//'}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              CAREER
            </motion.span>
          </div>

          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm sm:text-base text-gray-400 ml-6"
          >
            총 경력 {totalDuration}
          </motion.span>
        </h2>

          {/* 코코아소프트 경력 */}
          <div className="glass p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl overflow-hidden mb-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 shadow-xl">
                <Image
                  src="/images/company/cocoa.png"
                  alt="코코아소프트"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">코코아소프트</h3>
                  <p className="text-sm sm:text-base text-blue-400 font-semibold ml-2">선임연구원</p>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4">2025.06.16 - 현재 ({cocoa.formatted})</p>
                <div className="space-y-8">
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                      AI센터에서 UiPath 기반 RPA 자동화 시스템 개발 및 운영을 담당하고 있습니다. 
                      현재는 MCP(Model Context Protocol) 기반 UiPath 구동 시스템을 개발 중이며, 
                      외부 운영 기업의 RPA 기술 지원 및 장애 대응 업무를 수행하고 있습니다.
                    </p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-300 font-medium">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        MCP 기반 UiPath 구동 시스템 설계 및 개발
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        UiPath Studio를 활용한 업무 자동화 프로세스 개발
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        UiPath Orchestrator를 통한 로봇 관리 및 모니터링
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        외부 운영사 RPA 기술 지원 및 장애 대응
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        RPA 프로세스 최적화 및 성능 개선
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        AI/ML 기술과 RPA 연동 시스템 구축
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HEXAVEIL 경력 */}
          <div className="glass p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 shadow-xl">
                <Image
                  src="/images/company/hexaveil_logo.png"
                  alt="HEXAVEIL"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">HEXAVEIL</h3>
                  <p className="text-sm sm:text-base text-blue-400 font-semibold ml-2">주임연구원</p>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4">2023.03.27 - 2025.05.16 ({hexa.formatted})</p>
                <div className="space-y-8">
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                      Flutter 기반 모바일 앱부터 React 기반 웹 프론트엔드, Django 및 Spring Boot를 활용한 백엔드 API 개발,
                      CI/CD 자동화, 클라우드 인프라 운영까지 전방위로 담당했습니다.
                    </p>
                  </div>
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm sm:text-base text-gray-300 font-medium">
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        Flutter/Android/iOS 앱 설계 및 구현
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        Next.js 기반 웹 프론트엔드 개발
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        Firebase, Django, Spring Boot 백엔드 구축
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        Docker, GitHub Actions, TeamCity 기반 배포 자동화
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        AWS 환경에서 인프라 및 DB 운영 (MariaDB)
                      </li>
                      <li className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0"></span>
                        디자인 협업 및 UI/UX 개선 (Figma, Zeplin)
                      </li>
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
