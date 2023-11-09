import { useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import Close from '../Icons/Close'
import { Link } from '../../components'
import styles from './AlertBox.module.scss'

const AlertBox = ({ showingSidebar, sideBarWidth }) => {
  const t = useTranslations()
  const {
    isMobile,
    shouldShowAlertBox,
    setShouldShowAlertBox,
    options: { shouldReduceMotion },
  } = useContext(OptionsContext)
  const [showAlertbox, setShowAlertBox] = useState(false)
  const [intervalId, setIntervalId] = useState(null)
  const infoAndHelpRef = useRef()
  const TIME = showAlertbox ? 10000 : 20000

  useEffect(() => {
    if (shouldShowAlertBox) {
      const id = setInterval(() => {
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
        <h2>{t('common:home:moreinfoheading')}</h2>
        <button
          onClick={closeAlertBox}
          className={styles.closeButton}
          aria-label={t('common:close')}
        >
          <Close />
        </button>
      </div>
      <p>{t('common:home:moreinfotext')}</p>
      <Link
        to='/help'
        variant={ButtonVariant.PRIMARY}
        size='small'
        aria-label={t('common:readmoreonhelp')}
        ref={infoAndHelpRef}
      >
        {t('common:readmore')}
      </Link>
    </motion.aside>
  )
}

export default AlertBox
