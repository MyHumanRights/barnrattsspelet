'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

import { getScenarioCards } from '@/api/engine'
import {
  setCardHand,
  setGameStateValue,
  setPlayFromScenario,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/navigation'
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
}

export const ScenarioList: React.FC<ScenarioListProps> = ({
  allScenarios,
  filter,
  cards,
  isSlimPlay = false,
}) => {
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  const router = useRouter()

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

  const handleClickOnScenario = (scenario: IGameAntagonist) => {
    setPlayFromScenario(true)

    const cardHand = getScenarioCards(scenario, cards)
    setCardHand(cardHand)
    setGameStateValue({ activeAntagonist: scenario.name })
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
    return isSlimPlay
      ? shuffleArray(allScenarios).slice(0, 3)
      : filteredScenarios
  }, [isSlimPlay, allScenarios, filteredScenarios])

  return (
    <section
      className={`${isSlimPlay ? styles.slimPlayWrapper : styles.wrapper}`}
    >
      <ul>
        {scenarios?.map((scenario) => (
          <motion.div
            layout={!shouldReduceMotion}
            key={`${scenario.name}-${uuid}`}
            className={styles.scenarioWrapper}
          >
            <Scenario
              which={scenario}
              onClick={() => handleClickOnScenario(scenario)}
              animation={hoverAnimation}
              id={`scenario-${scenario.name}`}
              isSlimPlay={isSlimPlay}
            />
          </motion.div>
        ))}
      </ul>
    </section>
  )
}
