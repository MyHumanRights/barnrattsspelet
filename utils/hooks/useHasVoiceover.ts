import { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

export const useHasVoiceover = (path: string) => {
  const {
    options: { language },
  } = useOptionsContext()
  const [hasVoiceover, setHasVoiceover] = useState<boolean | null>(null)

  useEffect(() => {
    const checkVoiceover = async () => {
      try {
        // Construct the path to the public directory
        const audioPath = `/sounds/voiceover/${language}/${path}.mp3`

        // Use fetch to check if the file exists
        const response = await fetch(audioPath, { method: 'HEAD' })
        setHasVoiceover(response.ok)
      } catch (error) {
        setHasVoiceover(false)
      }
    }

    checkVoiceover()
  }, [path, language])

  return hasVoiceover
}
