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
        const url = '/sounds/voiceover/' + language + '/' + path + '.mp3'
        const response = await fetch(url, { method: 'HEAD' })
        setHasVoiceover(response.ok)
      } catch (error) {
        setHasVoiceover(false)
      }
    }

    fetchVoiceover()
  }, [path, language])

  return hasVoiceover
}
