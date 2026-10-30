import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { CONTACT, getCareerDurations } from '../lib/portfolio-data';
import { resume } from '../lib/resume';

export const metadata: Metadata = {
  title: '이력서 | 황민',
  description: '풀스택 엔지니어(AI·자동화) 황민 이력서',
};

// 경력 기간이 날짜에 따라 바뀌므로 하루마다 다시 생성
export const revalidate = 86400;

/** 이력서: 화면에서 보고, 같은 페이지를 A4로 인쇄한 PDF(/resume.pdf)를 내려받음. 테마와 상관없이 흰 종이 색 */
export default function ResumePage() {
  const { total } = getCareerDurations();
  const H2 = 'mb-2.5 mt-7 border-b-2 border-[#111] pb-1 text-[15px] font-bold tracking-[-0.02em] text-[#111] print:mt-5';

  return (
    <div className="min-h-screen bg-[#ececea] py-10 text-[#222] print:bg-white print:py-0">
      <div className="mx-auto mb-4 flex max-w-[794px] items-center justify-between px-4 print:hidden">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← 포트폴리오로
        </Link>
        <a href="/resume.pdf" download="황민_이력서.pdf" className="inline-flex items-center gap-1.5 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white">
          <Download className="h-4 w-4" /> PDF 내려받기
        </a>
      </div>

      <article className="mx-auto max-w-[794px] bg-white px-12 py-12 text-[13px] leading-[1.6] print:text-[12.5px] shadow-[0_4px_30px_rgba(0,0,0,0.08)] print:max-w-none print:px-0 print:py-0 print:shadow-none">
        <header className="flex items-end justify-between gap-6 border-b border-[#ddd] pb-5">
          <div>
            <h1 className="text-[30px] font-bold tracking-[-0.04em] text-[#111]">{resume.name}</h1>
            <p className="mt-0.5 text-[15px] font-medium text-[#444]">
              {resume.title} · 경력 {total}
            </p>
          </div>
          <ul className="text-right font-mono text-[11.5px] leading-[1.7] tracking-normal text-[#444]">
            <li>{CONTACT.email}</li>
            <li>pf.eungming.com</li>
            <li>github.com/minhwang72</li>
            <li>linkedin.com/in/min-hwang-071b18316</li>
          </ul>
        </header>

        <section>
          <h2 className={H2}>요약</h2>
          <div className="space-y-1.5">
            {resume.summary.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section>
          <h2 className={H2}>핵심 역량</h2>
          <dl className="grid grid-cols-[90px_1fr] gap-x-4 gap-y-1">
            {resume.skills.map((s) => (
              <div key={s.area} className="contents">
                <dt className="font-semibold text-[#111]">{s.area}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className={H2}>경력 · 총 {total}</h2>
          {resume.jobs.map((j) => (
            <div key={j.company} className="mb-5">
              <div className="flex items-baseline justify-between">
                <h3 className="text-[15px] font-bold text-[#111]">
                  {j.company} <span className="ml-1 text-[13px] font-medium text-[#555]">{j.role}</span>
                </h3>
                <span className="font-mono text-[11.5px] tracking-normal text-[#555]">{j.period}</span>
              </div>
              {j.blocks.map((b) => (
                <div key={b.title} className="mt-2.5 break-inside-avoid">
                  <p className="font-semibold text-[#111]">{b.title}</p>
                  <ul className="mt-1 space-y-0.5">
                    {b.items.map((it) => (
                      <li key={it} className="flex gap-2">
                        <span className="mt-[9px] h-[3px] w-[3px] flex-none rounded-full bg-[#555]" />
                        {it}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              {'projects' in j && j.projects && (
                <div className="mt-2.5 break-inside-avoid">
                  <p className="font-semibold text-[#111]">주요 참여 프로젝트</p>
                  <table className="mt-1 w-full border-collapse text-[12.5px]">
                    <tbody>
                      {j.projects.map((p) => (
                        <tr key={p.name} className="border-b border-[#eee]">
                          <td className="py-1 pr-3 font-medium text-[#111]">{p.name}</td>
                          <td className="py-1 pr-3 text-[#444]">{p.role}</td>
                          <td className="py-1 text-right font-mono text-[11.5px] tracking-normal text-[#666]">{p.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className={H2}>개인 프로젝트</h2>
          <div className="space-y-2.5">
            {resume.personal.map((p) => (
              <div key={p.name} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-semibold text-[#111]">{p.name}</p>
                  <span className="font-mono text-[11px] tracking-normal text-[#666]">{p.link}</span>
                </div>
                <p>{p.desc}</p>
                <p className="font-mono text-[11px] tracking-normal text-[#666]">{p.tech}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8">
          <div>
            <h2 className={H2}>자격증</h2>
            <ul className="space-y-1">
              {resume.certs.map((c) => (
                <li key={c.name}>
                  <span className="font-semibold text-[#111]">{c.name}</span>
                  <br />
                  <span className="text-[#555]">
                    {c.issuer} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className={H2}>학력</h2>
            <ul>
              {resume.education.map((e) => (
                <li key={e.name}>
                  <span className="font-semibold text-[#111]">{e.name}</span>
                  <br />
                  <span className="text-[#555]">{e.state}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <p className="mt-10 border-t border-[#ddd] pt-3 text-[11px] text-[#888]">
          최신 내용과 실제로 운영 중인 서비스는 pf.eungming.com 에서 볼 수 있습니다.
        </p>
      </article>
    </div>
  );
}
