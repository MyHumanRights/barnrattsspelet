'use client'

import { motion } from 'motion/react'
import { useEffect, useMemo, useState } from 'react'

import { getScenarioCards } from '@/api/engine'
import {
  readDefeatedAntagonists,
  setCardHand,
  setGameStateValue,
  setPlayFromScenario,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/i18n/routing'
import { Antagonist } from '@/utils/antagonistType'
import { shuffleArray } from '@/utils/shuffleArray'
import { ICard, IGameAntagonist } from '@/utils/types'

import { Scenario } from './Scenario'
import styles from './ScenarioList.module.scss'

const uuid = crypto.randomUUID()

export interface ScenarioListProps {
  allScenarios: IGameAntagonist[]
  filter?: string | null
  cards: ICard[]
  isSlimPlay?: boolean
  allAreDefeated?: boolean
}

export const ScenarioList: React.FC<ScenarioListProps> = ({
  allScenarios,
  filter,
  cards,
  isSlimPlay = false,
  allAreDefeated = false,
}) => {
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  const router = useRouter()

  const [defeatedAntagonists, setDefeatedAntagonists] = useState<string[]>([])

  useEffect(() => {
    if (!isSlimPlay) return
    setDefeatedAntagonists(readDefeatedAntagonists())
  }, [isSlimPlay])

  const hoverAnimation = useMemo(
    () => ({
      initial: {
        rotateX: 0,
        rotateY: 0,
        translateY: 0,
        transformPerspective: 600,
      },
      animate: {
        rotateX: shouldReduceMotion ? 0 : 2,
        rotateY: shouldReduceMotion ? 0 : 4,
        translateY: shouldReduceMotion ? 0 : -5,
        transformPerspective: 600,
        transition: {
          type: 'spring',
        },
      },
    }),
    [shouldReduceMotion]
  )

  const handleClickOnScenario = (
    scenario: IGameAntagonist,
    cardHand: ICard[]
  ) => {
    setPlayFromScenario(!isSlimPlay)
    setCardHand(cardHand)
    setGameStateValue({ activeAntagonist: scenario.name as Antagonist })
    router.push('/persuade')
  }

  const filteredScenarios = useMemo(
    () =>
      filter
        ? allScenarios.filter((scenario) => scenario.theme.includes(filter))
        : allScenarios,
    [allScenarios, filter]
  )

  const scenarios = useMemo(() => {
    if (isSlimPlay) {
      // Filter out defeated antagonists if all are not defeated
      const filteredScenarioArray = allAreDefeated
        ? filteredScenarios
        : filteredScenarios.filter(
            (obj) => !defeatedAntagonists.includes(obj.name)
          )

      // Shuffle and return three scenarios
      return shuffleArray(filteredScenarioArray).slice(0, 3)
    }

    return filteredScenarios
  }, [isSlimPlay, filteredScenarios, defeatedAntagonists, allAreDefeated])

  return (
    <section
      className={`${isSlimPlay ? styles.slimPlayWrapper : styles.wrapper}`}
    >
      <ul>
        {scenarios?.map((scenario) => {
          // In order to know the number of winable cards, we need to get the card hand here
          // we can't create the card hand when clicking on the scenario
          const cardHand = getScenarioCards(scenario, cards)
          return (
            <motion.div
              layout={!shouldReduceMotion}
              key={`${scenario.name}-${uuid}`}
              className={styles.scenarioWrapper}
            >
              <Scenario
                which={scenario}
                onClick={handleClickOnScenario}
                animation={hoverAnimation}
                id={`scenario-${scenario.name}`}
                isSlimPlay={isSlimPlay}
                cardHand={cardHand}
              />
            </motion.div>
          )
        })}
      </ul>
    </section>
  )
}
