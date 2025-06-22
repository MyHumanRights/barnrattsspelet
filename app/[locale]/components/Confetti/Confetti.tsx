import { useCallback, useEffect, useState } from 'react'

type ConfettiProps = {
  isActive: boolean
}

type ConfettiParticle = {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
  shape: 'square' | 'circle'
  opacity: number
}

const CONFETTI_COLORS = ['#E60080', '#4F1E6F', '#F39200', '#0090CF']

export const Confetti = ({ isActive }: ConfettiProps) => {
  const [particles, setParticles] = useState<ConfettiParticle[]>([])

  const createParticle = useCallback((startX: number): ConfettiParticle => {
    return {
      id: Math.random(),
      x: startX + (Math.random() - 0.5) * 200, // Wider horizontal spread
      y: window.innerHeight,
      vx: (Math.random() - 0.5) * 12, // Stronger horizontal velocity for more spread
      vy: -(Math.random() * 15 + 10), // Negative for upward movement
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      size: Math.random() * 6 + 4,
      color:
        CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
      shape: Math.random() > 0.5 ? 'circle' : 'square',
      opacity: Math.random() * 0.5 + 0.5,
    }
  }, [])

  useEffect(() => {
    if (!isActive) {
      setParticles([])
      return
    }

    const centerX = window.innerWidth / 2
    // Continuously create bursts of particles
    const burstInterval = setInterval(() => {
      // Increase number of confetti per burst for more particles
      const burstParticles = Array.from({ length: 150 }, () =>
        createParticle(centerX)
      )
      setParticles((prev) => [...prev, ...burstParticles])
    }, 1500)

    // Animation loop
    const animationInterval = setInterval(() => {
      setParticles((prevParticles) =>
        prevParticles
          .map((particle) => ({
            ...particle,
            x: particle.x + particle.vx,
            y: particle.y + particle.vy,
            vy: particle.vy + 0.3, // Gravity
            rotation: particle.rotation + particle.rotationSpeed,
            opacity: particle.opacity - 0.01,
          }))
          .filter(
            (particle) =>
              particle.opacity > 0 &&
              particle.y > -50 &&
              particle.x > -50 &&
              particle.x < window.innerWidth + 50
          )
      )
    }, 16) // ~60fps

    return () => {
      clearInterval(burstInterval)
      clearInterval(animationInterval)
    }
  }, [isActive, createParticle])

  if (!isActive && particles.length === 0) return null

  return (
    <div className='fixed inset-0 pointer-events-none z-40'>
      {particles.map((particle) => (
        <div
          key={particle.id}
          className='absolute'
          style={{
            left: `${particle.x}px`,
            top: `${particle.y}px`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            borderRadius: particle.shape === 'circle' ? '50%' : '0',
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.opacity,
          }}
        />
      ))}
    </div>
  )
}
