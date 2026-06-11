import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

const CHARS = '!<>-_\\/[]{}—=+*^?#$%&';

export function Scramble({ text, duration = 1100, delay = 0 }) {
  const ref = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    let raf;

    const timer = setTimeout(() => {
      const start = performance.now();
      const tick = now => {
        const p = Math.min((now - start) / duration, 1);
        const settled = Math.floor(text.length * p);
        let out = text.slice(0, settled);
        for (let i = settled; i < text.length; i++) {
          out += text[i] === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
        }
        el.textContent = out;
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => { clearTimeout(timer); cancelAnimationFrame(raf); };
  }, [text, duration, delay]);

  return <span ref={ref}>{text}</span>;
}

Scramble.propTypes = {
  text:     PropTypes.string.isRequired,
  duration: PropTypes.number,
  delay:    PropTypes.number,
};
