import styles from './About.module.css';

const STATS = [
  { num: '5', sup: '+', label: 'Projects delivered', delay: '' },
  { num: '2', sup: '×', label: 'Independent services built', delay: 'rd1' },
  { num: '1536', sup: '', label: 'Vector embedding dimensions', delay: 'rd2' },
  { num: '∞', sup: '', label: 'Curiosity', delay: 'rd3', white: true },
];

const TAGS = [
  'Azure OpenAI', 'MCP Protocol', 'pgvector', '.NET / C#',
  'PostgreSQL', 'React', 'Docker', 'Azure',
];

export function About() {
  return (
    <section className="sec sec-dark" id="about">
      <div className="wrap">
        <div className="chip reveal">About Me</div>
        <div className={styles.layout}>

          <div className={styles.statsCol}>
            {STATS.map(s => (
              <div key={s.label} className={`reveal ${s.delay}`}>
                <div className={styles.num} style={s.white ? { color: 'var(--color-white)' } : {}}>
                  {s.num}
                  {s.sup && <span className={styles.sup}>{s.sup}</span>}
                </div>
                <div className={styles.lbl}>{s.label}</div>
              </div>
            ))}
          </div>

          <div className={`${styles.bioCol} reveal rd1`}>
            <p className={styles.bioP}>
              I am a newly graduated Bachelor of Engineering in Computer Science and Economics from KTH (2026) with a strong interest in AI and how it can solve real-world problems. I have a passion for technology, innovation, and social impact. With solid skills in programming, databases, and systems development — as well as hands-on project experience — I have a strong foundation to build on. I enjoy taking ownership, learning quickly, and contributing to teams that build things that actually get used. I am now looking for a role where I can continue to grow within software development and AI.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
