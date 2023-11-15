import { useEffect, useState } from 'react'
import { checkIfAllAntagonistsDefeated } from '@/api/engine'
import { readDefeatedAntagonists } from '@/api/storage'
import antagonists from '@/data/antagonists.json'
import { IAntagonistObject } from '../types'

export const useAllAreDefeated = () => {
  const allAntaonists: IAntagonistObject = antagonists
  const [allDefeated, setAllDefeated] = useState(false)

  useEffect(() => {
    func()
  }, [])

  const func = async () => {
    const defeated = await readDefeatedAntagonists()
    const allAntagonistsDefeated = checkIfAllAntagonistsDefeated(
      allAntaonists,
      defeated
    )
    setAllDefeated(allAntagonistsDefeated)
  }

  return allDefeated
}
