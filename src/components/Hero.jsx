import {motion, scale} from "framer-motion";


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


export const Hero = () => {
    return(
    <motion.section
        id ="home"
        className="hero" 
        initial ={{opacity: 0}}
        animate = {{opacity: 1}}
        transition={{duration: 0.8,delay: 0.2 }}
        > 
        <div className="hero-container">
            
            <motion.div className="hero-content" 
            variants={staggerContainer} 
            initial = "initial"
            animate = "animate"
            >
            <motion.div className="hero-badge">
                <span>👋Hello, I'm </span>
            </motion.div>
            <motion.h1
                className ="glitch"
                variants={fadeInUp} 
                 whileHover={{scale:1.03}}
              >
                Bahaa Hamed
                </motion.h1>
                <motion.h2 className="hero-subtitle" variants={fadeInUp}>
            
            Junior Fullstack Developer
          </motion.h2>
          <motion.p className="hero-description" variants={fadeInUp}>
          Final-year Computer Engineering student at KTH, specializing in fullstack web development.  
          I craft clean, scalable, and user-friendly applications and enjoy turning complex problems into elegant, user-centered solutions.
          </motion.p>
          <motion.div 
          className="cta-buttons"
          variants={staggerContainer}
          >
            <motion.a 
            href="#projects" 
              className="cta-primary" 
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}
            > View My Work
            </motion.a>
             <motion.a 
             href="#contacts" className="cta-secondary"
              whileHover={{scale: 1.05}}
              whileTap={{scale: 0.95}}>
              Contact Me
             </motion.a>
          </motion.div>
          <motion.div
          className="social-links"
          variants={staggerContainer}
          >
            <motion.a href = "https://github.com/eyepat"  target="_blank">
              <i className="fab fa-github"></i>
            </motion.a>
            <motion.a href = "https://www.linkedin.com/in/bahaa-hamed-9424111a9" target="_blank" >
              <i className="fab fa-linkedin"></i>
            </motion.a>
           

          </motion.div>

          </motion.div>
        </div>
    </motion.section>
    );
}