'use client'

import { useEffect, useRef } from "react"
import Lottie from "lottie-react";

import github from '@/components/icons/Github/github.json'
import twitter from '@/components/icons/Twitter/twitter.json'
import instagram from '@/components/icons/Instagram/instagram.json'
import trash from '@/components/icons/Trash/trashV2.json'
import edit from '@/components/icons/Edit/edit.json'
import heart from '@/components/icons/Heart/heart.json'

interface IconProps {
  name: 'github' | 'twitter' | 'instagram' | 'trash' | 'edit' | 'heart';
  animated:  'CLICK' | 'HOVER';
  loop: boolean;
  size: number;
}

const iconMap = [
  {
    name: 'github',
    url: 'https://github.com',
    animation: github,
  },
  {
    name: 'twitter',
    url: 'https://x.com',
    animation: twitter,
  },
  {
    name: 'instagram',
    url: 'https://instagram.com',
    animation: instagram,
  },
  {
    name: 'trash',
    url: '#',
    animation: trash,
  },
  {
    name: 'edit',
    url: '#',
    animation: edit,
  },
  {
    name: 'heart',
    url: '#',
    animation: heart,
  },
]

const Icon = ({
  name,
  animated,
  loop,
  size
}: IconProps) => {
  const lottieRef = useRef<any | null>(null);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
  }

  useEffect(() => {
    if (animated === 'HOVER') lottieRef.current?.stop()
  }, [lottieRef, animated])

  const handleMouseEnter = () => {
    if (loop) {
      lottieRef.current?.play()
    } else {
      lottieRef.current?.setDirection(1)
      lottieRef.current?.play()
    }
  }

  const handleMouseLeave = () => {
    if (loop) {
      lottieRef.current?.stop()
    } else {
      lottieRef.current?.setDirection(-1)
      lottieRef.current?.play()
    }
  }

  const icon = iconMap.find(icon => icon.name === name)

  return (
    icon?.url === '#' 
    ?
    <Lottie
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        animationData={icon?.animation}
        lottieRef={lottieRef}
        loop={loop}
        style={style}
      />
    :
    <a 
      href={icon?.url}
      target="_blank"
      className="cursor-pointer"
      aria-label={name}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie 
        animationData={icon?.animation}
        lottieRef={lottieRef}
        loop={loop}
        style={style}
      />
    </a>
  )
}

export default Icon
