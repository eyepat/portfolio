import styles from './Marquee.module.css';

const WORDS = [
  'Archivon', '.NET 10', 'Backend Engineering',
  'Vector Databases', 'RAG Systems', 'Azure OpenAI', 'MCP Protocol',
  'pgvector', 'Claude API', 'Docker', 'PostgreSQL',
];

export function Marquee() {
  const items = [...WORDS, ...WORDS];

  return (
    <div className={styles.strip}>
      <div className={styles.track}>
        {items.map((word, i) => (
          <div key={i} className={styles.item}>
            {word}
            <span className={styles.dot} />
          </div>
        ))}
      </div>
    </div>
  );
}
