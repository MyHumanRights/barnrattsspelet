'use client'

import React, { useState, useRef } from 'react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Scenario.module.scss'

export interface ScenarioProps {
  which: {
    environment: string
    theme: string
    scenarioImage: string
  }
  onClick: () => void
  animation?: {
    initial: any
    animate: any
  }
  id: string
}

export const Scenario: React.FC<ScenarioProps> = ({
  which,
  onClick,
  animation,
  id,
}) => {
  const t = useTranslations()
  const [isFocused, setIsFocused] = useState(false)
  const ref = useRef<HTMLLIElement>(null)

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
        <Image
          alt={t('map.' + which.environment + '.header')}
          className={styles.scenarioImage}
          src={`/images/scenarios/${which.scenarioImage}`}
          width='200'
          height='112'
        />
      </div>

      <div className={styles.headerWrapper}>
        <h2>
          {' '}
          {t('scenarios.environment')}{' '}
          {t('map.' + which.environment + '.header')}
        </h2>
        <h2>
          {' '}
          {t('scenarios.theme')} {t(`theme.${which.theme}`)}
        </h2>
      </div>
    </motion.li>
  )
}
