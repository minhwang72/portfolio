import Header from './components/Header';
import Footer from './components/Footer';
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
        <section id="stats">
          <Intro />
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
