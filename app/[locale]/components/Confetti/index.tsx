import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import { Engine } from 'tsparticles-engine'

export const Confetti = () => {
  const options = {
    fullScreen: { enable: true },
    interactivity: {
      detectsOn: 'window',
    },
    life: {
      duration: {
        sync: true,
        value: 5,
      },
      count: 1,
    },
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
      number: {
        value: 0, // Show only particles from emitter
      },
      opacity: {
        value: 1,
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
  }

  const particlesInit = async (main: Engine) => {
    await loadFull(main)
  }

  return (
    <Particles id='tsparticles' init={particlesInit} options={{ options }} />
  )
}
