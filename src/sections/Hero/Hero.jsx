import styles from './Hero.module.css';

export function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.blob} />
      <div className={styles.inner}>

        <div className={styles.left}>
          <p className={styles.label}>Computer Science &amp; Economics — KTH 2026</p>
          <h1 className={styles.h1}>
            I BUILD
            <span className="teal"> INTELLIGENT</span>
            <span className="ghost"> SYSTEMS.</span>
          </h1>
          <p className={styles.para}>
            Newly graduated engineer from KTH with a focus on AI, backend architecture, and building things that actually work.
          </p>
          <div className={styles.btns}>
            <a href="#projects" className="btn-fill">View Work</a>
            <a href="#contact"  className="btn-line">Get in Touch</a>
          </div>
        </div>

        <div className={styles.photo}>
          <div className={styles.portrait}>
            <img src="/assets/img/photo.png" alt="Bahaa Hamed" className={styles.portraitImg} />
          </div>
        </div>

      </div>
    </section>
  );
}
