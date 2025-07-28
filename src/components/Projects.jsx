import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const Projects = () => {
    
  return (
    
    <motion.section
    
      id="projects"
      className="projects"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >

 
       <h2 className="projects-title">
          My <span className="pj">Projects</span>
        </h2>
      <motion.div
        className="project-grid"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
      >
        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{ backgroundImage: "url('/projects/WaitApp.png')" }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          />
          <h3>  Admin Panel for Patient Overview System</h3>
          <p>
            Developed an admin panel for patient data management with secure authentication, REST APIs, and real-time blood pressure charts featuring search and sort functionality.
          </p>
          <div className="project-tech">
                <span>React</span>
                <span>TypeScript</span>
                <span>java</span>
                <span>Keycloak</span>
                <span>PostgreSQL</span>
                <span>Docker</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/BallBrawl.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Ball Brawl  Network Based 2D Multiplayer Game</h3>
          <p>
            Developed a 2D multiplayer soccer game for
             up to four players, 
             implementing game mechanics and MVC 
             architecture to create a stable,
              responsive prototype.

          </p>
          <div className="project-tech">
            <span>C</span>
            <span>SDL2</span>
            <span>TCP/IP</span>
            <span>MVC</span>
            <span> Scrum</span>
          </div>
        </motion.div>

        <motion.div
          className="project-card"
          variants={fadeInUp}
          whileHover={{ y: -10, transition: { duration: 0.2 } }}
        >
          <motion.div
            className="project-image"
            style={{
              backgroundImage: "url('/projects/DriveMyKids.png')",
            }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          />
          <h3>Drive My Kid – Carpooling Prototype for Children</h3>
          <p>
           Designed a mobile app for parental carpooling using Figma, 
           incorporating user testing and needs analysis to create 
           a clickable prototype with intuitive UI and built-in safety features.
          </p>
          <div className="project-tech">
            <span>Figma</span>
            <span>UX Research</span>
            <span>Usability Testing</span>
            <span>Design Thinking</span>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};