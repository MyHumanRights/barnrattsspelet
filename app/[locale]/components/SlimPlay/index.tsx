'use client'

import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { readGameStateValue, setGameStateValue } from '@/api/storage'
import { PlayModal } from '@/app/[locale]/components/SlimPlay/PlayModal'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import styles from './SlimPlay.module.scss'

export const SlimPlay = () => {
  const t = useTranslations()
  const [isSlim, setIsSlim] = useState<boolean | null>(() =>
    readGameStateValue('isSlimPlay')
  )

  const handleModal = () => {
    setGameStateValue({ isSlimPlay: true })
    setIsSlim(!isSlim)
  }

  return (
    <>
      <div className={styles.playButtonWrapper}>
        <Button
          variant={ButtonVariant.HUGE}
          size={ButtonSize.XXLARGE}
          onClick={handleModal}
        >
          {t('home.play')}
        </Button>
      </div>
      <AnimatePresence>
        {isSlim && <PlayModal handleModal={handleModal} />}
      </AnimatePresence>
    </>
  )
}
