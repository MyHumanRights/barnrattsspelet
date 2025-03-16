import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

/* import getIsBrightColor from '@/utils/getIsBrightColor' */
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAnimation } from '@/utils/hooks/useAnimation'

import Sound from '../Icons/Sound'
import styles from './VoiceoverButton.module.scss'

export const VoiceoverButton = ({
  path = '08-talk',
  size = 'medium',
  variant = 'primary',
  // backgroundColor = '#FFFFFF',
  color = '#000000',
  ...otherProps
}) => {
  const { options, playVoiceover } = useOptionsContext()
  const [audio, setAudio] = useState<HTMLAudioElement | undefined>(undefined)
  const t = useTranslations()
  const [animateVoBtn, triggerVoBtn] = useAnimation({ scale: 1.4 })

  async function handlePlayVoiceover(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation()
    if (audio) {
      audio.pause()
      setAudio(undefined)
      return
    }
    const playingAudio = await playVoiceover(path)
    setAudio(playingAudio)
  }

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setAudio(undefined))
      return () => audio.removeEventListener('ended', () => setAudio(undefined))
    }
  }, [audio])

  return (
    options.voiceover && (
      <span onMouseEnter={triggerVoBtn}>
        <button
          onClick={handlePlayVoiceover}
          className={`${styles.button} ${styles[variant]} ${styles[size]}`}
          aria-label={t('playvoiceover')}
          /* style={{ color: getIsBrightColor(backgroundColor) ? '#000000' : '#FFFFFF' }} */
          style={{ color }}
          {...otherProps}
        >
          <motion.span animate={animateVoBtn} data-button='voiceover'>
            <Sound />
          </motion.span>
        </button>
      </span>
    )
  )
}
