import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import styles from './Box.module.scss'

const Box = ({ onClick, openBox }) => {
  const t = useTranslations()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const [animation, setAnimation] = useState(false)

  const DURATION = shouldReduceMotion ? 0.0001 : 1
  const DELAY = shouldReduceMotion ? 0.0001 : 0.5
  const TIME = 1000

  const DIV = shouldReduceMotion ? 'div' : motion.div

  const ref = useRef()

  const variants = {
    start: {
      rotate: [-4.5, 5.3, 1, -3.9, 3.3, 0.5, -1.2, 1.4, 0],
      transition: {
        duration: 0.25,
      },
    },
    stop: {
      rotate: 0,
    },
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(!animation)
    }, TIME)

    return () => clearTimeout(timer)
  }, [animation])

  return (
    <motion.div
      className={styles.boxWrapper}
      initial={{
        scale: 1,
        y: 0,
      }}
      animate={
        openBox && {
          scale: 0.4,
          y: '120px',
        }
      }
      transition={{ type: 'tween', delay: DELAY * 4, duration: DURATION }}
    >
      <DIV
        onClick={() => ref.current.click()}
        controls
        animate={animation && !openBox ? 'start' : 'stop'}
        variants={variants}
      >
        <div className={styles.box}>
          <button className='sr-only' ref={ref} onClick={onClick}>
            {t('openlootbox')}
          </button>
          <div className={`${styles.side} ${styles.front}`} />
          <div
            className={`${styles.side} ${styles.bottom}`}
            style={{
              backgroundImage: 'url("/images/box/side.svg")',
            }}
          />
          <div
            className={`${styles.side} ${styles.left}`}
            style={{
              backgroundImage: 'url("/images/box/side.svg")',
            }}
          />
          <div className={`${styles.side} ${styles.right}`} />
          <motion.div
            initial={{
              y: '100px',
              rotateY: 0,
              rotateX: '90deg',
            }}
            animate={
              openBox && {
                y: '100px',
                rotateY: '230deg',
                rotateX: '90deg',
              }
            }
            transition={{ type: 'tween', duration: DURATION }}
            className={`${styles.side} ${styles.top1}`}
          />
          <motion.div
            initial={{
              y: '100px',
              x: '100px',
              rotateY: 0,
              rotateX: '90deg',
            }}
            animate={
              openBox && {
                y: '100px',
                x: '100px',
                rotateX: '90deg',
                rotateY: '-230deg',
              }
            }
            transition={{ type: 'tween', duration: DURATION, delay: DELAY }}
            className={`${styles.side} ${styles.top2}`}
          />
          <motion.div
            initial={{
              y: '100px',
              z: '100px',
              rotateX: '90deg',
            }}
            animate={
              openBox && {
                y: '100px',
                z: '100px',
                rotateX: '320deg',
              }
            }
            transition={{ type: 'tween', duration: DURATION, delay: DELAY * 2 }}
            className={`${styles.side} ${styles.top3}`}
          />
          <motion.div
            initial={{
              y: '200px',
              z: '-100px',
              rotateX: '90deg',
            }}
            animate={
              openBox && {
                y: '200px',
                z: '-100px',
                rotateX: '-140deg',
              }
            }
            transition={{ type: 'tween', duration: DURATION, delay: DELAY * 3 }}
            className={`${styles.side} ${styles.top4}`}
          />
          <div
            className={`${styles.side} ${styles.back}`}
            style={{
              backgroundImage: 'url("/images/box/side.svg")',
            }}
          />
        </div>
      </DIV>
    </motion.div>
  )
}

export default Box
