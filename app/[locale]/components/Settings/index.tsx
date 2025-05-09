'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useState } from 'react'

import {
  getAvatar,
  getCardHand,
  getFirstTimeLootBox,
  getFirstTimePlaying,
  readDefeatedAntagonists,
  readSettings,
  readTokens,
  readWrongAnswers,
  resetWrongAnswers,
  setActiveUser,
  setAvatar,
  setAvatarPartCollection,
  setCardHand,
  setDefeatedAntagonists,
  setFirstTimeLootBox,
  setFirstTimePlaying,
  setTokens,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { getRandomAvatar } from '@/utils/avatar-utils'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { IAvatarColors, IAvatarParts } from '@/utils/types'

import { Button } from '../Button'
import ConfigIcon from '../Icons/ConfigIcon'
import Modal from '../Modal'
import styles from './Settings.module.scss'
import { SettingsModal } from './SettingsModal'

interface Props {
  defaultAvatarParts: IAvatarParts
  avatarColors: IAvatarColors
}

export const Settings: React.FC<Props> = ({
  defaultAvatarParts,
  avatarColors,
}) => {
  const t = useTranslations('Settings')
  const {
    isMobile,
    setOptions,
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const [showModal, setShowModal] = useState(false)

  const [animate, trigger] = useAnimation({
    rotation: shouldReduceMotion ? 0 : 40,
  })
  const reducedMotion = useReducedMotion() || isMobile

  // Ensure the active user is always set
  useMemo(() => {
    setActiveUser({ name: 'JaneDoe' })
  }, [])

  useEffect(() => {
    const avatar = getAvatar()
    const firstTimePlaying = getFirstTimePlaying()
    const firstTimeLootBox = getFirstTimeLootBox()
    const cards = getCardHand()
    const defeatedAntagonists = readDefeatedAntagonists()
    const tokens = readTokens()
    const wrongAnswers = readWrongAnswers()

    // Initialize missing data
    if (!avatar) {
      const randomAvatar = getRandomAvatar(defaultAvatarParts, avatarColors)
      setAvatarPartCollection(defaultAvatarParts)
      setAvatar(randomAvatar)
    }

    if (firstTimePlaying == null) setFirstTimePlaying(true)
    if (firstTimeLootBox == null) setFirstTimeLootBox(false)
    if (!cards) setCardHand([])
    if (!defeatedAntagonists) setDefeatedAntagonists([])
    if (!tokens) setTokens(0)
    if (!wrongAnswers) resetWrongAnswers()

    // Apply settings
    setOptions(readSettings(reducedMotion))
  }, [reducedMotion, setOptions, defaultAvatarParts, avatarColors])

  const handleModal = () => {
    setShowModal((prev) => !prev)
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
          <motion.span animate={animate}>
            <ConfigIcon />
          </motion.span>
        </Button>
      </div>
      <AnimatePresence>
        {showModal && (
          <Modal onModalClose={handleModal}>
            <SettingsModal
              handleModal={handleModal}
              avatarColors={avatarColors}
              avatarParts={defaultAvatarParts}
            />
          </Modal>
        )}
      </AnimatePresence>
    </>
  )
}
