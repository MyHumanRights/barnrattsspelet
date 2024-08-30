'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { readGameStateValue, setGameStateValue } from '@/api/storage'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import styles from './SlimPlay.module.scss'

const PlayModal = dynamic(() =>
  import('./PlayModal').then((mod) => mod.PlayModal)
)

export const SlimPlay = () => {
  const t = useTranslations()
  const [isSlim, setIsSlim] = useState<boolean | null>(false)

  useEffect(() => {
    const getPlayMode = async () => {
      const isSlimPlay = await readGameStateValue('isSlimPlay')
      setIsSlim(isSlimPlay)
    }

    getPlayMode()
  }, [])

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
