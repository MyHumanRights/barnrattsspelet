import { useTranslations } from 'next-intl'

import { useHasVoiceover } from '@/utils/hooks/useHasVoiceover'

import { VoiceoverButton } from '../VoiceoverButton'

interface Props {
  textKey: string
  color?: string
}

export const TextWithVoiceover: React.FC<Props> = ({ textKey, color }) => {
  const t = useTranslations()
  const soundKey = textKey.replace(/\./g, '-').toLocaleLowerCase()
  const hasVoiceover = useHasVoiceover(soundKey)

  return (
    <>
      {hasVoiceover === null && (
        <span
          style={{ width: '25px', height: '25px', display: 'inline-block' }}
        />
      )}
      {hasVoiceover !== null && hasVoiceover && (
        <VoiceoverButton path={soundKey} color={color} />
      )}
      {t(textKey)}
    </>
  )
}
