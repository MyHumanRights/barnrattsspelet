import { motion } from 'motion/react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import {
  getleftpos,
  getrotation,
  gettop,
  getxpos,
} from '@/utils/cardTransformations'
import { ICard } from '@/utils/types'

import { Card } from '../Card'
import styles from './LootBoxCards.module.scss'

type LootBoxCardsProps = {
  lootCards: ICard[]
  openBox: boolean
}

export const LootBoxCards = ({ lootCards, openBox }: LootBoxCardsProps) => {
  const {
    isMobile,
    options: { shouldReduceMotion },
  } = useOptionsContext()

  return (
    <ul className={styles.cardList}>
      {lootCards.map((card, i) => (
        <motion.li
          key={card.id}
          initial={{
            top: '100vh',
            rotate: `${getrotation(i, lootCards.length, 10)}deg`,
            x: '-50%',
            left: '50%',
            scale: 0,
          }}
          animate={
            openBox && {
              top: `${gettop(i, lootCards.length, 20)}px`,
              rotate: `${getrotation(i, lootCards.length, 10)}deg`,
              scale: 1,
              left: `${
                lootCards.length > 1 ? getleftpos(i, lootCards.length) : 50
              }%`,
              x: `${lootCards.length > 1 ? getxpos(i, lootCards.length) : 0}%`,
            }
          }
          transition={{
            delay: shouldReduceMotion ? 0 : 2,
            duration: shouldReduceMotion ? 0.01 : 1,
            type: 'spring',
          }}
        >
          <div>
            <Card which={card} size={isMobile ? 'small' : 'medium'} />
          </div>
        </motion.li>
      ))}
    </ul>
  )
}
