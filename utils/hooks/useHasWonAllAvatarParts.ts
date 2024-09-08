import { useEffect, useState } from 'react'

import { readGameStateValue } from '@/api/storage'

export const useHasWonAllAvatarParts = () => {
  const [hasWonAllParts, setHasWonAllParts] = useState<boolean | null>(null)

  useEffect(() => {
    const checkAvatarParts = async () => {
      const hasWonAllParts =
        (await readGameStateValue('hasWonAllParts')) || false
      setHasWonAllParts(hasWonAllParts)
    }

    checkAvatarParts()
  }, [])

  return hasWonAllParts
}
