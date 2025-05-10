import { useEffect, useState } from 'react'

import { readDefeatedAntagonists } from '@/api/storage'
import antagonists from '@/data/antagonists.json'

export const useAllAreDefeated = () => {
  const allAntagonists = antagonists
  const [allDefeated, setAllDefeated] = useState(false)

  useEffect(() => {
    const defeated = readDefeatedAntagonists()
    const antagonistCount = Object.keys(allAntagonists).length
    const defeatedCount = defeated.length

    setAllDefeated(defeatedCount === antagonistCount)
  }, [allAntagonists])

  return allDefeated
}
