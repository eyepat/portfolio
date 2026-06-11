import PropTypes from 'prop-types';
import { TiltCard } from '../../components/TiltCard/TiltCard';
import { Icon } from '../../components/Icon/Icon';
import styles from './Skills.module.css';

export function SkillCategory({ category }) {
  const { icon, name, skills, delay } = category;

  return (
    <TiltCard className={`${styles.card} reveal ${delay}`} liftAmount={-6}>
      <Icon name={icon} size={26} className={styles.icon} />
      <div className={styles.name}>{name}</div>
      <div className={styles.list}>{skills}</div>
    </TiltCard>
  );
}

SkillCategory.propTypes = {
  category: PropTypes.shape({
    id:     PropTypes.string.isRequired,
    icon:   PropTypes.string.isRequired,
    name:   PropTypes.string.isRequired,
    skills: PropTypes.string.isRequired,
    delay:  PropTypes.string.isRequired,
  }).isRequired,
};
