import { CONTACT } from '../lib/portfolio-data';

const groups = [
  {
    title: '둘러보기',
    links: [
      { label: '프로젝트', href: '#projects' },
      { label: '기술', href: '#stack' },
      { label: '경력', href: '#experience' },
      { label: '자격 · 학력', href: '#certs' },
    ],
  },
  {
    title: '운영 중인 서비스',
    links: [
      { label: '뮤직시트', href: 'https://conti.eungming.com' },
      { label: 'MOID', href: 'https://moid.co.kr' },
      { label: 'CBT 학습', href: 'https://cbt.eungming.com' },
      { label: '블로그', href: 'https://eungming.com' },
    ],
  },
  {
    title: '연락',
    links: [
      { label: '이메일', href: `mailto:${CONTACT.email}` },
      { label: 'GitHub', href: CONTACT.github },
      { label: 'LinkedIn', href: CONTACT.linkedin },
    ],
  },
];

/** 푸터: 소개 + 링크 묶음 + 이 사이트가 어디서 어떻게 도는지 */
export default function Footer() {
  return (
    <footer className="mt-32 border-t border-line bg-surface sm:mt-44">
      <div className="mx-auto grid max-w-[1104px] gap-10 px-5 pb-28 pt-14 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold tracking-[-0.03em] text-fg">황민</p>
          <p className="mt-2 max-w-[280px] text-sm leading-relaxed text-sub">풀스택 &amp; AI 엔지니어. 직접 만들고, 끝까지 운영합니다.</p>
          <p className="mt-5 font-mono text-xs leading-relaxed tracking-normal text-sub">
            served from monsil (집 서버)
            <br />
            Next.js · Docker · nginx · GitHub Actions
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <p className="text-xs font-semibold text-sub">{g.title}</p>
            <ul className="mt-3 space-y-2">
              {g.links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    target={l.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="text-sm text-fg/80 hover:text-fg hover:underline"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1104px] flex-col gap-1 px-5 py-5 pb-24 text-xs text-sub sm:flex-row sm:justify-between sm:pb-5">
          <span>© {new Date().getFullYear()} 황민 · Hwang Min</span>
          <a href="https://github.com/minhwang72/portfolio" target="_blank" rel="noopener noreferrer" className="hover:text-fg">
            이 사이트의 소스 보기 ↗
          </a>
        </div>
      </div>
    </footer>
  );
}
