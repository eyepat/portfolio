import styles from './Contact.module.css';
import { Magnetic } from '../../components/Magnetic/Magnetic';
import { Icon } from '../../components/Icon/Icon';

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
          <Magnetic strength={0.35}>
            <a href="/Bahaa_Hamed_CV_EN.pdf" download className={styles.socialBtn} title="Download CV">
              <Icon name="download" size={20} />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
