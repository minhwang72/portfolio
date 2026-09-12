'use client';

import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { certifications } from '../lib/portfolio-data';

const Certifications = () => {
  return (
    <div className="w-full py-12 sm:py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="w-full"
      >
        <SectionTitle>CERTIFICATIONS</SectionTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-teal-600" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {cert.name}
                  </h3>
                  <p className="text-sm text-teal-600 font-semibold mt-1">{cert.issuer}</p>
                </div>
              </div>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed mt-5 flex-1">
                {cert.description}
              </p>

              <div className="flex items-center justify-between gap-4 mt-6 pt-5 border-t border-slate-100">
                <span className="text-sm text-slate-500">
                  {cert.issued} 취득
                  {cert.expires && ` · ${cert.expires} 만료`}
                </span>
                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 hover:text-teal-700 transition-colors"
                  >
                    인증 확인
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Certifications;
