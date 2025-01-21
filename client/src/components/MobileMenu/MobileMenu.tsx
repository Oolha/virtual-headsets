import { motion, AnimatePresence } from "framer-motion";
import { FaWindowClose } from "react-icons/fa";
import css from "./MobileMenu.module.css";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const MobileMenu = ({ isOpen, onClose, children }: MobileMenuProps) => {
  const menuVariants = {
    closed: {
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
      },
    },
  };

  const backdropVariants = {
    closed: {
      opacity: 0,
      transition: { delay: 0.2 },
    },
    open: { opacity: 1 },
  };

  const containerVariants = {
    open: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={css.backdrop}
          onClick={onClose}
          initial="closed"
          animate="open"
          exit="closed"
          variants={backdropVariants}
        >
          <motion.div
            className={css.menuContent}
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className={css.closeBtn}>
              <FaWindowClose className={css.closeIcon} />
            </button>

            <motion.div
              className={css.linksContainer}
              variants={containerVariants}
            >
              {children}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
