import styles from './Contact.module.css';

export function Contact() {
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
          <a href="https://www.linkedin.com/in/bahaa-hamed-9424111a9" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="LinkedIn">
            <i className="fab fa-linkedin-in" />
          </a>
          <a href="https://github.com/eyepat" target="_blank" rel="noopener noreferrer" className={styles.socialBtn} title="GitHub">
            <i className="fab fa-github" />
          </a>
          <a href="/Bahaa_Hamed_CV_EN.pdf" download className={styles.socialBtn} title="Download CV">
            <i className="fas fa-download" />
          </a>
        </div>
      </div>
    </section>
  );
}
