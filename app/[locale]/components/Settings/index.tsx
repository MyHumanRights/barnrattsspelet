'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { Button } from '../Button/Button'
import ConfigIcon from '../Icons/ConfigIcon'
import { SettingsModal } from './SettingsModal'
import styles from './Settings.module.scss'
import Modal from '../Modal/Modal'

export const Settings: React.FC = () => {
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  const [showModal, setShowModal] = useState(false)

  const [animate, trigger] = useAnimation({
    rotation: shouldReduceMotion ? 0 : 40,
  })

  const t = useTranslations('Settings')

  const handleModal = () => {
    setShowModal(!showModal)
    document?.querySelector('html')?.classList.toggle('scroll-lock')
  }

  return (
    <>
      <div className={styles.configWrapper}>
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onClick={handleModal}
          onMouseEnter={trigger}
          aria-label={t('open')}
        >
          <motion.span className={styles.config} animate={animate}>
            <ConfigIcon />
          </motion.span>
        </Button>
      </div>
      <AnimatePresence>
        {showModal && (
          <Modal onModalClose={handleModal}>
            <SettingsModal handleModal={handleModal} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
