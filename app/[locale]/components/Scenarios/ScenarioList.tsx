'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRouter } from '@/navigation'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { getScenarioCards } from '@/api/engine'
import { ICard, IGameAntagonist } from '@/utils/types'
import {
  setCardHand,
  setGameStateValue,
  setPlayFromScenario,
} from '@/api/storage'
import { Scenario } from './Scenario'
import styles from './ScenarioList.module.scss'

const uuid = crypto.randomUUID()

export interface ScenarioListProps {
  allScenarios: IGameAntagonist[]
  filter?: string | null
  cards: ICard[]
}

export const ScenarioList: React.FC<ScenarioListProps> = ({
  allScenarios,
  filter,
  cards,
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

  return (
    <section className={styles.wrapper}>
      <ul>
        {filteredScenarios?.map((scenario) => (
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
            />
          </motion.div>
        ))}
      </ul>
    </section>
  )
}
