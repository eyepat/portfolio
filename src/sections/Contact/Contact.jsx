import { useEffect, useRef, useState } from 'react';
import styles from './Contact.module.css';
import { Magnetic } from '../../components/Magnetic/Magnetic';
import { Icon } from '../../components/Icon/Icon';

export function Contact() {
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef(null);

  useEffect(() => {
    if (!cvOpen) return;
    const onDown = (e) => {
      if (cvRef.current && !cvRef.current.contains(e.target)) setCvOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setCvOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [cvOpen]);

  return (
    <section className={styles.sec} id="contact">
      <div className={styles.inner}>
        <div className="chip reveal" style={{ justifyContent: 'center' }}>Contact</div>

        <h2 className={`${styles.heading} reveal`}>
          LET'S <span className="teal">WORK TOGETHER</span>
        </h2>

        <a href="mailto:bahaahamed1970@gmail.com" className={`${styles.email} reveal`}>
          bahaahamed1970@gmail.com
        </a>

        <div className={`${styles.socialRow} reveal rd1`}>
          <Magnetic strength={0.35}>
            <a href="https://www.linkedin.com/in/bahaa-hamed-9424111a9" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="LinkedIn">
              <Icon name="linkedin" size={20} />
            </a>
          </Magnetic>
          <Magnetic strength={0.35}>
            <a href="https://github.com/eyepat" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="GitHub">
              <Icon name="github" size={20} />
            </a>
          </Magnetic>
          <div className={styles.cvWrap} ref={cvRef}>
            <Magnetic strength={0.35}>
              <button
                type="button"
                className={styles.socialBtn}
                title="Download CV"
                aria-haspopup="true"
                aria-expanded={cvOpen}
                onClick={() => setCvOpen((o) => !o)}
              >
                <Icon name="download" size={20} />
              </button>
            </Magnetic>
            {cvOpen && (
              <div className={styles.cvMenu} role="menu">
                <a href="/Bahaa_Hamed_CV_EN.pdf" download="Bahaa_Hamed_CV_EN.pdf" role="menuitem" onClick={() => setCvOpen(false)}>
                  English
                </a>
                <a href="/Bahaa_Hamed_CV_SV.pdf" download="Bahaa_Hamed_CV_SV.pdf" role="menuitem" onClick={() => setCvOpen(false)}>
                  Svenska
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
