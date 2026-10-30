import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Experience from './sections/Experience';
import Contact from './sections/Contact';
import { readFile } from 'fs/promises';

// 경력 기간이 날짜에 따라 바뀌므로 하루마다 다시 생성
export const revalidate = 86400;

/** 올해 GitHub 기여(공개 기여 그래프, 비공개 포함)와 집 서버 컨테이너 수(monsil cron이 /stats/containers에 기록). 실패하면 마지막 확인값 */
async function getStats() {
  const year = new Date().getFullYear();
  const github = await fetch(`https://github.com/users/minhwang72/contributions?from=${year}-01-01&to=${year}-12-31`, { next: { revalidate: 86400 } })
    .then((r) => r.text())
    .then((s) => Number(s.match(new RegExp(`([\\d,]+)\\s+contributions?\\s+in\\s+${year}`))?.[1].replace(/,/g, '')) || 411)
    .catch(() => 411);
  const containers = await readFile('/stats/containers', 'utf8')
    .then((s) => parseInt(s, 10) || 17)
    .catch(() => 17);
  return { github, containers };
}

export default async function Home() {
  const stats = await getStats();
  return (
    <div id="top" className="bg-bg">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <section id="stats">
          <Intro {...stats} />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="stack">
          <Stack />
        </section>
        <section id="experience">
          <Experience />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
