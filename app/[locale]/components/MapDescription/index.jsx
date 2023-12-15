import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { useRouter } from '@/navigation'

import { Button } from '../Button'
import styles from './MapDescription.module.scss'

export const MapDescription = ({ environment, onClose }) => {
  const router = useRouter()
  const t = useTranslations()
  function handleClick() {
    router.push('/deck-builder')
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
            <strong>{t(`map.${environment}.header`)}</strong>
          </p>
          <p>{t(`map.${environment}.body`)}</p>
          <div className={styles.ctaWrapper}>
            <Button onClick={handleClick} variant='secondary' size='small'>
              {t('map.choosecards')}
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
