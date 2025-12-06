import { useState } from 'react'

import { readDefeatedAntagonists } from '@/api/storage'
import antagonists from '@/data/antagonists.json'

export const useAllAreDefeated = () => {
  const allAntagonists = antagonists

  const [allDefeated] = useState<boolean>(() => {
    const defeated = readDefeatedAntagonists()
    const antagonistCount = Object.keys(allAntagonists).length
    const defeatedCount = defeated.length

    return defeatedCount === antagonistCount
  })

  return allDefeated
}
