'use client';

import { motion } from "framer-motion";

interface MotionFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const MotionFadeIn = ({ children, className, delay = 0 }: MotionFadeInProps) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
        delay,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionFadeIn;
