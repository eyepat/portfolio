import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <span className={styles.left}>© 2026 Bahaa Hamed</span>
        <span className={styles.right}>Built with intention.</span>
      </div>
    </footer>
  );
}
