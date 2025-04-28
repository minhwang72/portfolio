import Header from './components/Header';
import Footer from './components/Footer';
import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import About from './sections/AboutMe';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Career from './sections/Career';
import Contact from './sections/Contact';

export default function Home() {
  return (
    <div>
      <Header />
      <Navigation />
      
      <div className="space-bg">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Career />
        <Contact />
        <Footer />
      </div>
    </div>
  );
}
