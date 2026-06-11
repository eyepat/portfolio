import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './Projects.module.css';
import { TiltCard } from '../../components/TiltCard/TiltCard';

export function ProjectCard({ project }) {
  const { num, badge, status, title, description, tags, githubUrl, caseStudyUrl, image, imageAlt, reversed } = project;
  const imgHref = caseStudyUrl || githubUrl;
  const imgRef  = useRef(null);
  const chipRef = useRef(null);

  // scroll parallax: the image drifts inside its frame as the row crosses the viewport
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const img = imgRef.current;
    let raf = null;

    const update = () => {
      raf = null;
      const r  = img.parentElement.getBoundingClientRect();
      const vh = window.innerHeight;
      if (r.bottom < 0 || r.top > vh) return;
      const p = (r.top + r.height / 2 - vh / 2) / (vh / 2 + r.height / 2);
      img.style.transform = `scale(1.14) translateY(${p * -4}%)`;
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

  const onChipMove = e => {
    const chip = chipRef.current;
    if (!chip) return;
    const r = e.currentTarget.getBoundingClientRect();
    chip.style.left = `${e.clientX - r.left}px`;
    chip.style.top  = `${e.clientY - r.top}px`;
  };

  const imgFrame = (
    <div className={styles.imgWrap} onMouseMove={imgHref ? onChipMove : undefined}>
      <img ref={imgRef} src={image} alt={imageAlt} loading="lazy" />
      {imgHref && (
        <span ref={chipRef} className={styles.viewChip}>
          {caseStudyUrl ? <>STUDY&nbsp;→</> : <>VIEW&nbsp;↗</>}
        </span>
      )}
    </div>
  );

  return (
    <div className={`${styles.row} ${reversed ? styles.rev : ''} reveal`}>
      <div className={styles.imgCol}>
        <TiltCard className={styles.tilt} liftAmount={0}>
          {imgHref ? (
            <a
              href={imgHref}
              {...(caseStudyUrl ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className={styles.imgLink}
              aria-label={caseStudyUrl ? `Read the ${title} case study` : `Open ${title} on GitHub`}
            >
              {imgFrame}
            </a>
          ) : imgFrame}
        </TiltCard>
      </div>

      <div className={styles.textCol}>
        <span className={styles.num}>{num}</span>

        {badge && <span className={styles.badge}>{badge}</span>}

        {status && (
          <div className={styles.status}>
            <span className={styles.statusDot} />
            {status}
          </div>
        )}

        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{description}</p>

        <div className={styles.tags}>
          {tags.map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        {caseStudyUrl ? (
          <a href={caseStudyUrl} className={styles.link}>
            READ THE CASE STUDY →
          </a>
        ) : githubUrl ? (
          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className={styles.link}>
            VIEW ON GITHUB →
          </a>
        ) : (
          <span className={`${styles.link} ${styles.private}`}>PRIVATE REPO</span>
        )}
      </div>
    </div>
  );
}

ProjectCard.propTypes = {
  project: PropTypes.shape({
    num:         PropTypes.string.isRequired,
    badge:       PropTypes.string,
    status:      PropTypes.string,
    title:       PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    tags:        PropTypes.arrayOf(PropTypes.string).isRequired,
    githubUrl:   PropTypes.string,
    caseStudyUrl: PropTypes.string,
    image:       PropTypes.string.isRequired,
    imageAlt:    PropTypes.string.isRequired,
    reversed:    PropTypes.bool.isRequired,
  }).isRequired,
};
