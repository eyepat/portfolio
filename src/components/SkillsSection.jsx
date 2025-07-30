import { useState } from "react";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const skills = [
  /*Frontend list*/
    { name: "HTML/CSS", level: 85, category: "frontend" },
    { name: "JavaScript", level: 80, category: "frontend" },
    { name: "TypeScript", level: 70, category: "frontend" },
    { name: "React", level: 80, category: "frontend" },
    { name: "MVC", level: 90, category: "frontend" },
  /*Backend list*/
    { name: "Java", level: 90, category: "backend" },
    { name: "C", level: 80, category: "backend" },
    { name: "MySQL", level: 80, category: "backend" },
    { name: "MongoDB", level: 90, category: "backend" },
    { name: "PostgreSQL", level: 80, category: "backend" },
    { name: "Node.js", level: 80, category: "backend" },
  /*Tools list*/
    { name: "Git/Github", level: 95, category: "tools" },
    { name: "Docker", level: 85, category: "tools" },
    { name: "Keycloak", level: 90, category: "tools" },
    { name: "Figma", level: 75, category: "tools" },
    { name: "Scrum", level: 75, category: "tools" },
    { name: "VS Code", level: 95, category: "tools" },
    { name: "IntelliJ IDEA", level: 96, category: "tools" },
  /*Soft Skills list*/
      { name: "Problem-solving", level: 85, category: "soft skills" },
      { name: "TeamWork", level: 95, category: "soft skills" },
      { name: "Adaptability", level: 95, category: "soft skills" },
];

const categories = ["all", "frontend", "backend", "tools", "soft skills"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredSkills = skills.filter(
    (skill) =>
      activeCategory === "all" ||
      skill.category.toLowerCase() === activeCategory.toLowerCase()
  );

  console.log("Active Category:", activeCategory);
  console.log("Filtered Skills:", filteredSkills);

  return (
    <motion.section
      id="skills"
      className="skills"
      initial="initial"
      animate="animate"
      variants={staggerContainer}
    >
      <div className="skills-container">
        <motion.h2 className="skills-title" variants={fadeInUp}>
          My <span className="sk">Skills</span>
        </motion.h2>

        <motion.div className="filter-buttons" variants={fadeInUp}>
          {categories.map((category) => (
            <button
              key={category}
              className={`buttons ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-list"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          key={activeCategory} 
        >
          {filteredSkills.map((skill) => (
            <motion.div
              key={skill.name} 
              className="skill-item"
              variants={fadeInUp}
            >
              <h3 className="skill-name">{skill.name}</h3>
              <div className="skill-bar">
                <div
                  className="skill-level"
                  style={{ width: `${skill.level}%` }}
                ></div>
              </div>
              <div className="skill-percent">{skill.level}%</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};