import { SkillCategory } from './SkillCategory';
import { SKILL_CATEGORIES } from './skills.data';

export function Skills() {
  return (
    <section className="sec sec-dark" id="skills">
      <div className="wrap">
        <div className="chip reveal">Skills</div>
        <div className="split">

          <div className="split-sticky reveal">
            <h2 className="split-title">
              WHAT I <span className="teal">KNOW?</span>
            </h2>
            <p className="split-sub">
              Built through real projects — from AI pipelines to fullstack applications to cloud-deployed services.
            </p>
            <a href="#contact" className="btn-arrow">Let's Talk →</a>
          </div>

          <div className="card-grid">
            {SKILL_CATEGORIES.map(cat => (
              <SkillCategory key={cat.id} category={cat} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
