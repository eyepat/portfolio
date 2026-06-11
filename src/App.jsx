import { Cursor } from './components/Cursor/Cursor';
import { Ambience } from './components/Ambience/Ambience';
import { Nav }    from './components/Nav/Nav';
import { Marquee } from './components/Marquee/Marquee';
import { Hero }    from './sections/Hero/Hero';
import { About }   from './sections/About/About';
import { Projects } from './sections/Projects/Projects';
import { Skills }   from './sections/Skills/Skills';
import { Stats }    from './sections/Stats/Stats';
import { Contact }  from './sections/Contact/Contact';
import { Footer }   from './sections/Footer/Footer';
import { useScrollReveal }  from './hooks/useScrollReveal';
import { useActiveSection } from './hooks/useActiveSection';

const SECTION_IDS = ['home', 'about', 'projects', 'skills', 'contact'];

export default function App() {
  useScrollReveal();
  const activeSection = useActiveSection(SECTION_IDS);

  return (
    <>
      <Cursor />
      <Ambience />
      <Nav activeSection={activeSection} />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Stats />
      <Contact />
      <Marquee />
      <Footer />
    </>
  );
}
