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
            <div className="w-full max-w-7xl mx-auto">
              <Hero />
            </div>
          </section>
          <section id="about" className="relative z-10 w-full">
            <div className="w-full max-w-7xl mx-auto">
              <About />
            </div>
          </section>
          <section id="skills" className="relative z-10 w-full">
            <div className="w-full max-w-7xl mx-auto">
              <Skills />
            </div>
          </section>
          <section id="projects" className="relative z-10 w-full">
            <div className="w-full max-w-7xl mx-auto">
              <Projects />
            </div>
          </section>
          <section id="career" className="relative z-10 w-full">
            <div className="w-full max-w-7xl mx-auto">
              <Career />
            </div>
          </section>
          <section id="contact" className="relative z-10 w-full">
            <div className="w-full max-w-7xl mx-auto">
              <Contact />
            </div>
          </section>
      </main>
      
      <Footer />
    </div>
  );
}
