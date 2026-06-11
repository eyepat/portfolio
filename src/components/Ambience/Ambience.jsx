import { useEffect, useRef } from 'react';
import styles from './Ambience.module.css';

export function Ambience() {
  const barRef  = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const spot = spotRef.current;
    let tx = window.innerWidth / 2, ty = window.innerHeight / 3;
    let x = tx, y = ty;
    let raf;

    const onMove = e => { tx = e.clientX; ty = e.clientY; };

    function loop() {
      x += (tx - x) * 0.05;
      y += (ty - y) * 0.05;
      spot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    }

    document.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div className={styles.layer}>
        <div className={styles.grid} />
        <div className={styles.auroraA} />
        <div className={styles.auroraB} />
        <div ref={spotRef} className={styles.spotlight} />
      </div>
      <div className={styles.noise} />
      <div ref={barRef} className={styles.progress} />
    </>
  );
}
