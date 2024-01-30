'use client'

import { useState } from "react";
import MotionDiv from "./motion-div";
import Image from "next/image"
import { Photo } from "@prisma/client";
import { motion } from "framer-motion";

interface ImageRevealEffectProps {
  photo: Photo
}

const hiddenMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 30px, rgba(0,0,0,1) 30px, rgba(0,0,0,1) 30px)`;
const visibleMask = `repeating-linear-gradient(to right, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 0px, rgba(0,0,0,1) 0px, rgba(0,0,0,1) 30px)`;


const ImageRevealEffect = ({
  photo
}: ImageRevealEffectProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  
  return (
    <motion.div
      className='w-full h-full'
      // initial={{ y: 10, opacity: 0 }}
      // animate={
      //   isLoaded && isInView
      //     ? { y: 0, opacity: 1 }
      //     : { y: 0, opacity: 1 }
      // }
      // viewport={{ once: true }}
      // onViewportEnter={() => setIsInView(true)}
      // exit={{ y: -10, opacity: 0 }}
      // transition={{ duration: 0.75 }}
      initial={false}
        animate={
          isLoaded && isInView
            ? { WebkitMaskImage: visibleMask, maskImage: visibleMask }
            : { WebkitMaskImage: hiddenMask, maskImage: hiddenMask }
        }
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        onViewportEnter={() => setIsInView(true)}
    >
      <Image 
        src={photo.imageUrl}
        alt="image"
        width={photo.width}
        height={photo.width}
        priority
        onLoad={() => setIsLoaded(true)}
        className="max-h-full max-w-full object-contain h-full w-full" 
      />
    </motion.div>
  )
}

export default ImageRevealEffect
