'use client'

import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { readGameStateValue, setGameStateValue } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import styles from './SlimPlay.module.scss'

const PlayModal = dynamic(() =>
  import('./PlayModal').then((mod) => mod.PlayModal)
)

export const SlimPlay = ({ left }: { left: string }) => {
  const t = useTranslations()
  const [isSlim, setIsSlim] = useState<boolean | null>(false)
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

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
        {isSlim && <PlayModal handleModal={handleModal} />}
      </AnimatePresence>
    </>
  )
}
