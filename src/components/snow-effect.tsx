'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

interface Snowflake {
  id: number
  x: number
  y: number
  size: number
  speed: number
}

export const SnowEffect = () => {
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  // Handle mounting state
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted || theme !== 'dark') {
      setSnowflakes([])
      return
    }

    const createSnowflakes = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      return Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 3 + 2,
        speed: Math.random() * 2 + 1,
      }))
    }

    // Create initial snowflakes
    setSnowflakes(createSnowflakes())

    const animateSnow = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setSnowflakes(prevSnowflakes =>
        prevSnowflakes.map(flake => ({
          ...flake,
          y: flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y / 30) * 0.5,
          ...(flake.y > height && {
            y: -10,
            x: Math.random() * width,
          }),
        }))
      )
    }

    const animationInterval = setInterval(animateSnow, 50)

    const handleResize = () => {
      setSnowflakes(createSnowflakes())
    }

    window.addEventListener('resize', handleResize)

    return () => {
      clearInterval(animationInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [mounted, theme])

  // Don't render anything until mounted to prevent hydration mismatch
  if (!mounted || theme !== 'dark') return null

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 50,
      }}
    >
      {snowflakes.map(flake => (
        <div
          key={flake.id}
          style={{
            position: 'absolute',
            left: `${flake.x}px`,
            top: `${flake.y}px`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            background: 'white',
            borderRadius: '50%',
            opacity: 0.8,
            filter: 'blur(0.5px)',
            transition: 'transform 0.1s ease',
          }}
        />
      ))}
    </div>
  )
}
