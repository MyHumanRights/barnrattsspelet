import { motion } from 'motion/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import React, { useEffect, useRef, useState } from 'react'

import { getWonCardsFromHand } from '@/utils/getWonCardsFromHand'
import { ICard, IGameAntagonist } from '@/utils/types'

import styles from './Scenario.module.scss'

export type ScenarioProps = {
  which: IGameAntagonist
  onClick: (which: IGameAntagonist, cardHand: ICard[]) => void
  animation?: {
    initial: any
    animate: any
  }
  id: string
  isSlimPlay?: boolean
  cardHand: ICard[]
}

export const Scenario = ({
  which,
  onClick,
  animation,
  id,
  isSlimPlay = false,
  cardHand,
}: ScenarioProps) => {
  const t = useTranslations()
  const pathname = usePathname()
  const [isFocused, setIsFocused] = useState(false)
  const [winableCards, setWinableCards] = useState(0)
  const ref = useRef<HTMLLIElement>(null)

  const renderAnimation = () => {
    if (animation && isFocused) {
      return animation.animate
    } else if (animation && !isFocused) {
      return animation.initial
    }
    return null
  }

  useEffect(() => {
    const { filteredCardsCount } = getWonCardsFromHand(cardHand)
    setWinableCards(filteredCardsCount)
  }, [which, cardHand])

  return (
    <motion.li
      id={id}
      className={styles.scenarioLi}
      ref={ref}
      onClick={() => onClick(which, cardHand)}
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
          {t('scenarios.environment')}{' '}
          {t('map.' + which.environment + '.header')}
        </h2>
        {!isSlimPlay ? (
          <h2>
            {t('scenarios.theme')} {t(`theme.${which.theme}`)}
          </h2>
        ) : (
          <p>{t('scenarios.winableCards', { winableCards })}</p>
        )}
        {process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
          pathname === '/sv/scenarier' && <h2>Namn: {which.name}</h2>}
      </div>
    </motion.li>
  )
}
