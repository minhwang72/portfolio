import type { Metadata } from 'next';
import Link from 'next/link';
import { Download } from 'lucide-react';
import { CONTACT, getCareerDurations } from '../lib/portfolio-data';
import { resume } from '../lib/resume';

export const metadata: Metadata = {
  title: '이력서 | 황민 · 풀스택 엔지니어 (AI · 자동화)',
  description: '풀스택 엔지니어 황민의 이력서. 사내 웹앱·서버, 그룹사 업무 자동화 운영 지원, LLM·MCP 자동화, 커머스·플랫폼 외주 개발 경력. PDF로 내려받을 수 있습니다.',
  alternates: { canonical: 'https://pf.eungming.com/resume' },
  openGraph: { title: '이력서 | 황민', description: '풀스택 엔지니어 (AI · 자동화) 황민의 이력서', url: 'https://pf.eungming.com/resume', type: 'profile' },
};

// 경력 기간이 날짜에 따라 바뀌므로 하루마다 다시 생성
export const revalidate = 86400;

/** 숫자·성과를 굵게: '약 90건에서 10건' 같은 부분 강조 */
function Em({ text }: { text: string }) {
  const parts = text.split(/(약 \d+건에서 \d+건 수준|약 1개월 만에|\d+\/\d+|\d+개 계열사|과제 \d+개|컨테이너 \d+개)/);
  return (
    <>
      {parts.map((p, i) =>
        i % 2 ? (
          <b key={i} className="font-semibold text-[#111]">
            {p}
          </b>
        ) : (
          p
        )
      )}
    </>
  );
}

/** 왼쪽에 섹션 이름, 오른쪽에 내용(채용 담당자가 훑어보기 쉬운 2단) */
function Section({ title, children, first = false }: { title: string; children: React.ReactNode; first?: boolean }) {
  return (
    <section className={`grid grid-cols-[96px_1fr] gap-6 ${first ? '' : 'border-t border-[#d9d9d6]'} py-5 print:py-4`}>
      <h2 className="pt-0.5 text-[12px] font-bold uppercase tracking-[0.04em] text-[#111]">{title}</h2>
      <div>{children}</div>
    </section>
  );
}

const Dot = () => <span className="mt-[8px] h-[4px] w-[4px] flex-none rounded-full bg-[#888]" />;

