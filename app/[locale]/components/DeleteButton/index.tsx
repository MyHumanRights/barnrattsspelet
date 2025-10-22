'use client'

import { AnimatePresence, LazyMotion, m } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button } from '../Button'
import { Check } from '../Icons/Check'
import { Trashbin } from '../Icons/Trashbin'
import styles from './DeleteButton.module.scss'

const loadFeatures = () =>
  import('../../../../utils/features.js').then((res) => res.default)

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
      <LazyMotion features={loadFeatures}>
        <AnimatePresence>
          {deleted ? (
            <m.p
              className={styles.deletedText}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {t('deleted')} <Check />
            </m.p>
          ) : (
            <m.div>
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
                <m.span animate={animate}>
                  <Trashbin />
                </m.span>
              </Button>
            </m.div>
          )}
        </AnimatePresence>
      </LazyMotion>
    </div>
  )
}
