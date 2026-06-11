import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './GhostTitle.module.css';

export function GhostTitle({ text, direction = 1 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    let raf = null;

    const update = () => {
      raf = null;
      const r  = el.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (vh - r.top) / (vh + r.height);
      el.style.transform = `translateX(${(p - 0.5) * direction * 24}%)`;
    };

    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, [direction]);

  return <span ref={ref} className={styles.ghost} aria-hidden="true">{text}</span>;
}

GhostTitle.propTypes = {
  text:      PropTypes.string.isRequired,
  direction: PropTypes.number,
};
