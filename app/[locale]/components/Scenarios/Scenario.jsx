import React, { useState, /*  useContext, */ useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'

import styles from './Scenario.module.scss'

const Scenario = ({ which, onClick, animation, id }) => {
  const t = useTranslations()
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef()

  function renderAnimation() {
    if (animation && isFocused) {
      return animation.animate
    } else if (animation && !isFocused) {
      return animation.initial
    }
    return null
  }

  return (
    <motion.li
      id={id}
      className={styles.scenarioLi}
      ref={ref}
      onClick={onClick}
      animate={renderAnimation()}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
    >
      <div className={styles.imgWrapper}>
        <img
          alt={t('common:map:' + which.environment + ':header')}
          className={styles.scenarioImage}
          src={`/images/scenarios/${which.scenarioImage}`}
          width='200'
          height='112'
        />
      </div>

      <div className={styles.headerWrapper}>
        <h2>
          {' '}
          {t('common:scenarios:environment')}{' '}
          {t('common:map:' + which.environment + ':header')}
        </h2>
        <h2>
          {' '}
          {t('common:scenarios:theme')} {t(`common:theme:${which.theme}`)}
        </h2>
      </div>
    </motion.li>
  )
}

export default Scenario
