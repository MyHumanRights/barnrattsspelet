import { useEffect, useState } from 'react'
import { checkIfAllAntagonistsDefeated } from '@/api/engine'
import { readDefeatedAntagonists } from '@/api/storage'
import antagonists from '@/data/antagonists.json'

const useAllAreDefeated = () => {
  const [allDefeated, setAllDefeated] = useState()

  useEffect(() => {
    func()
  }, [])

  const func = async () => {
    const defeated = await readDefeatedAntagonists()
    const allAntagonistsDefeated = checkIfAllAntagonistsDefeated(
      antagonists,
      defeated
    )
    setAllDefeated(allAntagonistsDefeated)
  }

  return allDefeated
}

export default useAllAreDefeated
