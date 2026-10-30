import { ArrowUpRight, Award, GraduationCap } from 'lucide-react';
import SectionHead from '../components/SectionHead';
import { certifications } from '../lib/portfolio-data';

/** 자격 · 학력: 두 묶음을 나란히, 묶음마다 제목 */
export default function Certs() {
  return (
    <div className="mx-auto max-w-[1104px] px-5 pt-32 sm:pt-44">
      <SectionHead title="자격 · 학력" />
      <div className="grid gap-10 lg:grid-cols-[2fr_1fr]">
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-sub">
            <Award className="h-4 w-4" /> 자격증
          </h3>
          <div className="grid gap-5 sm:grid-cols-2">
            {certifications.map((c) => (
              <div key={c.name} className="flex flex-col rounded-[14px] border border-line bg-surface p-6">
                <p className="font-mono text-xs tracking-normal text-sub">
                  {c.issued}
                  {c.expires ? ` — ${c.expires}` : ''}
                </p>
                <h4 className="mt-2 text-lg font-bold leading-snug tracking-[-0.03em] text-fg">{c.name}</h4>
                <p className="text-sm text-sub">{c.issuer}</p>
                <p className="mt-3 flex-1 text-[14.5px] leading-relaxed text-fg/75">{c.description}</p>
                {c.url && (
                  <a href={c.url} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1 border-t border-line pt-3.5 text-[13px] font-semibold text-fg hover:underline">
                    <ArrowUpRight className="h-3.5 w-3.5" /> Credly에서 검증
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-sub">
            <GraduationCap className="h-4 w-4" /> 학력
          </h3>
          <div className="rounded-[14px] border border-dashed border-line p-6">
            <h4 className="text-lg font-bold tracking-[-0.03em] text-fg">한국방송통신대학교</h4>
            <p className="text-sm text-sub">컴퓨터과학과</p>
          </div>
        </div>
      </div>
    </div>
  );
}