/** 이력서: 화면에서 보고, 같은 페이지를 A4로 인쇄한 PDF(/resume.pdf)를 내려받음. 테마와 상관없이 흰 종이 색 */
export default function ResumePage() {
  const { total } = getCareerDurations();

  return (
    <div className="min-h-screen bg-[#ececea] py-10 text-[#2a2a2a] print:bg-white print:py-0">
      <div className="mx-auto mb-4 flex max-w-[794px] items-center justify-between px-4 print:hidden">
        <Link href="/" className="text-sm text-[#666] hover:text-[#111]">
          ← 포트폴리오로
        </Link>
        <a href="/resume.pdf" download="황민_이력서.pdf" className="inline-flex items-center gap-1.5 rounded-lg bg-[#111] px-4 py-2 text-sm font-semibold text-white">
          <Download className="h-4 w-4" /> PDF 내려받기
        </a>
      </div>

      <article className="mx-auto max-w-[794px] bg-white px-12 py-11 text-[13px] leading-[1.6] shadow-[0_4px_30px_rgba(0,0,0,0.08)] print:max-w-none print:px-0 print:py-0 print:text-[12.5px] print:shadow-none">
        {/* 머리: 이름·직무 / 연락처 */}
        <header className="flex items-end justify-between gap-6 border-b-[3px] border-[#111] pb-4">
          <div>
            <h1 className="text-[30px] font-bold leading-none tracking-[-0.04em] text-[#111]">
              {resume.name} <span className="ml-1 text-[15px] font-semibold tracking-[0.06em] text-[#666]">HWANG MIN</span>
            </h1>
            <p className="mt-2 text-[15px] font-semibold text-[#333]">
              {resume.title} <span className="font-normal text-[#666]">· 경력 {total}</span>
            </p>
          </div>
          <dl className="grid grid-cols-[auto_auto] gap-x-3 text-[11.5px] leading-[1.7]">
            <dt className="text-[#888]">이메일</dt>
            <dd className="font-mono tracking-normal">{CONTACT.email}</dd>
            <dt className="text-[#888]">포트폴리오</dt>
            <dd className="font-mono tracking-normal">pf.eungming.com</dd>
            <dt className="text-[#888]">GitHub</dt>
            <dd className="font-mono tracking-normal">github.com/minhwang72</dd>
            <dt className="text-[#888]">거주</dt>
            <dd>서울</dd>
          </dl>
        </header>

        <Section title="요약" first>
          <ul className="space-y-1">
            {resume.summary.map((p) => (
              <li key={p} className="flex gap-2">
                <Dot />
                <span>
                  <Em text={p} />
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="핵심 역량">
          <dl className="grid grid-cols-[84px_1fr] gap-x-4 gap-y-1">
            {resume.skills.map((s) => (
              <div key={s.area} className="contents">
                <dt className="font-semibold text-[#111]">{s.area}</dt>
                <dd>{s.items}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section title={`경력 (${total})`}>
          <div className="space-y-5">
            {resume.jobs.map((j) => (
              <div key={j.company}>
                <div className="flex break-after-avoid items-baseline justify-between rounded-md bg-[#f2f2ef] px-3 py-2">
                  <h3 className="text-[15px] font-bold text-[#111]">
                    {j.company} <span className="ml-1 text-[13px] font-medium text-[#555]">{j.role}</span>
                  </h3>
                  <span className="font-mono text-[11.5px] tracking-normal text-[#555]">{j.period}</span>
                </div>
                <div className="mt-2.5 space-y-3 px-1">
                  {j.blocks.map((b) => (
                    <div key={b.title} className="break-inside-avoid">
                      <p className="break-after-avoid border-l-[3px] border-[#111] pl-2 text-[13px] font-bold leading-tight text-[#111]">{b.title}</p>
                      <ul className="mt-1.5 space-y-0.5">
                        {b.items.map((it) => (
                          <li key={it} className="flex gap-2">
                            <Dot />
                            <span>
                              <Em text={it} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {'projects' in j && j.projects && (
                    <div className="break-inside-avoid">
                      <p className="border-l-[3px] border-[#111] pl-2 text-[13px] font-bold leading-tight text-[#111]">주요 참여 프로젝트</p>
                      <table className="mt-1.5 w-full border-collapse text-[12.5px]">
                        <thead>
                          <tr className="border-b border-[#bbb] text-left text-[11px] text-[#777]">
                            <th className="py-1 font-medium">프로젝트</th>
                            <th className="py-1 font-medium">역할</th>
                            <th className="py-1 text-right font-medium">기간</th>
                          </tr>
                        </thead>
                        <tbody>
                          {j.projects.map((p) => (
                            <tr key={p.name} className="border-b border-[#eee]">
                              <td className="py-1 pr-3 font-medium text-[#111]">{p.name}</td>
                              <td className="py-1 pr-3">{p.role}</td>
                              <td className="py-1 text-right font-mono text-[11.5px] tracking-normal text-[#666]">{p.period}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="개인 프로젝트">
          <div className="space-y-3">
            {resume.personal.map((p) => (
              <div key={p.name} className="break-inside-avoid">
                <div className="flex items-baseline justify-between gap-4">
                  <p className="font-bold text-[#111]">{p.name}</p>
                  <span className="font-mono text-[11px] tracking-normal text-[#666]">{p.link}</span>
                </div>
                <p>
                  <Em text={p.desc} />
                </p>
                <p className="font-mono text-[11px] tracking-normal text-[#777]">{p.tech}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section title="자격 · 학력">
          <div className="grid grid-cols-[1.6fr_1fr] gap-6">
            <ul className="space-y-1">
              {resume.certs.map((c) => (
                <li key={c.name}>
                  <b className="font-semibold text-[#111]">{c.name}</b>
                  <br />
                  <span className="text-[#666]">
                    {c.issuer} · {c.date}
                  </span>
                </li>
              ))}
            </ul>
            <div className="border-l border-[#d9d9d6] pl-5">
              {resume.education.map((e) => (
                <p key={e.name}>
                  <b className="font-semibold text-[#111]">{e.name}</b>
                  <br />
                  <span className="text-[#666]">{e.state}</span>
                </p>
              ))}
            </div>
          </div>
        </Section>
      </article>
    </div>
  );
}
