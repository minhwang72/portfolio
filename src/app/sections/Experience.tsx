'use client';

import { motion } from 'framer-motion';
import { experience, getCareerDurations } from '../lib/portfolio-data';

export default function Experience() {
  const d = getCareerDurations();
  const dur = { cocoa: d.cocoa.formatted, hexa: d.hexa.formatted };

  return (
    <div className="mx-auto max-w-[1080px] px-5 py-28 sm:py-36">
      <p className="text-sm font-semibold text-sub">경력</p>
      <h2 className="mt-1 text-[36px] font-bold tracking-[-0.045em] text-fg sm:text-[48px]">{d.total}, 두 회사.</h2>

      <div className="mt-12 grid gap-5 lg:grid-cols-2">
        {experience.map((e, i) => (
          <motion.div
            key={e.key}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="relative overflow-hidden rounded-3xl border border-line/70 bg-bg p-8"
          >
            <span className="absolute inset-x-0 top-0 h-1" style={{ background: e.key === 'cocoa' ? 'linear-gradient(90deg,#6366f1,#8b5cf6)' : 'linear-gradient(90deg,#14b8a6,#3b82f6)' }} />
            <p className="text-sm text-sub">
              {e.period} · {dur[e.key]}
            </p>
            <h3 className="mt-2 text-[28px] font-bold tracking-[-0.035em] text-fg">{e.company}</h3>
            <p className="text-[15px] font-medium text-accent">{e.role}</p>
            <p className="mt-4 text-[15px] leading-relaxed text-sub">{e.summary}</p>
            <ul className="mt-5 space-y-2.5">
              {e.highlights.map((h) => (
                <li key={h} className="flex gap-3 text-[15px] leading-relaxed text-fg/90">
                  <span className="mt-[9px] h-1.5 w-1.5 flex-none rounded-full bg-accent" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
