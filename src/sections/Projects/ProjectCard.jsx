import PropTypes from 'prop-types';
import styles from './Projects.module.css';

export function ProjectCard({ project }) {
  const { num, badge, status, title, description, tags, githubUrl, image, imageAlt, reversed } = project;

  return (
    <div className={`${styles.row} ${reversed ? styles.rev : ''} reveal`}>
      <div className={styles.imgCol}>
        <div className={styles.imgWrap}>
          <img src={image} alt={imageAlt} loading="lazy" />
        </div>
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

        {githubUrl ? (
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
    image:       PropTypes.string.isRequired,
    imageAlt:    PropTypes.string.isRequired,
    reversed:    PropTypes.bool.isRequired,
  }).isRequired,
};
