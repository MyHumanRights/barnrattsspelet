import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Close } from '../Icons/Close'
import { Link } from '../Link/Link'
import styles from './AlertBox.module.scss'

interface Props {
  showingSidebar: string
  sideBarWidth: number
}

export const AlertBox: React.FC<Props> = ({ showingSidebar, sideBarWidth }) => {
  const t = useTranslations()
  const {
    isMobile,
    shouldShowAlertBox,
    setShouldShowAlertBox,
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const [showAlertbox, setShowAlertBox] = useState(false)
  const [intervalId, setIntervalId] = useState<number>(0)
  const infoAndHelpRef = useRef()
  const TIME = showAlertbox ? 10000 : 20000

  useEffect(() => {
    if (shouldShowAlertBox) {
      const id: number = window.setInterval(() => {
        setShowAlertBox((prevShowAlertBox) => !prevShowAlertBox)
      }, TIME)

      setIntervalId(id)

      return () => clearInterval(id)
    }
  }, [shouldShowAlertBox, TIME])

  const animateConfig = {
    left: !isMobile
      ? showingSidebar === 'right'
        ? 0
        : `${sideBarWidth}px`
      : undefined,
    opacity: showAlertbox ? 1 : 0,
    scale: showAlertbox ? 1 : 0,
  }

  const closeAlertBox = () => {
    clearInterval(intervalId)
    setShowAlertBox(false)
    setShouldShowAlertBox(false)
  }

  if (!showAlertbox) return null

  return (
    <motion.aside
      className={styles.alertBoxWrapper}
      initial={{ left: 0, opacity: 1, scale: 1 }}
      animate={animateConfig}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        scale: { delay: 0.5 },
      }}
      style={{ width: `${sideBarWidth}px` }}
    >
      <div className={styles.heading}>
        <h2>{t('home.moreinfoheading')}</h2>
        <button
          onClick={closeAlertBox}
          className={styles.closeButton}
          aria-label={t('close')}
        >
          <Close />
        </button>
      </div>
      <p>{t('home.moreinfotext')}</p>
      <Link
        to='/help'
        variant={ButtonVariant.PRIMARY}
        size={ButtonSize.SMALL}
        aria-label={t('readmoreonhelp')}
        ref={infoAndHelpRef}
      >
        {t('readmore')}
      </Link>
    </motion.aside>
  )
}
