import { useEffect, useState } from 'react';
import { Cursor } from './components/Cursor/Cursor';
import { Ambience } from './components/Ambience/Ambience';
import { Preloader } from './components/Preloader/Preloader';
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

// Show the intro once per tab session; never for reduced-motion users.
const SKIP_INTRO =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
  sessionStorage.getItem('introShown') === '1';

export default function App() {
  const [ready, setReady]     = useState(SKIP_INTRO);
  const [lifting, setLifting] = useState(false);
  const [introGone, setIntroGone] = useState(SKIP_INTRO);

  useEffect(() => {
    if (SKIP_INTRO) return undefined;
    const liftTimer = setTimeout(() => { setLifting(true); setReady(true); }, 1900);
    const doneTimer = setTimeout(() => {
      setIntroGone(true);
      sessionStorage.setItem('introShown', '1');
    }, 2800);
    return () => { clearTimeout(liftTimer); clearTimeout(doneTimer); };
  }, []);

  useScrollReveal(ready);
  const activeSection = useActiveSection(SECTION_IDS, ready);

  return (
    <>
      {!introGone && <Preloader lifting={lifting} />}
      <Cursor />
      <Ambience />
      {ready && (
        <>
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
      )}
    </>
  );
}
