'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { Blurhash } from 'react-blurhash'

interface BlurImageProps extends Omit<ImageProps, 'onLoadingComplete'> {
  blurhash: string
}

export default function BlurImage({
  src,
  alt,
  width,
  height,
  fill,
  className,
  blurhash,
  ...props
}: BlurImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false)

  const containerStyle = fill
    ? 'absolute inset-0'
    : 'relative w-full h-full'

  return (
    <div className={containerStyle}>
      {!imageLoaded && (
        <div className="absolute inset-0">
          <Blurhash
            hash={blurhash}
            width="100%"
            height="100%"
            resolutionX={32}
            resolutionY={32}
            punch={1}
          />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        className={`${className} transition-opacity duration-500 ease-in-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoadingComplete={() => setImageLoaded(true)}
        {...props}
      />
    </div>
  )
}
