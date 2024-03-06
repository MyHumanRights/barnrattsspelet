import { useEffect, useState } from 'react'

import { checkIfAllAntagonistsDefeated } from '@/api/engine'
import { readDefeatedAntagonists } from '@/api/storage'
import antagonists from '@/data/antagonists.json'

export const useAllAreDefeated = () => {
  const allAntagonists = antagonists
  const [allDefeated, setAllDefeated] = useState(false)

  useEffect(() => {
    const func = async () => {
      const defeated = await readDefeatedAntagonists()
      const allAntagonistsDefeated = checkIfAllAntagonistsDefeated(
        allAntagonists,
        defeated
      )
      setAllDefeated(allAntagonistsDefeated)
    }

    func()
  }, [allAntagonists])

  return allDefeated
}
