import { useContext, memo, useCallback, useMemo } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { motion } from 'framer-motion'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { getScenarioCards } from '../../api/engine'
import { setCardHand, setPlayFromScenario } from '../../api/storage'

import Scenario from './Scenario'
import styles from './ScenarioList.module.scss'
import { useNavigate } from 'react-router-dom'
import cards from '../../data/cards.json'

const uuid = uuidv4()

const ScenarioList = ({ allScenarios, filter }) => {
  const { shouldReduceMotion } = useContext(OptionsContext).options
  const navigate = useNavigate()

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

  const handleClickOnScenario = useCallback(
    (scenario) => {
      setPlayFromScenario(true)

      const cardHand = getScenarioCards(scenario, cards)
      setCardHand(cardHand)
      navigate('/persuade', {
        state: {
          antagonist: scenario.name,
        },
      })
    },
    [navigate]
  )

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

export default memo(ScenarioList)
