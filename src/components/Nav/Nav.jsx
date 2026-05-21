import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Nav.module.css';

const NAV_LINKS = [
  { href: '#home',     id: 'home',     label: 'Home'    },
  { href: '#about',    id: 'about',    label: 'About'   },
  { href: '#projects', id: 'projects', label: 'Work'    },
  { href: '#skills',   id: 'skills',   label: 'Skills'  },
  { href: '#contact',  id: 'contact',  label: 'Contact' },
];

export function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.inner}>
        <a href="#home" className={styles.brand} onClick={close}>
          <span className={styles.logo}>Bahaa Hamed</span>
          <span className={styles.tagline}>Computer Science &amp; Economics, KTH</span>
        </a>

        <ul className={`${styles.ul} ${open ? styles.open : ''}`}>
          <button className={styles.closeBtn} onClick={close} aria-label="Close menu">
            ✕
          </button>
          {NAV_LINKS.map(link => (
            <li key={link.id}>
              <a
                href={link.href}
                className={activeSection === link.id ? styles.active : ''}
                onClick={close}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`${styles.burger} ${open ? styles.open : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle navigation"
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}

Nav.propTypes = {
  activeSection: PropTypes.string.isRequired,
};
