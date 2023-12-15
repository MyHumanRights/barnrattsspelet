import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useState } from 'react'
import useSound from 'use-sound'

import sideBarSound from '@/assets/sounds/fx/09-flip-card.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'

import { ChevronRight } from '../Icons/ChevronRight'
import styles from './Sidebar.module.scss'

export const Sidebar = ({
  children,
  isShowing = true,
  side = 'left',
  onToggle,
  width,
  setWidth,
}) => {
  const [hidePosition, setHidePosition] = useState()
  const [isRightSidebar, setIsRightSidebar] = useState(false)
  const {
    options: { soundEffectsOn, effectsVolume, shouldReduceMotion },
    isMobile,
  } = useOptionsContext()
  const [playSound] = useSound(sideBarSound, { volume: effectsVolume })
  const t = useTranslations()

  function handleClick() {
    soundEffectsOn && playSound()
    onToggle()
  }

  const getWidth = useCallback(() => {
    const sidebar = document.getElementById(`sidebar_${side}`)
    const width = sidebar?.offsetWidth
    setWidth(width)

    if (side === 'left') {
      setHidePosition(-width)
    } else if (side === 'right') {
      setHidePosition(width)
      setIsRightSidebar(true)
    }
  }, [setWidth, side])

  useEffect(() => {
    window.addEventListener('resize', getWidth)

    return () => {
      window.removeEventListener('resize', getWidth)
    }
  }, [getWidth])

  useEffect(() => {
    getWidth()
  }, [getWidth])

  return (
    <motion.section
      id={`sidebar_${side}`}
      className={`${styles.sidebar} ${styles[side]}`}
      initial={{
        x: !width
          ? side === 'left'
            ? -1000
            : 1000
          : side === 'left'
          ? -width
          : width,
      }}
      animate={{ x: isShowing ? 0 : hidePosition }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
    >
      <div className={styles.scrollWrapper}>{children}</div>
      {!isMobile && (
        <motion.button
          onClick={handleClick}
          className={`${styles.openToggler} ${styles[side]}`}
          aria-label={isShowing ? t('close') : t('open')}
        >
          <motion.span
            initial={
              isRightSidebar
                ? { rotate: isShowing ? '0deg' : '180deg' }
                : { rotate: isShowing ? '-180deg' : '0deg' }
            }
            animate={
              isRightSidebar
                ? { rotate: isShowing ? '0deg' : '180deg' }
                : { rotate: isShowing ? '-180deg' : '0deg' }
            }
            transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
          >
            <ChevronRight />
          </motion.span>
        </motion.button>
      )}
    </motion.section>
  )
}
