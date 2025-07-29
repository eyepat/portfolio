import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="logo"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Bahaa <span className="lg">Portfolio</span>
      </motion.div>

      <div className="hamburger" onClick={toggleMenu}>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
        <div className={`bar ${isOpen ? "open" : ""}`}></div>
      </div>

      <ul className="nav-links desktop">
        {["home", "skills", "projects", "contact"].map((link) => (
          <li key={link}>
            <a href={`#${link}`}>{link.charAt(0).toUpperCase() + link.slice(1)}</a>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className="nav-links mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {["home", "skills", "projects", "contact"].map((link) => (
              <li key={link}>
                <a href={`#${link}`} onClick={() => setIsOpen(false)}>
                  {link.charAt(0).toUpperCase() + link.slice(1)}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
