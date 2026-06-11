import PropTypes from 'prop-types';
import styles from './Preloader.module.css';

const NAME = 'BAHAA HAMED';

export function Preloader({ lifting }) {
  return (
    <div className={`${styles.overlay} ${lifting ? styles.lift : ''}`}>
      <div className={styles.center}>
        <div className={styles.name} aria-label={NAME}>
          {NAME.split('').map((ch, i) => (
            <span
              key={i}
              className={styles.letterMask}
            >
              <span
                className={styles.letter}
                style={{ animationDelay: `${0.15 + i * 0.045}s` }}
              >
                {ch === ' ' ? ' ' : ch}
              </span>
            </span>
          ))}
        </div>
        <div className={styles.bar}><span className={styles.barFill} /></div>
        <div className={styles.sub}>Portfolio — 2026</div>
      </div>
    </div>
  );
}

Preloader.propTypes = {
  lifting: PropTypes.bool.isRequired,
};
