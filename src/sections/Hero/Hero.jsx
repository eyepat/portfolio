import { useEffect, useRef } from 'react';
import styles from './Hero.module.css';
import { Magnetic } from '../../components/Magnetic/Magnetic';
import { Particles } from '../../components/Particles/Particles';
import { Scramble } from '../../components/Scramble/Scramble';

export function Hero() {
  const photoRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const photo = photoRef.current;
    let tx = 0, ty = 0, x = 0, y = 0;
    let raf;

    const onMove = e => {
      tx = (e.clientX / window.innerWidth  - 0.5) * -22;
      ty = (e.clientY / window.innerHeight - 0.5) * -16;
    };

    function loop() {
      x += (tx - x) * 0.07;
      y += (ty - y) * 0.07;
      photo.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className={styles.hero} id="home">
      <div className={styles.blob} />
      <Particles />
      <div className={styles.inner}>

        <div className={styles.left}>
          <p className={styles.label}>
            <span className={styles.pulseDot} />
            <Scramble text="Computer Science & Economics — KTH 2026" delay={500} />
          </p>
          <h1 className={styles.h1}>
            <span className={styles.lineMask}>
              <span className={styles.line}>I BUILD</span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} ${styles.lineDelay2}`}>
                <span className={styles.shimmer}>INTELLIGENT</span>
              </span>
            </span>
            <span className={styles.lineMask}>
              <span className={`${styles.line} ${styles.lineDelay3} ghost`}>SYSTEMS.</span>
            </span>
          </h1>
          <p className={styles.para}>
            Newly graduated engineer from KTH with a focus on AI, backend architecture, and building things that actually work.
          </p>
          <div className={styles.btns}>
            <Magnetic><a href="#projects" className="btn-fill">View Work</a></Magnetic>
            <Magnetic><a href="#contact"  className="btn-line">Get in Touch</a></Magnetic>
          </div>
        </div>

        <div className={styles.photo} ref={photoRef}>
          <div className={styles.portrait}>
            <img src="/assets/img/photo.png" alt="Bahaa Hamed" className={styles.portraitImg} />
            <img src="/assets/img/photo.png" alt="" aria-hidden="true" className={styles.portraitTint} />
            <span className={styles.photoRing} />
          </div>
        </div>

      </div>

      <a href="#about" className={styles.scrollHint} aria-label="Scroll to about section">
        <span className={styles.mouse}><span className={styles.wheel} /></span>
        Scroll
      </a>
    </section>
  );
}
