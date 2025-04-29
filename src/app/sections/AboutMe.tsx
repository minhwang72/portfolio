'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { User, Calendar, MapPin, Phone, Mail, GraduationCap } from 'lucide-react';
import Image from 'next/image';

const AboutMe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [titleSize, setTitleSize] = useState('text-4xl');
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  useEffect(() => {
    const adjustTitleSize = () => {
      if (titleRef.current) {
        const width = titleRef.current.offsetWidth;
        if (width < 300) {
          setTitleSize('text-3xl');
        } else if (width < 400) {
          setTitleSize('text-4xl');
        } else {
          setTitleSize('text-5xl');
        }
      }
    };

    adjustTitleSize();
    window.addEventListener('resize', adjustTitleSize);
    return () => window.removeEventListener('resize', adjustTitleSize);
  }, []);

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [50, 0, 0, -50]);

  const personalInfo = [
    { icon: <User className="w-5 h-5" />, label: '이름', value: '황민' },
    { icon: <Calendar className="w-5 h-5" />, label: '생년월일', value: '96.10.27' },
    { icon: <MapPin className="w-5 h-5" />, label: '위치', value: '서울시 구로구' },
    { icon: <Phone className="w-5 h-5" />, label: '연락처', value: '010-3698-6181' },
    { icon: <Mail className="w-5 h-5" />, label: '이메일', value: 'zxcyui6181@naver.com' },
    { icon: <GraduationCap className="w-5 h-5" />, label: '학력', value: '방송통신대학교 (컴퓨터과학과)' },
  ];

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center px-0">
      <motion.div
        style={{ opacity, scale, y }}
        className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="max-w-5xl mx-auto">
          {/* 제목 */}
          <h2 ref={titleRef} className={`${titleSize} font-bold mb-12 text-left text-white overflow-hidden`}>
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
              ABOUT ME
            </motion.span>
          </h2>

          {/* 메인 카드 */}
          <div className="bg-gray-900/50 p-4 sm:p-6 md:p-10 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {/* 왼쪽: 프로필 사진 */}
              <div className="flex justify-center md:justify-start w-full md:w-auto">
                <div className="w-40 h-40 sm:w-52 sm:h-52 md:w-64 md:h-64 rounded-full overflow-hidden shadow-2xl">
                  <Image
                    src="/images/profile/profile.jpeg"
                    alt="Profile"
                    width={256}
                    height={256}
                    className="object-cover w-full h-full object-[center_bottom] scale-125 grayscale hover:grayscale-0 transition-all duration-500 ease-out"
                  />
                </div>
              </div>

              {/* 오른쪽: 개인정보 + 자기소개 */}
              <div className="flex-1 w-full">
                {/* 개인정보 */}
                <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
                  {personalInfo.map((info, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 text-white hover:text-accent-color transition-colors duration-300"
                    >
                      <div className="text-accent-color mt-1">
                        {info.icon}
                      </div>
                      <div className="flex flex-col">
                        <div className="text-xs sm:text-sm text-gray-400">{info.label}</div>
                        <div className="text-sm sm:text-base font-semibold break-words">{info.value}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 자기소개 */}
                <div className="space-y-4 sm:space-y-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-xl sm:text-2xl font-bold text-white text-left"
                  >
                    안녕하세요, 풀스택 개발자 황민입니다.
                  </motion.h3>
                  <div className="space-y-3 sm:space-y-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {[
                      "🚀 기술을 배우는 데 그치지 않고, 실제 서비스에 적용하며 성장하는 개발자입니다.",
                      "🛠️ 새로운 기술을 적극적으로 탐구하고, 문제를 직접 해결해나가는 과정에서 가장 큰 보람을 느낍니다.",
                      "📚 개발 경험과 배움을 블로그에 꾸준히 기록하며, 지식의 깊이를 쌓아가고 있습니다."
                    ].map((text, index) => (
                      <motion.p
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className="hover:text-accent-color transition-colors duration-300 break-words"
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
