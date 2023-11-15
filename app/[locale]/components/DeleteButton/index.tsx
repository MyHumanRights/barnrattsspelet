'use client'

import { useState } from 'react'
import { motion, AnimatePresence, MotionConfig } from 'framer-motion'
import { useTranslations } from 'use-intl'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { Button } from '../Button'
import { Trashbin } from '../Icons/Trashbin'
import { Check } from '../Icons/Check'
import styles from './DeleteButton.module.scss'

export const DeleteButton: React.FC = () => {
  const t = useTranslations('Cookiepolicy')
  const [deleted, setDeleted] = useState(false)
  const [animate, trigger] = useAnimation({ y: 2 })

  const deleteLocalStorage = () => {
    localStorage.clear()
    setDeleted(true)
  }
  return (
    <div className={styles.deleteBtnWrapper}>
      <AnimatePresence>
        <MotionConfig transition={{ duration: 0.75 }}>
          {deleted ? (
            <motion.p
              className={styles.deletedText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t('deleted')} <Check />
            </motion.p>
          ) : (
            <motion.div>
              <Button
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
                onMouseEnter={trigger}
                onClick={deleteLocalStorage}
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                exit={{ opacity: 1 }}
              >
                {t('deletelocalstorage')}
                <motion.span animate={animate}>
                  <Trashbin />
                </motion.span>
              </Button>
            </motion.div>
          )}
        </MotionConfig>
      </AnimatePresence>
    </div>
  )
}
