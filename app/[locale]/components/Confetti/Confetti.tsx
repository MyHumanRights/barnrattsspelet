'use client'

import { type Container } from '@tsparticles/engine'
import { loadConfettiPreset } from '@tsparticles/preset-confetti'
import Particles, { initParticlesEngine } from '@tsparticles/react'
import { useEffect, useState } from 'react'

export const Confetti = () => {
  const [init, setInit] = useState(false)

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadConfettiPreset(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  const particlesLoaded = async (container?: Container): Promise<void> => {
    process.env.NEXT_PUBLIC_APP_ENV === 'development' && console.log(container)
  }

  if (init) {
    return (
      <Particles
        id='tsparticles'
        particlesLoaded={particlesLoaded}
        options={{
          emitters: {
            position: {
              x: 50,
              y: 80,
            },
            rate: {
              quantity: 100, // how many?
              delay: 0.75, // how often?
            },
            life: {
              count: 0,
              duration: 0.1,
              delay: 0.4,
            },
          },
          fullScreen: { enable: true },
          interactivity: {
            detectsOn: 'window',
          },
          particles: {
            color: {
              value: ['#E60080', '#4F1E6F', '#F39200', '#0090CF'],
            },
            move: {
              decay: 0.05, // Slow down particles
              direction: 'top',
              enable: true,
              gravity: {
                enable: true,
                maxSpeed: 150,
              },
              outModes: {
                top: 'none',
                default: 'destroy',
              },
              speed: { min: 50, max: 75 },
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: 'random',
              animation: {
                enable: true,
                speed: 30,
              },
            },
            tilt: {
              direction: 'random',
              enable: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 30,
              },
            },
            size: {
              value: 4,
            },
            roll: {
              darken: {
                enable: true,
                value: 25,
              },
              enable: true,
              speed: {
                min: 5,
                max: 15,
              },
            },
            wobble: {
              distance: 30,
              enable: true,
              speed: {
                min: -15,
                max: 15,
              },
            },
            shape: {
              type: ['circle', 'square'],
            },
          },
          preset: 'confetti',
        }}
      />
    )
  }

  return <></>
}
