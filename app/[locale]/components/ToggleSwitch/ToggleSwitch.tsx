import { motion } from 'framer-motion'
import { useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

import styles from './ToggleSwitch.module.scss'

interface Props {
  isOn: boolean
  handleToggle: () => void
  switchType: string
}

const ToggleSwitch: React.FC<Props> = ({ isOn, handleToggle, switchType }) => {
  const [animate, setAnimate] = useState({})
  const [transition, setTransition] = useState({})

  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  function handleChange() {
    setAnimate({ x: isOn ? 0 : 25 })
    setTransition({ duration: shouldReduceMotion ? 0 : 0.1 })
    handleToggle()
  }

  return (
    <div className={styles.toggleSwitchWrapper}>
      <input
        checked={isOn}
        onChange={handleChange}
        className={`sr-only ${styles.switchCheckbox}`}
        id={switchType}
        type='checkbox'
      />
      <label className={styles.switchLabel} htmlFor={switchType}>
        <motion.span
          className={styles.switchBall}
          initial={{ x: isOn ? 25 : 0 }}
          animate={animate}
          transition={transition}
        />
      </label>
    </div>
  )
}

export default ToggleSwitch
