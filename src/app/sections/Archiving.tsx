'use client';

import { motion } from 'framer-motion';

const Archiving = () => {
  const archives = [
    {
      title: 'Blog',
      description: 'Coming soon...',
      icon: (
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
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
          />
        </svg>
      ),
    },
    {
      title: 'Notion',
      description: 'Coming soon...',
      icon: (
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466l1.823 1.447zm1.121 1.447l13.31-.98c.42-.047.42-.326.14-.42l-2.055-.14c-.28-.047-.466-.14-.7-.14l-12.15.888c-.28.047-.28.28-.14.42l1.605 1.372zm.14 1.447l13.17-1.026c.42-.047.42-.326.14-.42l-2.055-.14c-.28-.047-.466-.14-.7-.14l-12.15.888c-.28.047-.28.28-.14.42l1.605 1.372zm.14 1.447l13.17-1.026c.42-.047.42-.326.14-.42l-2.055-.14c-.28-.047-.466-.14-.7-.14l-12.15.888c-.28.047-.28.28-.14.42l1.605 1.372zm.14 1.447l13.17-1.026c.42-.047.42-.326.14-.42l-2.055-.14c-.28-.047-.466-.14-.7-.14l-12.15.888c-.28.047-.28.28-.14.42l1.605 1.372z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="archiving" className="py-20">
      <div className="w-full max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-color mb-4">Archiving</h2>
          <p className="text-text-color/80">My knowledge base and resources</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {archives.map((archive, index) => (
            <motion.div
              key={archive.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              className="bg-background-color p-6 rounded-lg border border-border-color hover:border-accent-color transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="text-accent-color">{archive.icon}</div>
                <h3 className="text-xl font-semibold text-text-color">{archive.title}</h3>
              </div>
              <p className="text-text-color/80">{archive.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Archiving; 