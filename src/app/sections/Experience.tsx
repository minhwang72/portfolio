import Image from 'next/image';
import SectionHead from '../components/SectionHead';
import { experience, getCareerDurations } from '../lib/portfolio-data';

export default function Experience() {
  const d = getCareerDurations();
  const dur = { cocoa: d.cocoa.formatted, hexa: d.hexa.formatted };

  return (
    <div className="mx-auto max-w-6xl px-4 py-24 sm:px-6">
      <SectionHead no="03" label="experience" title={`경력 ${d.total}`} />
      <div className="grid gap-10 lg:grid-cols-[240px_1fr]">
        <div className="flex items-center gap-4 lg:flex-col lg:items-start">
          <div className="relative h-20 w-20 overflow-hidden rounded-full border border-line lg:h-28 lg:w-28">
            <Image src="/images/profile/profile.jpeg" alt="황민 프로필 사진" fill sizes="112px" className="object-cover grayscale" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-fg">황민</p>
            <p className="text-mute">서울 구로구</p>
            <p className="mt-2 text-dim">방송통신대학교 컴퓨터과학과</p>
          </div>
        </div>

        <ol className="relative space-y-12 border-l border-line pl-8">
          {experience.map((e) => (
            <li key={e.key} className="relative">
              <span className={`absolute -left-[37px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-ink ${e.key === 'cocoa' ? 'bg-live' : 'bg-dim'}`} />
              <p className="font-mono text-xs text-dim">
                {e.period} · {dur[e.key]}
              </p>
              <h3 className="mt-1 text-xl font-semibold text-fg">
                {e.company} <span className="text-base font-normal text-accent">{e.role}</span>
              </h3>
              <p className="mt-2 text-sm text-mute">{e.summary}</p>
              <ul className="mt-4 space-y-2">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-fg/90">
                    <span className="mt-2 h-1 w-1 flex-none rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
