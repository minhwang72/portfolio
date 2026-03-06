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

          <div className="glass p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl overflow-hidden">
            <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center">
              <div className="flex justify-center md:justify-start w-full md:w-auto">
                <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden shadow-2xl">
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
                      className={`flex items-start gap-3 text-gray-200 hover:text-blue-400 transition-colors duration-300 ${
                        info.long ? 'col-span-2 sm:col-span-1' : ''
                      }`}
                    >
                      <div className="text-blue-400 mt-1 flex-shrink-0">
                        {info.icon}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <div className="text-xs sm:text-sm text-gray-400">{info.label}</div>
                        <div className={`text-sm sm:text-base font-semibold ${
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
                    className="text-xl sm:text-2xl font-bold text-white text-left"
                  >
                    안녕하세요, 풀스택 개발자 황민입니다.
                  </motion.h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {[
                      "기술을 배우는 데 그치지 않고, 실제 서비스에 적용하며 성장하는 개발자입니다.",
                      "새로운 기술을 적극적으로 탐구하고, 문제를 직접 해결해나가는 과정에서 가장 큰 보람을 느낍니다.",
                      "풀스택 개발은 물론, RPA 자동화 업무도 함께 수행하며 다양한 방식의 문제 해결 경험을 쌓고 있습니다."
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        initial="hidden"
                        animate="visible"
                        variants={contentVariants}
                        className="hover:text-blue-400 transition-colors duration-300 break-words"
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
