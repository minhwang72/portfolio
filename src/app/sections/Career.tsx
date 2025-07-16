'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const Career = () => {
  const startDate = new Date('2023-03-27');
  const endDate = new Date('2025-05-16');
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const years = Math.floor(diffDays / 365);
  const months = Math.floor((diffDays % 365) / 30);
  const duration = `${years}년 ${months}개월`;

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
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-12 text-left text-white overflow-hidden">
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
          </h2>

          {/* 코코아소프트 경력 먼저 */}
          <div className="glass p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl overflow-hidden mb-10">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 shadow-xl">
                <Image
                  src="/images/company/cocoa.png"
                  alt="코코아소프트"
                  width={192}
                  height={192}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">코코아소프트</h3>
                  <p className="text-sm sm:text-base text-blue-400 font-semibold ml-2">선임</p>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4">2025.06.16 - 현재</p>
                <div className="space-y-8">
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                      ai센터 / uipath rpa개발
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* HEXAVEIL 경력 아래로 */}
          <div className="glass p-6 sm:p-8 lg:p-10 rounded-3xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-white p-2 shadow-xl">
                <Image
                  src="/images/company/hexaveil_logo.png"
                  alt="HEXAVEIL"
                  width={192}
                  height={192}
                  className="object-contain rounded-full"
                />
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-end mb-1">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white">HEXAVEIL</h3>
                  <p className="text-sm sm:text-base text-blue-400 font-semibold ml-2">주임연구원 Full-Stack Developer</p>
                </div>
                <p className="text-sm sm:text-base text-gray-400 mb-4">2023.03.27 - 2025.05.16 ({duration})</p>
                <div className="space-y-8">
                  <div className="bg-gray-800/30 rounded-lg p-4 sm:p-6">
                    <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-medium">
                      Flutter 기반 모바일 앱부터 React 기반 웹 프론트엔드, Django 및 Spring Boot를 활용한 백엔드 API 개발,
                      CI/CD 자동화, 클라우드 인프라 운영까지 전방위로 담당하고 있습니다.
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
