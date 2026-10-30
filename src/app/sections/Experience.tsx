import SectionHead from '../components/SectionHead';
import { experience, getCareerDurations } from '../lib/portfolio-data';

/** 경력: 왼쪽 기간·회사, 오른쪽 요약 + 한 일 + 쓴 기술 */
export default function Experience() {
  const d = getCareerDurations();
  const dur = { cocoa: d.cocoa.formatted, hexa: d.hexa.formatted };
  const period = (p: string) => p.replace(' ~ ', ' — ').replace('현재', '지금');

  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-32 sm:pt-44">
      <SectionHead title="경력" note={`총 ${d.total}`} />
      <div>
        {experience.map((e) => (
          <div key={e.key} className="grid gap-4 border-b border-line py-9 first:pt-2 lg:grid-cols-[280px_1fr] lg:gap-10">
            <div>
              <p className="font-mono text-[13px] tracking-normal text-sub">{period(e.period)}</p>
              <h3 className="mt-2 text-[24px] font-bold tracking-[-0.035em] text-fg">{e.company}</h3>
              <p className="mt-0.5 text-[15px] text-sub">
                {e.role} · {dur[e.key]}
              </p>
            </div>
            <div>
              <p className="text-[16px] font-medium leading-relaxed text-fg">{e.summary}</p>
              <ul className="mt-4 space-y-2">
                {e.details
                  .filter((x) => !x.includes('공개하지 않음'))
                  .map((x) => (
                    <li key={x} className="flex gap-2.5 text-[15px] leading-relaxed text-fg/75">
                      <span className="mt-[11px] h-px w-3 flex-none bg-sub" />
                      {x}
                    </li>
                  ))}
              </ul>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {e.tech.map((t) => (
                  <span key={t} className="rounded-md border border-line bg-surface px-2 py-1 font-mono text-xs tracking-normal text-fg/70">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
