'use client'

import { useEffect, useState } from 'react'
import { mapAntagonistsToArray } from '@/api/engine'
import { ButtonFilter } from '../components/Filter/ButtonFilter'
import { IAntagonistObject, ICard, IGameAntagonist } from '@/utils/types'

export interface ScenariosClientProps {
  antagonistsObj: IAntagonistObject
  cards: ICard[]
}

export const AboutClient: React.FC<ScenariosClientProps> = ({
  antagonistsObj,
  cards,
}) => {
  const [allScenarios, setAllScenarios] = useState<IGameAntagonist[]>([])
  const [filter, setFilter] = useState<string | null>(null)

  useEffect(() => {
    const antagonists: IGameAntagonist[] = mapAntagonistsToArray(antagonistsObj)
    setAllScenarios(antagonists)
  }, [antagonistsObj])

  console.log(cards)
  console.log(antagonistsObj)

  return (
    <>
      <header>
        <ButtonFilter
          filter={filter}
          setFilter={setFilter}
          JSONsource={allScenarios}
          isCollectionView
        />
      </header>
    </>
  )
}
