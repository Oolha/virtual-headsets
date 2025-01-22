import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

type AnimationType = "fadeIn" | "fadeUp" | "slideLeft" | "slideRight" | "scale";

interface AnimationWrapperProps {
  children: ReactNode;
  type?: AnimationType;
  duration?: number;
  delay?: number;
  onScroll?: boolean;
  className?: string;
}

const animations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

const AnimationWrapper = ({
  children,
  type = "fadeIn",
  duration = 0.6,
  delay = 0,
  onScroll = false,
  className = "",
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.3,
  });

  const animation = animations[type];

  const transition = {
    duration,
    delay,
    ease: "easeOut",
  };

  if (onScroll) {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={animation}
        transition={transition}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={animation}
      transition={transition}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
