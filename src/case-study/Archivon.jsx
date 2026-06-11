import { Cursor } from '../components/Cursor/Cursor';
import { Ambience } from '../components/Ambience/Ambience';
import { ThemeSwitcher } from '../components/ThemeSwitcher/ThemeSwitcher';
import { useScrollReveal } from '../hooks/useScrollReveal';
import styles from './Archivon.module.css';

const META = [
  { label: 'Role',     value: 'Solo designer & developer' },
  { label: 'Context',  value: 'B.Eng. thesis (15 credits), KTH × Epinova AB' },
  { label: 'Year',     value: '2026' },
  { label: 'Status',   value: 'Deployed on Azure' },
];

const STACK = [
  'C# / .NET 10', 'PostgreSQL', 'pgvector', 'Azure OpenAI', 'Azure App Service',
  'GitHub Actions', 'MCP / SSE', 'RAG', 'Optimizely Opal SDK', 'Docker',
];

const DECISIONS = [
  {
    title: 'Two microservices instead of a monolith',
    decision: 'Split the system into archivon-core (ingestion, embeddings, retrieval) and archivon-generator (persona-driven generation), each independently built and deployed.',
    tradeoff: 'Cross-service contracts to maintain and two deployments to operate — but each agent ships on its own schedule via path-filtered GitHub Actions workflows, so a change to the generator never risks the ingestion pipeline.',
  },
  {
    title: 'pgvector inside PostgreSQL, not a dedicated vector DB',
    decision: 'Stored embeddings next to the relational data in PostgreSQL using pgvector, with cosine similarity retrieval and an automatic grouping strategy.',
    tradeoff: 'A specialised vector database offers fancier ANN indexing at scale, but one database means one backup story, one connection pool, and joins between vectors and metadata for free — the right call at this scale.',
  },
  {
    title: 'Dual protocol: MCP SSE streaming + REST',
    decision: 'Exposed the same capabilities over a REST API for services and over MCP with SSE streaming for AI agents, integrated with the Optimizely Opal Tools SDK.',
    tradeoff: 'Two API surfaces to keep in sync — accepted because it makes Archivon consumable both by humans/CI and by agentic tooling, which was the whole point of the system.',
  },
  {
    title: 'Persona-driven output instead of per-audience pipelines',
    decision: 'One retrieval pipeline feeds generation that adapts tone and depth per target audience (developer, product, stakeholder) through persona prompts.',
    tradeoff: 'Prompt complexity grows, but the alternative — separate pipelines per audience — would have tripled the surface area for the same content.',
  },
  {
    title: 'Prompt-injection defence: the sandwich pattern',
    decision: 'Ingested artifacts (PR descriptions, commit messages, user stories) are untrusted input. They are wrapped between system instruction layers so embedded "ignore previous instructions" text cannot hijack generation.',
    tradeoff: 'Slightly larger prompts on every call — cheap insurance for a system whose input is, by definition, whatever developers happen to write.',
  },
  {
    title: 'Fuzzy project resolution with Levenshtein fallback',
    decision: 'Project name lookups fall back to Levenshtein distance matching, so "archivon-gen" still resolves to archivon-generator instead of erroring.',
    tradeoff: 'A wrong fuzzy match is worse than no match, so the fallback is conservative — small edit distances only.',
  },
];

const FLOW = [
  {
    stage: 'Sources',
    items: ['GitHub — PRs & commits', 'Azure DevOps — user stories'],
    note: 'Custom-built connectors',
  },
  {
    stage: 'archivon-core',
    items: ['Ingestion & normalisation', 'Embeddings — Azure OpenAI', 'PostgreSQL + pgvector', 'Cosine similarity retrieval + grouping'],
    note: '.NET 10 service',
  },
  {
    stage: 'archivon-generator',
    items: ['RAG prompt assembly', 'Persona-driven generation', 'Sandwich-pattern injection defence'],
    note: '.NET 10 service',
  },
  {
    stage: 'Consumers',
    items: ['MCP SSE streaming — AI agents', 'Optimizely Opal Tools SDK', 'REST API — services & humans'],
    note: 'Dual protocol',
  },
];

