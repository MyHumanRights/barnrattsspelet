import '../../../global.scss'

import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

import styles from './Healthbar.module.scss'

export const Healthbar = ({ health }) => {
  const [progressAnimation, setProgressAnimation] = useState('')
  const t = useTranslations('healthbar')
  const starAnimation = useAnimation()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  useEffect(() => {
    let healthAnimation = {
      scale: [1, 1.3, 0.9, 1],
      rotate: ['360deg', '360deg', '0deg', '0deg'],
      transition: { times: [0, 0.1, 0.9, 1] },
    }

    setProgressAnimation(styles.progressAnimation)

    if (shouldReduceMotion) {
      healthAnimation = {
        transition: { times: [0, 0.01] },
      }
      setProgressAnimation('')
    }
    starAnimation.start(() => healthAnimation)
  }, [health, starAnimation, shouldReduceMotion])

  return (
    <section className={styles.healthbar}>
      <div className={styles.star}>
        <motion.div animate={starAnimation}>
          <svg
            className={styles.starShadow}
            width='71'
            height='64'
            viewBox='0 0 71 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M23.4217 22.1599L32.0243 0L48.2162 20.9656L71 12.6874L57.7059 34.8408L70.5791 47.5249L47.0279 50.1151L44.9234 64L32.5715 51.5859L5.67249 62.6431L17.9143 41.1308L0 24.3661L23.4217 22.1599Z' />
          </svg>
          <svg
            width='71'
            height='64'
            viewBox='0 0 71 64'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M23.4217 22.1599L32.0243 0L48.2162 20.9656L71 12.6874L57.7059 34.8408L70.5791 47.5249L47.0279 50.1151L44.9234 64L32.5715 51.5859L5.67249 62.6431L17.9143 41.1308L0 24.3661L23.4217 22.1599Z' />
          </svg>
        </motion.div>
      </div>
      <label htmlFor='progress'>{t('persuation')}</label>
      <progress
        className={progressAnimation}
        id='progress'
        max='100'
        value={health}
      >{`${health}%`}</progress>
    </section>
  )
}
