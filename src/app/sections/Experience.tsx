import SectionHead from '../components/SectionHead';
import { experience, getCareerDurations } from '../lib/portfolio-data';
import { resume } from '../lib/resume';

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
              {e.key === 'hexa' && (
                <div className="mt-6">
                  <p className="text-xs font-semibold text-sub">주요 참여 프로젝트 (고객사 외주)</p>
                  <ul className="mt-2 divide-y divide-line border-y border-line">
                    {resume.jobs[1].projects?.map((p) => (
                      <li key={p.name} className="grid grid-cols-[1fr_auto] gap-x-4 py-2.5 text-[14px] sm:grid-cols-[1fr_160px_150px]">
                        <span className="font-medium text-fg">{p.name}</span>
                        <span className="hidden text-fg/70 sm:block">{p.role}</span>
                        <span className="text-right font-mono text-xs tracking-normal text-sub">{p.period}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
