import SectionHead from '../components/SectionHead';
import { stack } from '../lib/portfolio-data';

const ko: Record<string, string> = { AI: 'AI', Backend: '백엔드', 'Frontend · App': '프론트 · 앱', 'Ops · Automation': '운영' };
const order = ['AI', 'Backend', 'Frontend · App', 'Ops · Automation'];

/** 기술: 세로선으로 나눈 네 칸 */
export default function Stack() {
  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-24 sm:pt-32">
      <SectionHead title="기술" note="써 본 것 말고, 쓰고 있는 것" />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 lg:border-l lg:border-line">
        {order.map((area) => {
          const s = stack.find((x) => x.area === area)!;
          return (
            <div key={area} className="border-b border-line py-4 lg:border-b-0 lg:border-r lg:px-6 lg:py-1">
              <h3 className="text-[15px] font-bold text-fg">{ko[area]}</h3>
              <p className="mt-3 text-[15px] leading-[1.75] text-fg/75">{s.items.join(' · ')}</p>
              <p className="mt-4 text-xs leading-relaxed text-sub">{s.usedIn}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
