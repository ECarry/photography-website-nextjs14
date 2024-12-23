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
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([])

  useEffect(() => {
    if (theme !== 'dark') {
      setSnowflakes([])
      return
    }

    // Create initial snowflakes
    const initialSnowflakes: Snowflake[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
      speed: Math.random() * 2 + 1,
    }))

    setSnowflakes(initialSnowflakes)

    const animateSnow = () => {
      setSnowflakes(prevSnowflakes =>
        prevSnowflakes.map(flake => ({
          ...flake,
          y: flake.y + flake.speed,
          x: flake.x + Math.sin(flake.y / 30) * 0.5,
          // Reset position when snowflake reaches bottom
          ...(flake.y > window.innerHeight && {
            y: -10,
            x: Math.random() * window.innerWidth,
          }),
        }))
      )
    }

    const animationInterval = setInterval(animateSnow, 50)

    return () => {
      clearInterval(animationInterval)
    }
  }, [theme])

  if (theme !== 'dark') return null

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
            transition: 'transform 0.1s ease',
          }}
        />
      ))}
    </div>
  )
}
