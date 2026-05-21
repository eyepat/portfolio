import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './TiltCard.module.css';

export function TiltCard({ children, className, liftAmount }) {
  const cardRef  = useRef(null);
  const flashRef = useRef(null);

  useEffect(() => {
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouch) return;

    const card  = cardRef.current;
    const flash = flashRef.current;

    const onMove = e => {
      const r  = card.getBoundingClientRect();
      const cx = r.width / 2;
      const cy = r.height / 2;
      const dx = e.clientX - r.left - cx;
      const dy = e.clientY - r.top  - cy;
      const rX =  (dy / cy) * 9;
      const rY = -(dx / cx) * 9;
      card.style.transform = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateY(${liftAmount}px)`;
      if (flash) {
        flash.style.background = `radial-gradient(circle at ${e.clientX - r.left}px ${e.clientY - r.top}px, rgba(0,229,204,.09) 0%, transparent 52%)`;
      }
    };

    const onLeave = () => {
      card.style.transform = '';
      if (flash) flash.style.background = 'none';
    };

    const onClick = () => {
      card.classList.remove('eclick');
      void card.offsetWidth;
      card.classList.add('eclick');
      card.addEventListener('animationend', () => card.classList.remove('eclick'), { once: true });
    };

    card.addEventListener('mousemove', onMove);
    card.addEventListener('mouseleave', onLeave);
    card.addEventListener('click', onClick);

    return () => {
      card.removeEventListener('mousemove', onMove);
      card.removeEventListener('mouseleave', onLeave);
      card.removeEventListener('click', onClick);
    };
  }, [liftAmount]);

  return (
    <div ref={cardRef} className={className} data-tilt>
      <div ref={flashRef} className={styles.flash} />
      {children}
    </div>
  );
}

TiltCard.propTypes = {
  children:   PropTypes.node.isRequired,
  className:  PropTypes.string,
  liftAmount: PropTypes.number,
};

TiltCard.defaultProps = {
  className:  '',
  liftAmount: -6,
};
