'use client';

import { motion } from 'framer-motion';
import { User, Calendar, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import SectionTitle from '../components/SectionTitle';
import { containerVariants, contentVariants } from '../lib/animations';

const personalInfo = [
  { icon: <User className="w-5 h-5" aria-hidden="true" />, label: '이름', value: '황민' },
  { icon: <Calendar className="w-5 h-5" aria-hidden="true" />, label: '생년월일', value: '96.10.27' },
  { icon: <MapPin className="w-5 h-5" aria-hidden="true" />, label: '위치', value: '서울시 구로구', autoSize: true },
  { icon: <Phone className="w-5 h-5" aria-hidden="true" />, label: '연락처', value: '010-3698-6181', autoSize: true },
  { icon: <Mail className="w-5 h-5" aria-hidden="true" />, label: '이메일', value: 'zxcyui6181@naver.com', long: true },
  { icon: <GraduationCap className="w-5 h-5" aria-hidden="true" />, label: '학력', value: '방송통신대학교 (컴퓨터과학과)', long: true },
];

const AboutMe = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-24">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="w-full"
      >
        <div className="w-full">
          <SectionTitle>ABOUT ME</SectionTitle>

          <div className="bg-white border border-slate-200 p-4 sm:p-6 lg:p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <div className="flex justify-center md:justify-start w-full md:w-auto">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-lg ring-4 ring-slate-100">
                  <Image
                    src="/images/profile/profile.jpeg"
                    alt="황민 프로필 사진"
                    width={192}
                    height={192}
                    className="object-cover w-full h-full object-[center_bottom] scale-125 transition-all duration-500 ease-out"
                  />
                </div>
              </div>

              <div className="flex-1 w-full">
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6 mb-8">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial="hidden"
                      animate="visible"
                      variants={contentVariants}
                      className={`flex items-start gap-3 text-slate-700 hover:text-teal-600 transition-colors duration-300 ${
                        info.long ? 'col-span-2 sm:col-span-1' : ''
                      }`}
                    >
                      <div className="text-teal-600 mt-1 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-xs sm:text-sm text-slate-400">{info.label}</div>
                        <div className={`text-sm sm:text-base font-semibold text-slate-800 ${
                          info.autoSize ? 'text-[clamp(0.75rem,2vw,1rem)]' : 'truncate'
                        }`}>
                          {info.value}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <motion.h3
                    initial="hidden"
                    animate="visible"
                    variants={contentVariants}
                    className="text-xl sm:text-2xl font-bold text-slate-900 text-left"
                  >
                    안녕하세요, Full-Stack & AI 엔지니어 황민입니다.
                  </motion.h3>
                  <div className="space-y-3 sm:space-y-4 text-slate-600 text-sm sm:text-base leading-relaxed">
                    {[
                      "웹/앱 풀스택 개발부터 AI 연동, RPA 자동화까지 폭넓은 기술 경험을 보유한 엔지니어입니다.",
                      "현재는 MCP(Model Context Protocol) 기반 AI 자동화 시스템을 설계하고, Gemini·Claude 등 LLM API를 활용한 지능형 서비스를 개발하고 있습니다.",
                      "기술을 배우는 데 그치지 않고 실제 서비스에 적용하며 성장하는 것을 지향하며, 문제를 직접 해결해나가는 과정에서 가장 큰 보람을 느낍니다."
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={contentVariants}
                        className="break-words"
                      >
                        {text}
                      </motion.p>
                    ))}
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

export default AboutMe;
