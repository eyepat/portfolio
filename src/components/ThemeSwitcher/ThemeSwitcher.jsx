import { useState } from 'react';
import { THEMES, applyTheme, getSavedTheme } from './themes';
import styles from './ThemeSwitcher.module.css';

export function ThemeSwitcher() {
  const [idx, setIdx] = useState(getSavedTheme);

  const cycle = () => {
    const next = (idx + 1) % THEMES.length;
    setIdx(next);
    applyTheme(next);
    localStorage.setItem('accent-theme', String(next));
  };

  return (
    <button
      className={styles.btn}
      onClick={cycle}
      title={`Accent: ${THEMES[idx].name} — click to change`}
      aria-label="Change accent color"
    >
      <span className={styles.swatch} />
    </button>
  );
}
