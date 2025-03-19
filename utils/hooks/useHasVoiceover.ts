import { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

export const useHasVoiceover = (path: string) => {
  const {
    options: { language },
  } = useOptionsContext()
  const [hasVoiceover, setHasVoiceover] = useState<boolean | null>(null)

  useEffect(() => {
    const checkVoiceoverExists = async () => {
      try {
        const audioPath = `/sounds/voiceover/${language}/${path}.mp3`

        const response = await fetch(audioPath, { method: 'HEAD' })
        setHasVoiceover(response.ok)
      } catch (error) {
        setHasVoiceover(false)
      }
    }

    checkVoiceoverExists()
  }, [path, language])

  return hasVoiceover
}
