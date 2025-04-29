'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const Archiving = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-0">
      <div className="w-full max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl sm:text-5xl font-bold mb-12 text-left text-white">
            <span className="text-blue-400 text-xl sm:text-2xl mr-2">//</span>ARCHIVING
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-12">
            GitHub에서의 활동과 기여를 확인해보세요.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <Github size={24} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-semibold">GitHub Profile</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                GitHub 프로필에서 더 자세한 활동을 확인할 수 있습니다.
              </p>
              <a
                href="https://github.com/yourusername"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                프로필 보기
              </a>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <Github size={24} className="text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-xl font-semibold">Contributions</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                GitHub 기여 그래프에서 활동 기록을 확인할 수 있습니다.
              </p>
              <a
                href="https://github.com/yourusername"
                className="inline-block px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                기여 확인
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Archiving; 