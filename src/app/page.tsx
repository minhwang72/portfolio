import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './sections/Hero';
import About from './sections/AboutMe';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Career from './sections/Career';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <div className="relative min-h-screen">
      <div className="space-bg" />
      <Header />
      
      <main className="w-full max-w-[1920px] mx-auto">
        <section id="home" className="relative z-10 w-full">
          <Hero />
        </section>
        <section id="about" className="relative z-10 w-full">
          <About />
        </section>
        <section id="skills" className="relative z-10 w-full">
          <Skills />
        </section>
        <section id="projects" className="relative z-10 w-full">
          <Projects />
        </section>
        <section id="career" className="relative z-10 w-full">
          <Career />
        </section>
        <section id="contact" className="relative z-10 w-full">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
