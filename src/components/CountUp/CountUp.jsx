import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

export function CountUp({ value, suffix = '', duration = 1600, className = '' }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      obs.disconnect();

      const start = performance.now();
      const tick = now => {
        const p     = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(value * eased) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.4 });

    obs.observe(el);
    return () => obs.disconnect();
  }, [value, suffix, duration]);

  return <span ref={ref} className={className}>0{suffix}</span>;
}

CountUp.propTypes = {
  value:     PropTypes.number.isRequired,
  suffix:    PropTypes.string,
  duration:  PropTypes.number,
  className: PropTypes.string,
};
