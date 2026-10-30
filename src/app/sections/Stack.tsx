'use client';

import { motion } from 'framer-motion';
import { Bot, Code2, Server, Smartphone } from 'lucide-react';
import { stack } from '../lib/portfolio-data';

// 같은 크기 네 칸. AI 칸만 어둡게(지금 가장 집중하는 분야)
const look: Record<string, { icon: typeof Bot; span: string; dark?: boolean }> = {
  AI: { icon: Bot, span: '', dark: true },
  Backend: { icon: Server, span: '' },
  'Frontend · App': { icon: Smartphone, span: '' },
  'Ops · Automation': { icon: Code2, span: '' },
};
const ko: Record<string, string> = { AI: 'AI', Backend: '백엔드', 'Frontend · App': '프론트엔드 · 앱', 'Ops · Automation': '운영 · 자동화' };

export default function Stack() {
  const order = ['AI', 'Backend', 'Frontend · App', 'Ops · Automation'];
  return (
    <div className="mx-auto max-w-[1080px] px-5 py-28 sm:py-36">
      <p className="text-sm font-semibold text-sub">기술</p>
      <h2 className="mt-1 text-[36px] font-bold tracking-[-0.045em] text-fg sm:text-[48px]">써 본 것 말고, 쓰고 있는 것.</h2>

      <div className="mt-12 grid auto-rows-[minmax(180px,auto)] gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {order.map((area, i) => {
          const s = stack.find((x) => x.area === area)!;
          const { icon: Icon, span, dark } = look[area];
          return (
            <motion.div
              key={area}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className={`flex flex-col justify-between rounded-3xl p-7 ${span} ${
                dark ? 'dark bg-black text-fg ring-1 ring-white/10' : 'bg-surface text-fg'
              }`}
              style={dark ? { backgroundImage: 'radial-gradient(circle at 80% 0%, rgba(41,151,255,0.35), transparent 55%)' } : undefined}
            >
              <div>
                <Icon className={`h-7 w-7 ${dark ? 'text-accent' : 'text-sub'}`} />
                <h3 className="mt-4 text-xl font-bold tracking-[-0.03em]">{ko[area]}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className={`rounded-full px-3 py-1.5 text-sm ${dark ? 'bg-white/10 text-fg' : 'bg-bg text-fg/80'}`}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
              <p className="mt-6 text-sm text-sub">→ {s.usedIn}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
