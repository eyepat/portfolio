import { useEffect, useRef } from 'react';
import styles from './Journey.module.css';
import { GhostTitle } from '../../components/GhostTitle/GhostTitle';

const MILESTONES = [
  {
    year:  '2013–15',
    title: 'First Job in Tech',
    text:  'IT technician — customer support, troubleshooting, and hardware. The spark that started everything.',
  },
  {
    year:  '2022',
    title: 'KTH Royal Institute of Technology',
    text:  'Began the Bachelor of Engineering in Computer Science & Economics — algorithms, databases, machine learning, and business development.',
  },
  {
    year:  '2023',
    title: 'First Real Builds',
    text:  'Shipped Ball Brawl, a networked 2D multiplayer game in C/SDL2, and designed Drive My Kid, a carpooling UX prototype born from real user research.',
  },
  {
    year:  '2024',
    title: 'Fullstack × Karolinska Institutet',
    text:  'Built the Wait App admin panel — React/TypeScript frontend, Quarkus backend, Keycloak auth — for real-time patient data monitoring.',
  },
  {
    year:  '2026',
    title: 'Thesis × Epinova — Archivon',
    text:  'Designed and shipped a distributed RAG-based multi-agent AI system on Azure, and discovered exactly what I love building.',
  },
  {
    year:  'Now',
    title: 'Open to Opportunities',
    text:  'Looking for a role where I can keep growing at the intersection of AI, backend development, and system design.',
  },
];

export function Journey() {
  const listRef  = useRef(null);
  const fillRef  = useRef(null);
  const itemRefs = useRef([]);

  useEffect(() => {
    const list = listRef.current;
    const fill = fillRef.current;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      fill.style.transform = 'scaleY(1)';
      itemRefs.current.forEach(el => el && el.classList.add(styles.on));
      return;
    }

    let raf = null;

    const update = () => {
      raf = null;
      const r  = list.getBoundingClientRect();
      const vh = window.innerHeight;
      const p  = Math.min(Math.max((vh * 0.72 - r.top) / r.height, 0), 1);
      fill.style.transform = `scaleY(${p})`;

      const reach = p * r.height;
      itemRefs.current.forEach(el => {
        if (el) el.classList.toggle(styles.on, el.offsetTop + 10 <= reach);
      });
    };

    const onScroll = () => { if (raf == null) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="sec" id="journey">
      <GhostTitle text="JOURNEY" />
      <div className="wrap">
        <div className="chip reveal">My Journey</div>
        <h2 className="split-title reveal" style={{ marginBottom: '12px' }}>
          HOW I GOT <span className="teal">HERE?</span>
        </h2>
        <p className="split-sub reveal" style={{ maxWidth: '520px', marginBottom: '72px' }}>
          From fixing computers to building distributed AI systems — the short version.
        </p>

        <div className={styles.timeline} ref={listRef}>
          <span className={styles.track} />
          <span className={styles.fill} ref={fillRef} />

          {MILESTONES.map((m, i) => (
            <div
              key={m.year + m.title}
              ref={el => { itemRefs.current[i] = el; }}
              className={`${styles.item} reveal`}
            >
              <span className={styles.dot} />
              <div className={styles.card}>
                <span className={styles.year}>{m.year}</span>
                <h3 className={styles.title}>{m.title}</h3>
                <p className={styles.text}>{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
