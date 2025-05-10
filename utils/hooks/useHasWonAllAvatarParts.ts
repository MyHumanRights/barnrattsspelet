import { useEffect, useState } from 'react'

import { readGameStateValue } from '@/api/storage'

export const useHasWonAllAvatarParts = () => {
  const [hasWonAllParts, setHasWonAllParts] = useState<boolean | null>(null)

  useEffect(() => {
    const hasWonAllParts = readGameStateValue('hasWonAllParts') || false
    setHasWonAllParts(hasWonAllParts)
  }, [])

  return hasWonAllParts
}
