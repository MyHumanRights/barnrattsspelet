import '../../../global.scss'

import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { getCurrentLevel, getProgress } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'

import styles from './Progressbar.module.scss'

export const Progressbar = () => {
  const [level, setLevel] = useState(1)
  const [progressAnimation, setProgressAnimation] = useState('')
  const [progress, setProgress] = useState(0)
  const t = useTranslations('progressbar')
  const heartAnimation = useAnimation()
  const { shouldReduceMotion } = useOptionsContext().options

  useEffect(() => {
    let progressbarAnimation = {
      scale: [1, 1.1, 0.85, 1],
      transition: { times: [0, 0.1, 0.9, 1], delay: 1 },
    }

    setProgressAnimation(styles.progressAnimation)

    if (shouldReduceMotion) {
      progressbarAnimation = {
        scale: [1, 1],
        transition: { times: [0, 0.01], delay: 1 },
      }
      setProgressAnimation('')
    }

    heartAnimation.start(() => progressbarAnimation)
  }, [progress, heartAnimation, shouldReduceMotion])

  useEffect(() => {
    const updateProgress = async () => {
      const progress = (await getProgress()) || { level: 1, part: 0 }
      const level = getCurrentLevel(progress)
      const progressInLevel = (progress.part / (level?.parts.length ?? 1)) * 100
      setLevel(progress.level)
      setProgress(progressInLevel)
    }

    updateProgress()
  }, [])

  return (
    <section className={styles.progressbar}>
      <h2 className={styles.level}>Nivå {level}</h2>
      <label htmlFor='progress'>{t('progress')}</label>
      {progress >= 9 && (
        <span className={styles.percentage}>{`${progress}%`}</span>
      )}
      <progress
        className={progressAnimation}
        id='progress'
        max='100'
        value={progress}
      >{`${progress}%`}</progress>
      <div className={`${styles.heart} ${progress >= 100 && styles.filled}`}>
        <motion.div animate={heartAnimation}>
          <svg
            viewBox='0 0 44 42'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M22.8832 3.92539C19.6347 3.76454 11.1369 -2.04191 4.51438 2.10107C-2.82999 6.69523 -0.3701 16.578 5.87576 26.1586C10.5327 33.3068 20.286 42.0479 23.5305 41.9145C26.0571 41.8086 34.8688 33.2833 39.2825 25.2013C43.7825 16.9624 47.2977 5.45547 38.9176 0.77892C33.6879 -2.14 26.4455 4.09801 22.8989 3.91754'
              fill='#0F2962'
            />
            <path
              d='M22.5737 9.44141C19.2075 9.17463 14.2249 4.59617 8.99519 7.7701C5.7781 9.73174 5.70749 14.9968 9.46991 21.2152C13.2323 27.4336 21.2397 34.0717 22.4167 34.0717C24.0135 34.0717 30.6909 28.1868 33.8727 22.7766C37.4586 16.6956 39.1377 9.24525 35.2145 7.5504C29.9298 5.27097 25.3474 9.66504 22.5619 9.44141'
              fill='#00A23A'
            />
            <path
              d='M21.8509 14.1259C19.6146 14.2201 16.4524 10.595 13.1608 12.0348C11.0736 12.9489 10.6813 15.7815 13.612 19.9284C16.1268 23.4594 20.9407 27.0335 21.6665 27.0335C22.6238 27.0335 26.0292 24.6795 28.289 21.7685C31.2314 17.9511 32.6595 14.3142 30.741 12.435C28.6146 10.3635 24.2284 14.0043 21.8509 14.1063'
              fill='#E63812'
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}
