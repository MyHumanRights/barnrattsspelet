import '../../../global.scss'

import { motion, useAnimation } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'

import {
  getColorForPart,
  getNextLevel,
  getPartsForLevel,
  hasWonLevel,
} from '@/api/engine'
import {
  getAvatar,
  getCurrentLevel,
  getProgress,
  setProgress,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { delay } from '@/utils/delay'
import { IAvatar, levels } from '@/utils/types'

import { AvatarPart } from '../AvatarPart'
import { Loader } from '../Loader'
import styles from './Progressbar.module.scss'

export const Progressbar = () => {
  const t = useTranslations('progressbar')
  const [hasAnimated, setHasAnimated] = useState(false)
  const [level, setLevel] = useState(1)
  const [storedAvatar, setStoredAvatar] = useState<IAvatar | null>()
  const [currentPartIndex, setCurrentPartIndex] = useState(0)
  const [progressInPercentage, setProgressInPercentage] = useState(0)
  const [progress, setStateProgress] = useState({ level: 1, part: 0 })
  const heartAnimation = useAnimation()
  const levelControls = useAnimation()
  const partControls = useAnimation()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const uuid = crypto.randomUUID()
  const levelParts = getPartsForLevel(level)

  useEffect(() => {
    // Animation for the heart
    let progressbarAnimation = {
      scale: [1, 1.1, 0.85, 1],
      transition: { times: [0, 0.1, 0.9, 1], delay: 1 },
    }

    if (shouldReduceMotion) {
      progressbarAnimation = {
        scale: [1, 1],
        transition: { times: [0, 0.01], delay: 1 },
      }
    }

    heartAnimation.start(() => progressbarAnimation)
  }, [progressInPercentage, heartAnimation, shouldReduceMotion])

  const updateProgress = useCallback(async () => {
    const progress = (await getProgress()) || { level: 1, part: 0 }
    setStateProgress(progress)
    setLevel(progress.level)
    setCurrentPartIndex(progress.part - 1)
  }, [])

  useEffect(() => {
    const setAvatar = async () => {
      setStoredAvatar(await getAvatar())
    }

    setAvatar()
    updateProgress()
  }, [updateProgress])

  const saveAndupdateProgress = useCallback(async () => {
    await delay(1000)
    await setProgress(progress.level + 1, 0)
    updateProgress()
    await delay(100)
    if (!hasAnimated) {
      partControls.start({
        scale: [1, 1.1, 0.9, 1],
        transition: {
          duration: 1,
          ease: 'easeInOut',
          times: [0, 0.33, 0.66, 1],
        },
      })
    }
    setHasAnimated(true)
    await delay(2000)
    levelControls.start({
      scale: [1, 1.8, 0.8, 1.5, 0.9, 1.2, 0.95, 1],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
      },
    })

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateProgress, progress, levelControls, partControls])

  useEffect(() => {
    // For animating the progress bar
    const level = getCurrentLevel(progress)
    const progressInLevel = (progress.part / (level?.parts.length ?? 1)) * 100
    setProgressInPercentage(progressInLevel)
    const nextLevel = getNextLevel(progress, levels)

    // Check if the user has won the level
    // If so, we want to update the progres bar to the next level
    if (level && hasWonLevel(progress, level) && nextLevel) {
      saveAndupdateProgress()
    }
  }, [progress, levelParts, saveAndupdateProgress])

  const getPositionOfPart = (index: number) => {
    const precentage = (100 / levelParts.length) * (index + 1)
    if (index === levelParts.length - 1) {
      return { left: '99%' }
    }
    return { left: `${precentage}%` }
  }

  if (!storedAvatar) {
    return <Loader />
  }

  const MotionAvatarPart = motion(AvatarPart)

  return (
    <section className={styles.progressbar}>
      <h2 className={styles.level}>
        <span className='sr-only'>{t('level')}</span>
        <motion.span animate={levelControls}>{progress.level}</motion.span>
      </h2>
      <div className={styles.innerBar}>
        <label htmlFor='progress'>{t('progress')}</label>
        {progressInPercentage >= 9 && (
          <span
            className={styles.percentage}
          >{`${progressInPercentage}%`}</span>
        )}
        <progress
          className={shouldReduceMotion ? '' : styles.progressAnimation}
          id='progress'
          max='100'
          value={progressInPercentage}
        >
          {`${progressInPercentage}%`}
        </progress>
        <div className={styles.levelParts}>
          {levelParts.map((part, index) => (
            <div
              key={`${index}-${uuid}`}
              className={styles.part}
              style={getPositionOfPart(index)}
            >
              <span
                className={`${styles.star} ${
                  index <= currentPartIndex ? styles.active : ''
                }`}
              ></span>
              <motion.div
                className={`${styles.avatarCard} ${part}`}
                animate={partControls}
              >
                <AvatarPart avatarPart='Base01' fill='gray' />
                <MotionAvatarPart
                  avatarPart={part}
                  fill={getColorForPart(part, storedAvatar)}
                />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`${styles.heart} ${
          progressInPercentage >= 100 && styles.filled
        }`}
      >
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
