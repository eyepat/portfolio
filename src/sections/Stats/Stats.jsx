import styles from './Stats.module.css';

const STATS = [
  { icon: 'fas fa-desktop',        num: '5+',  label: 'Projects',       delay: ''    },
  { icon: 'fas fa-bolt',           num: '3+',  label: 'AI Models Used', delay: 'rd1' },
  { icon: 'fas fa-cubes',          num: '2×',  label: 'Services Built', delay: 'rd2' },
  { icon: 'fas fa-graduation-cap', num: '2026',label: 'Graduation',     delay: 'rd3' },
];

export function Stats() {
  return (
    <div className={styles.strip}>
      <div className={styles.row}>
        {STATS.map(s => (
          <div key={s.label} className={`${styles.stat} reveal ${s.delay}`}>
            <i className={`${styles.icon} ${s.icon}`} />
            <span className={styles.num}>{s.num}</span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
