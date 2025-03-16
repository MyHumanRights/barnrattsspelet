'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { getRandomAvatar } from '@/api/engine'
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
  setActiveUser({ name: 'JaneDoe' })

  const init = async () => {
    // TODO: Set a user in a login state

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
      await setFirstTimeLootBox(false)
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
