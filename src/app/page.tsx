import Header from './components/Header';
import Footer from './components/Footer';
import Scene from './components/Scene';
import Hero from './sections/Hero';
import Intro from './sections/Intro';
import Projects from './sections/Projects';
import Stack from './sections/Stack';
import Experience from './sections/Experience';
import Contact from './sections/Contact';

// 경력 기간이 날짜에 따라 바뀌므로 하루마다 다시 생성
export const revalidate = 86400;

export default function Home() {
  return (
    <div id="top" className="bg-bg">
      <Header />
      <main>
        <section id="home">
          <Hero />
        </section>
        <Scene id="intro" className="bg-bg">
          <Intro />
        </Scene>
        <Scene id="projects" className="bg-bg">
          <Projects />
        </Scene>
        <Scene id="stack" className="bg-bg">
          <Stack />
        </Scene>
        <Scene id="experience" className="bg-surface">
          <Experience />
        </Scene>
        <Scene id="contact" className="dark bg-[linear-gradient(160deg,#0f1029,#1e1b4b_45%,#2e1065)]">
          <Contact />
        </Scene>
      </main>
      <Footer />
    </div>
  );
}
