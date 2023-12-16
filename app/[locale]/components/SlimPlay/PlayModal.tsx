import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { mapAntagonistsToArray } from '@/api/engine'
import antagonistsObj from '@/data/antagonists.json'
import cards from '@/data/cards.json'
import { useAllAreDefeated } from '@/utils/hooks/useAllAreDefeated'
import { ICard, IGameAntagonist } from '@/utils/types'

import { Close } from '../Icons/Close'
import { ScenarioList } from '../Scenarios/ScenarioList'
import styles from './SlimPlay.module.scss'

interface Props {
  handleModal: () => void
}

export const PlayModal = ({ handleModal }: Props) => {
  const t = useTranslations()

  // TODO: read allaredefeated flag from localstorage
  const allAreDefeated = useAllAreDefeated()

  const [allScenarios, setAllScenarios] = useState<IGameAntagonist[]>([])

  useEffect(() => {
    const antagonists: IGameAntagonist[] = mapAntagonistsToArray(antagonistsObj)
    setAllScenarios(antagonists)
  }, [])

  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleModal}
        className={styles.closeButton}
        autoFocus
        aria-label={t('close')}
      >
        <Close />
      </button>
      {allAreDefeated ? (
        <h2 style={{ textAlign: 'center' }}>Du har klarat alla!</h2>
      ) : (
        <h2 style={{ textAlign: 'center' }}>Välj ett scenario</h2>
      )}
      <ScenarioList
        allScenarios={allScenarios}
        cards={cards as ICard[]}
        isSlimPlay
        allAreDefeated={allAreDefeated}
      />
    </div>
  )
}
