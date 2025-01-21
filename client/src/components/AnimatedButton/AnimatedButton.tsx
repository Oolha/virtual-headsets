import { motion } from "framer-motion";
import { ReactNode } from "react";
import css from "./AnimatedButton.module.css";

interface AnimatedButtonProps {
  onClick?: () => void;
  children: ReactNode;
  className?: string;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const AnimatedButton = ({
  onClick,
  children,
  className = "",
  icon,
  variant = "primary",
  type = "button",
  disabled = false,
}: AnimatedButtonProps) => {
  return (
    <motion.button
      type={type}
      className={`${css.button} ${css[variant]} ${className} ${
        disabled ? css.disabled : ""
      }`}
      onClick={onClick}
      disabled={disabled}
      whileHover={
        !disabled
          ? {
              scale: 1.05,
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }
          : {}
      }
      whileTap={
        !disabled
          ? {
              scale: 0.95,
              transition: {
                duration: 0.1,
              },
            }
          : {}
      }
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
    >
      {children}
      {icon && !disabled && (
        <motion.div
          style={{ display: "inline-block", marginLeft: "8px" }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        ></motion.div>
      )}
    </motion.button>
  );
};

export default AnimatedButton;
