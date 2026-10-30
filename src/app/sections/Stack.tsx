import SectionHead from '../components/SectionHead';
import { stack } from '../lib/portfolio-data';

const ko: Record<string, string> = { AI: 'AI', Backend: '백엔드', 'Frontend · App': '프론트 · 앱', 'Ops · Automation': '운영' };
const order = ['Backend', 'Frontend · App', 'AI', 'Ops · Automation'];

/** 기술: 분야마다 쓰는 기술 + 그걸로 실제로 한 일 */
export default function Stack() {
  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-32 sm:pt-44">
      <SectionHead title="기술" note="써 본 것 말고, 쓰고 있는 것" />
      <div className="grid gap-5 sm:grid-cols-2">
        {order.map((area) => {
          const s = stack.find((x) => x.area === area)!;
          return (
            <div key={area} className="rounded-[14px] border border-line bg-surface p-6 sm:p-7">
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="text-lg font-bold tracking-[-0.03em] text-fg">{ko[area]}</h3>
                <span className="font-mono text-xs tracking-normal text-sub">{s.items.length} stacks</span>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.items.map((it) => (
                  <span key={it} className="rounded-md border border-line bg-bg px-2 py-1 font-mono text-xs tracking-normal text-fg/80">
                    {it}
                  </span>
                ))}
              </div>
              <ul className="mt-5 space-y-2 border-t border-line pt-4">
                {s.points.map((p) => (
                  <li key={p} className="flex gap-2.5 text-[15px] leading-relaxed text-fg/80">
                    <span className="mt-[11px] h-px w-3 flex-none bg-sub" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
