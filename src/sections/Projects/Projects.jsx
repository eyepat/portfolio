import styles from './Projects.module.css';
import { ProjectCard } from './ProjectCard';
import { PROJECTS } from './projects.data';

export function Projects() {
  return (
    <section className="sec" id="projects">
      <div className="wrap">

        <div className={styles.header}>
          <div className="chip reveal">My Work</div>
          <h2 className={`split-title reveal`} style={{ marginBottom: '12px' }}>
            WHAT I'VE <span className="teal">BUILT?</span>
          </h2>
          <p className={`split-sub reveal`} style={{ maxWidth: '520px' }}>
            A selection of projects across AI systems, backend APIs, fullstack applications, and game development.
          </p>
        </div>

        <div className={styles.rows}>
          {PROJECTS.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

      </div>
    </section>
  );
}