export function Archivon() {
  useScrollReveal(true);

  return (
    <>
      <Cursor />
      <Ambience />

      <nav className={styles.topbar}>
        <div className={styles.topbarInner}>
          <a href="/#projects" className={styles.back}>← Back to portfolio</a>
          <ThemeSwitcher />
        </div>
      </nav>

      <header className={styles.hero}>
        <div className="wrap">
          <div className="chip">Case Study · Thesis · KTH × Epinova</div>
          <h1 className={styles.h1}>
            ARCHIVON<span className="teal">.</span>
          </h1>
          <p className={styles.tagline}>
            A distributed RAG-based multi-agent AI system that turns raw development
            activity into documentation — written differently for every audience.
          </p>

          <div className={styles.metaRow}>
            {META.map(m => (
              <div key={m.label} className={styles.metaItem}>
                <span className={styles.metaLabel}>{m.label}</span>
                <span className={styles.metaValue}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className={styles.section}>
          <div className="wrap">
            <div className="chip reveal">01 — The Problem</div>
            <h2 className={`${styles.h2} reveal`}>
              DOCUMENTATION ALWAYS <span className="teal">LAGS THE CODE</span>
            </h2>
            <div className={`${styles.prose} reveal rd1`}>
              <p>
                Development teams produce a constant stream of pull requests, commits, and
                user stories — but documentation is written by hand, after the fact, when
                someone finds time. It goes stale the moment it is published, and it is
                written once for one reader, even though a developer, a product manager,
                and a stakeholder each need a completely different view of the same work.
              </p>
              <p>
                My thesis at KTH, in collaboration with Epinova, asked: can the development
                activity itself become the source of truth — ingested continuously, and
                turned into accurate documentation, adapted per audience, on demand?
              </p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className="wrap">
            <div className="chip reveal">02 — Architecture</div>
            <h2 className={`${styles.h2} reveal`}>
              TWO SERVICES, <span className="teal">ONE PIPELINE</span>
            </h2>
            <p className={`${styles.lead} reveal rd1`}>
              Artifacts flow left to right: ingested, embedded, retrieved, and generated —
              then streamed to whoever (or whatever) asked.
            </p>

            <div className={styles.flow}>
              {FLOW.map((f, i) => (
                <div key={f.stage} className={`${styles.flowCol} reveal rd${Math.min(i, 3)}`}>
                  <div className={styles.flowBox}>
                    <span className={styles.flowStage}>{f.stage}</span>
                    <span className={styles.flowNote}>{f.note}</span>
                    <ul className={styles.flowList}>
                      {f.items.map(item => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                  {i < FLOW.length - 1 && <span className={styles.flowArrow} aria-hidden="true">→</span>}
                </div>
              ))}
            </div>

            <p className={`${styles.deployNote} reveal`}>
              <span className={styles.deployDot} />
              Deployed on Azure App Service (Sweden Central) · CI/CD via GitHub Actions with
              path-filtered workflows per service
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <div className="wrap">
            <div className="chip reveal">03 — Decisions &amp; Trade-offs</div>
            <h2 className={`${styles.h2} reveal`}>
              WHAT I CHOSE, <span className="teal">AND WHAT IT COST</span>
            </h2>

            <div className={styles.decisionGrid}>
              {DECISIONS.map((d, i) => (
                <article key={d.title} className={`${styles.decision} reveal rd${i % 3}`}>
                  <span className={styles.decisionNum}>{String(i + 1).padStart(2, '0')}</span>
                  <h3 className={styles.decisionTitle}>{d.title}</h3>
                  <p className={styles.decisionBody}>{d.decision}</p>
                  <p className={styles.decisionTradeoff}>
                    <span className={styles.tradeoffLabel}>Trade-off</span>
                    {d.tradeoff}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.sectionDark}`}>
          <div className="wrap">
            <div className="chip reveal">04 — Outcome</div>
            <h2 className={`${styles.h2} reveal`}>
              SHIPPED, DEPLOYED, <span className="teal">IN USE</span>
            </h2>
            <div className={`${styles.prose} reveal rd1`}>
              <p>
                Archivon went from blank repository to a production-grade system running on
                Azure: two independently deployed .NET 10 services with full CI/CD, a working
                RAG pipeline over real GitHub and Azure DevOps data, and integration with the
                Optimizely Opal agent ecosystem over MCP.
              </p>
              <p>
                It also earned a Bachelor of Engineering thesis at KTH — and taught me exactly
                where I want to work: the intersection of AI, backend architecture, and
                systems that real teams depend on.
              </p>
            </div>

            <div className={`${styles.stack} reveal rd2`}>
              {STACK.map(s => <span key={s} className={styles.stackTag}>{s}</span>)}
            </div>
          </div>
        </section>

        <section className={styles.ctaSection}>
          <div className="wrap">
            <h2 className={`${styles.ctaTitle} reveal`}>
              WANT THE FULL STORY<span className="teal">?</span>
            </h2>
            <p className={`${styles.ctaSub} reveal rd1`}>
              I am happy to walk through the architecture, the code, or the thesis itself.
            </p>
            <div className={`${styles.ctaBtns} reveal rd2`}>
              <a href="/#contact" className="btn-fill">Get in Touch</a>
              <a href="/#projects" className="btn-line">More Projects</a>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="wrap">© 2026 Bahaa Hamed — Built with intention.</div>
      </footer>
    </>
  );
}
