"use client";

import { useRef } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  UseInViewOptions,
} from "framer-motion";

type MarginType = UseInViewOptions["margin"];

interface MotionFadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  margin?: MarginType;
}

const MotionFadeIn = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 20,
  blur = "6px",
  margin = "-50px" as MarginType,
}: MotionFadeInProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        className={className}
        initial={{
          opacity: 0,
          y: yOffset,
          filter: `blur(${blur})`,
        }}
        animate={
          isInView
            ? {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
              }
            : {
                opacity: 0,
                y: yOffset,
                filter: `blur(${blur})`,
              }
        }
        transition={{
          duration,
          ease: [0.22, 1, 0.36, 1],
          delay: delay + 0.04,
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default MotionFadeIn;
