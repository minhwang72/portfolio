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
    <div className="relative">
      <div className="space-bg" />
      <Header />
      
      <main>
        <section id="home" className="relative z-10">
          <Hero />
        </section>
        <section id="about" className="relative z-10">
          <About />
        </section>
        <section id="skills" className="relative z-10">
          <Skills />
        </section>
        <section id="projects" className="relative z-10">
          <Projects />
        </section>
        <section id="career" className="relative z-10">
          <Career />
        </section>
        <section id="contact" className="relative z-10">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}
