import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

import { VoiceoverButton } from '../VoiceoverButton'

interface Props {
  textKey: string
  color?: string
}

export const TextWithVoiceover: React.FC<Props> = ({ textKey, color }) => {
  const t = useTranslations()
  const { hasVoiceover } = useOptionsContext()
  const [hasAudio, setHasAudio] = useState<boolean | null>(null)

  const soundKey = textKey.replace(/\./g, '-').toLocaleLowerCase()

  useEffect(() => {
    ;(async function () {
      const hasAudio = await hasVoiceover(soundKey)
      setHasAudio(hasAudio)
    })()
  }, [soundKey, hasVoiceover])

  return (
    <>
      {hasAudio === null && (
        <span
          style={{ width: '25px', height: '25px', display: 'inline-block' }}
        />
      )}
      {hasAudio !== null && hasAudio && (
        <VoiceoverButton path={soundKey} color={color} />
      )}
      {t(textKey)}
    </>
  )
}
