'use client';

import { motion } from 'framer-motion';

const AboutMe = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-primary-color">
            About Me
          </h2>
          
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-text-color">
              안녕하세요! 저는 웹 개발자 황민입니다. 사용자 경험을 최우선으로 생각하며,
              깔끔하고 효율적인 코드를 작성하는 것을 좋아합니다.
            </p>
            
            <p className="text-lg leading-relaxed text-text-color">
              새로운 기술을 배우고 적용하는 것을 즐기며, 지속적인 성장을 추구합니다.
              팀 프로젝트에서 협업의 중요성을 잘 알고 있으며, 적극적인 커뮤니케이션을 통해
              최상의 결과물을 만들어내는 것을 목표로 합니다.
            </p>
            
            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4 text-primary-color">주요 관심사</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent-color rounded-full"></span>
                  <span className="text-text-color">웹 프론트엔드 개발</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent-color rounded-full"></span>
                  <span className="text-text-color">반응형 웹 디자인</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent-color rounded-full"></span>
                  <span className="text-text-color">사용자 경험 최적화</span>
                </li>
                <li className="flex items-center space-x-2">
                  <span className="w-2 h-2 bg-accent-color rounded-full"></span>
                  <span className="text-text-color">최신 웹 기술</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutMe; 