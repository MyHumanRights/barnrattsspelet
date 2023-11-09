import React from 'react'
import styles from './MapDescription.module.scss'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { useTranslations } from 'next-intl'
import { AnimatePresence, motion } from 'framer-motion'

const MapDescription = ({ environment, onClose }) => {
  const navigate = useNavigate()
  const t = useTranslations()
  function handleClick() {
    navigate('/deck-builder')
  }
  return (
    <AnimatePresence>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        trantition={{ duration: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        className={styles.backdrop}
        onClick={onClose}
      >
        <div className={`${styles.description} ${styles[environment]}`}>
          <p>
            <strong>{t(`common:map:${environment}:header`)}</strong>
          </p>
          <p>{t(`common:map:${environment}:body`)}</p>
          <div className={styles.ctaWrapper}>
            <Button onClick={handleClick} variant='secondary' size='small'>
              {t('common:map:choosecards')}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

export default MapDescription
