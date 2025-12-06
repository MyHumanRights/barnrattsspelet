'use client'

import { useMemo, useState } from 'react'

import { mapAntagonistsToArray } from '@/api/engine'
import { IAntagonistObject, ICard, IGameAntagonist } from '@/utils/types'

import { ButtonFilter } from '../components/Filter/ButtonFilter'
import { ScenarioList } from '../components/Scenarios/ScenarioList'

export interface ScenariosClientProps {
  antagonistsObj: IAntagonistObject
  cards: ICard[]
}

export const ScenariosClient: React.FC<ScenariosClientProps> = ({
  antagonistsObj,
  cards,
}) => {
  const [filter, setFilter] = useState<string | null>(null)

  const allScenarios: IGameAntagonist[] = useMemo(
    () => mapAntagonistsToArray(antagonistsObj),
    [antagonistsObj]
  )

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
      {allScenarios && (
        <ScenarioList
          filter={filter}
          allScenarios={allScenarios}
          cards={cards}
        />
      )}
    </>
  )
}
