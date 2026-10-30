import SectionHead from '../components/SectionHead';
import { experience, getCareerDurations } from '../lib/portfolio-data';

/** 경력: 연도 | 회사·역할 | 한 줄 요약 */
export default function Experience() {
  const d = getCareerDurations();
  const period = (p: string) => p.replace(' ~ ', ' — ').replace('현재', '지금');

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-24 sm:pt-32">
      <SectionHead title="경력" note={`총 ${d.total}`} />
      <div>
        {experience.map((e) => (
          <div key={e.key} className="grid gap-1.5 border-b border-line py-6 sm:grid-cols-[200px_1fr] sm:gap-6">
            <span className="pt-1 font-mono text-[13px] tracking-normal text-sub">{period(e.period)}</span>
            <div>
              <h3 className="text-[22px] font-bold tracking-[-0.03em] text-fg">
                {e.company} <span className="ml-1 text-[15px] font-medium text-sub">{e.role}</span>
              </h3>
              <p className="mt-2 text-[15px] leading-[1.75] text-fg/75">{e.highlights.join(' · ')}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
