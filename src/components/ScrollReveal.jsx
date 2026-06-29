import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.12 });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 55, scale: 0.88, rotateX: -8 }}
      animate={isInView ? {
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0
      } : {}}
      transition={{
        duration: 0.85,
        delay: delay,
        ease: [0.16, 1, 0.3, 1] // Custom deceleration curve mimicking premium hardware sites
      }}
      style={{ transformOrigin: "top center", perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
