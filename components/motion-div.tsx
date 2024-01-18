'use client'

import { motion } from "framer-motion";

const MotionDiv = ({
  children,
  className
}: {
  children: React.ReactNode,
  className?: string
}) => {
  return (
    <motion.div 
      className={className}
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 0.75 }}
    >
      {children}
    </motion.div>
  )
}

export default MotionDiv
