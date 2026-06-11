import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.left}>© 2026 Bahaa Hamed</span>
        <button
          className={styles.term}
          onClick={() => window.dispatchEvent(new CustomEvent('terminal-toggle'))}
          title="Open the terminal (or press ` anywhere)"
          aria-label="Open hidden terminal"
        >
          &gt;_
        </button>
        <span className={styles.right}>Built with intention.</span>
      </div>
    </footer>
  );
}
