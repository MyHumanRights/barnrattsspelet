import { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

export const useHasVoiceover = (path: string) => {
  const {
    options: { language },
  } = useOptionsContext()
  const [hasVoiceover, setHasVoiceover] = useState<boolean | null>(null)

  useEffect(() => {
    const fetchVoiceover = async () => {
      try {
        const imported = (
          await import(
            '/assets/sounds/voiceover/' + language + '/' + path + '.mp3'
          )
        ).default
        setHasVoiceover(!!imported)
      } catch (error) {
        setHasVoiceover(false)
      }
    }

    fetchVoiceover()
  }, [path, language])

  return hasVoiceover
}
