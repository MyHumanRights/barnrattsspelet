'use client'

import { useCallback, useEffect, useState } from 'react'

import { useOptionsContext } from '../../contexts/OptionsContext'

type UseAnimationReturn = [{}, () => void]

export const useAnimation = ({
  rotation = 0,
  scale = 1,
  x = 0,
  y = 0,
  config = {
    type: 'spring',
    damping: 10,
    stiffness: 300,
  },
}): UseAnimationReturn => {
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const [isBooped, setIsBooped] = useState(false)

  const animate = {
    rotate: isBooped ? `${rotation}deg` : '0deg',
    scale: isBooped ? scale : 1,
    translateX: isBooped ? x : 0,
    translateY: isBooped ? y : 0,
    transition: config,
  }

  useEffect(() => {
    if (!isBooped) {
      return
    }
    const timeoutId = window.setTimeout(() => {
      setIsBooped(false)
    }, 150)
    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [isBooped])

  const trigger = useCallback(() => {
    setIsBooped(true)
  }, [])

  const appliedAnimation = shouldReduceMotion ? {} : animate

  return [appliedAnimation, trigger]
}
