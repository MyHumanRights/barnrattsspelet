'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import Modal from '../Modal'
import { PlayModal } from './PlayModal'
import styles from './SlimPlay.module.scss'

export const SlimPlay = ({ left }: { left: string }) => {
  const t = useTranslations()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const [showModal, setShowModal] = useState(false)

  const handleModal = () => {
    setShowModal(!showModal)
    document?.querySelector('html')?.classList.toggle('scroll-lock')
  }

  return (
    <>
      <motion.div
        className={styles.playButtonWrapper}
        initial={{ left: 0 }}
        animate={{
          left,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.XXLARGE}
          onClick={handleModal}
        >
          {t('home.play')}
        </Button>
      </motion.div>
      <AnimatePresence>
        {showModal && (
          <Modal onModalClose={handleModal}>
            <PlayModal handleModal={handleModal} />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
