import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { mapAntagonistsToArray } from '@/api/engine'
import antagonistsObj from '@/data/antagonists.json'
import cards from '@/data/cards.json'
import { useAllAreDefeated } from '@/utils/hooks/useAllAreDefeated'
import { IAntagonistObject, ICard, IGameAntagonist } from '@/utils/types'

import { CloseButton } from '../CloseButton'
import { ScenarioList } from '../Scenarios/ScenarioList'
import styles from './SlimPlay.module.scss'

type PlayModalProps = {
  handleModal: () => void
}

export const PlayModal = ({ handleModal }: PlayModalProps) => {
  const allAreDefeated = useAllAreDefeated()

  const [allScenarios, setAllScenarios] = useState<IGameAntagonist[]>([])

  const t = useTranslations()

  useEffect(() => {
    const antagonists = mapAntagonistsToArray(
      antagonistsObj as unknown as IAntagonistObject
    )
    setAllScenarios(antagonists)
  }, [])

  return (
    <div className={styles.wrapper}>
      <CloseButton onClick={handleModal} />
      <h2 style={{ textAlign: 'center' }}>
        {allAreDefeated ? t('home.allClear') : t('home.selectChallenge')}
      </h2>
      <ScenarioList
        allScenarios={allScenarios}
        cards={cards as ICard[]}
        isSlimPlay
        allAreDefeated={allAreDefeated}
      />
    </div>
  )
}
