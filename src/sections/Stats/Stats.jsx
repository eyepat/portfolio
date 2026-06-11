import styles from './Stats.module.css';
import { CountUp } from '../../components/CountUp/CountUp';
import { Icon } from '../../components/Icon/Icon';

const STATS = [
  { icon: 'desktop',        value: 5,    suffix: '+', label: 'Projects',       delay: ''    },
  { icon: 'bolt',           value: 3,    suffix: '+', label: 'AI Models Used', delay: 'rd1' },
  { icon: 'cubes',          value: 2,    suffix: '×', label: 'Services Built', delay: 'rd2' },
  { icon: 'graduation-cap', value: 2026, suffix: '',  label: 'Graduation',     delay: 'rd3' },
];

export function Stats() {
  return (
    <div className={styles.strip}>
      <div className={styles.row}>
        {STATS.map(s => (
          <div key={s.label} className={`${styles.stat} reveal ${s.delay}`}>
            <Icon name={s.icon} size={32} className={styles.icon} />
            <span className={styles.num}>
              <CountUp value={s.value} suffix={s.suffix} />
            </span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
