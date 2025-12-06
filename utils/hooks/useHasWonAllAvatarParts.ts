import { useState } from 'react'

import { readGameStateValue } from '@/api/storage'

export const useHasWonAllAvatarParts = () => {
  const [hasWonAllParts] = useState<boolean>(() => {
    return readGameStateValue('hasWonAllParts') || false
  })

  return hasWonAllParts
}
