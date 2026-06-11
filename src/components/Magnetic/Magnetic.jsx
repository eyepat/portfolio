import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Magnetic.module.css';

export function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const el = ref.current;

    const onMove = e => {
      const r  = el.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
    };

    const onLeave = () => { el.style.transform = 'translate(0, 0)'; };

    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);

    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);

  return <span ref={ref} className={styles.magnetic}>{children}</span>;
}

Magnetic.propTypes = {
  children: PropTypes.node.isRequired,
  strength: PropTypes.number,
};
