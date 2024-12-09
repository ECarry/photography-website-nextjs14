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
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.3, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
};

export default MotionFadeIn;
