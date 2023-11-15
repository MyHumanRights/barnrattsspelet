'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import {
  setActiveUser,
  setCardHand,
  getCardHand,
  readDefeatedAntagonists,
  setDefeatedAntagonists,
  readTokens,
  setTokens,
  readWrongAnswers,
  resetWrongAnswers,
  setFirstTimePlaying,
  getFirstTimePlaying,
  setFirstTimeLootBox,
  getFirstTimeLootBox,
  setAvatar,
  setAvatarPartCollection,
  getAvatar,
  readSettings,
} from '@/api/storage'
import { getRandomAvatar } from '@/api/engine'
import { Button } from '../Button'
import ConfigIcon from '../Icons/ConfigIcon'
import { SettingsModal } from './SettingsModal'
import styles from './Settings.module.scss'
import Modal from '../Modal'
import { IAvatarColors, IAvatarParts } from '@/utils/types'

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

  const init = async () => {
    // TODO: Set a user in a login state
    setActiveUser({ name: 'JohnDoe' })

    const [
      avatar,
      firstTimePlaying,
      firstTimeLootBox,
      cards,
      defeatedAntagonists,
      tokens,
      wrongAnswers,
    ] = await Promise.all([
      getAvatar(),
      getFirstTimePlaying(),
      getFirstTimeLootBox(),
      getCardHand(),
      readDefeatedAntagonists(),
      readTokens(),
      readWrongAnswers(),
    ])

    if (!avatar) {
      const randomAvatar = getRandomAvatar(defaultAvatarParts, avatarColors)
      await Promise.all([
        setAvatarPartCollection(defaultAvatarParts),
        setAvatar(randomAvatar),
      ])
    }

    if (firstTimePlaying == null) {
      await setFirstTimePlaying(true)
    }

    if (firstTimeLootBox == null) {
      await setFirstTimeLootBox(true)
    }

    if (!cards) {
      await setCardHand([])
    }

    if (!defeatedAntagonists) {
      await setDefeatedAntagonists([])
    }

    if (!tokens) {
      await setTokens(0)
    }

    if (!wrongAnswers) {
      await resetWrongAnswers()
    }

    // setDataInitialized(true)
  }

  useEffect(() => {
    ;(async function () {
      await init()
      const settings = await readSettings(reducedMotion)
      setOptions(settings)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion])

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
