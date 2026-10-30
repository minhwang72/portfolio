import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import Featured from './sections/Featured';
import Work from './sections/Work';
import Experience from './sections/Experience';
import Stack from './sections/Stack';
import Contact from './sections/Contact';

// 경력 기간이 날짜에 따라 바뀌므로 하루마다 다시 생성
export const revalidate = 86400;

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen bg-ink">
      <div className="grid-bg pointer-events-none absolute inset-x-0 top-0 h-[900px] [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <Header />
      <main className="relative">
        <section id="home">
          <Hero />
        </section>
        <section id="featured" className="border-t border-line">
          <Featured />
        </section>
        <section id="work-list" className="border-t border-line">
          <Work />
        </section>
        <section id="experience" className="border-t border-line">
          <Experience />
        </section>
        <section id="stack" className="border-t border-line">
          <Stack />
        </section>
        <section id="contact" className="border-t border-line">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  );
}
