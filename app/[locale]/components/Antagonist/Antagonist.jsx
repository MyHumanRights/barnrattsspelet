import { motion, useAnimation } from 'framer-motion'
import { useContext, useEffect } from 'react'
import { useOptionsContext } from '@/contexts/OptionsContext'
import styles from './Antagonist.module.scss'

import * as antagonistsComponents from './antagonists'

export const antagonists = {
  ...antagonistsComponents,
}

const Antagonist = ({ antagonist }) => {
  const Antagonist = antagonists[antagonist]
  const startAnimation = useAnimation()

  const { shouldReduceMotion } = useContext(OptionsContext).options

  useEffect(() => {
    let transition = { times: [0, 1] }
    if (shouldReduceMotion) {
      transition = { times: [0, 0.01] }
    }

    startAnimation.start(() => ({
      opacity: [0, 1],
      y: [50, 1],
      transition: transition,
    }))
  }, [antagonist, startAnimation, shouldReduceMotion])

  return (
    <motion.section className={styles.wrapper} animate={startAnimation}>
      <Antagonist />
    </motion.section>
  )
}

export default Antagonist
