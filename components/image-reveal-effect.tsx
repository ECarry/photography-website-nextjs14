'use client'

import { useRef, useState } from "react";
import Image from "next/image"
import { Photo } from "@prisma/client";
import { motion, useInView } from "framer-motion";

interface ImageRevealEffectProps {
  photo: Photo
}

const loadingVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const imageVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
};

const ImageRevealEffect = ({
  photo
}: ImageRevealEffectProps) => {
  const [isLoaded, setIsLoaded] = useState(false);
  //const [isInView, setIsInView] = useState(false);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      className='w-full h-full'
      ref={ref}
      initial={{ y: 10, opacity: 0 }}
      animate={isLoaded && isInView ? "visible" : "hidden"}
      variants={isLoaded ? imageVariants : loadingVariants}
      exit={{ y: -10, opacity: 0 }}
      transition={{ duration: 1 }}
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
