import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { useOptionsContext } from '@/contexts/OptionsContext'
import {
  getleftpos,
  getrotation,
  gettop,
  getxpos,
} from '@/utils/cardTransformations'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ICard } from '@/utils/types'

import { Button } from '../Button'
import { Card } from '../Card'
import { Check } from '../Icons/Check'
import styles from './LootBoxCards.module.scss'

interface Props {
  lootCards: ICard[]
  openBox: boolean
  checkIfActive: (id: string) => boolean
  handleClickOnCard: (card: ICard) => void
  isBuyingLootbox?: boolean | null
}

export const LootBoxCards = ({
  lootCards,
  openBox,
  checkIfActive,
  handleClickOnCard,
  isBuyingLootbox,
}: Props) => {
  const t = useTranslations()
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
            top: '60vh',
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
              left: `${getleftpos(i, lootCards.length)}%`,
              x: `${lootCards.length > 1 ? getxpos(i, lootCards.length) : 0}%`,
            }
          }
          transition={{
            delay: shouldReduceMotion ? 0 : 2,
            duration: shouldReduceMotion ? 0.01 : 1,
            type: 'spring',
          }}
        >
          <div className={checkIfActive(card.id) ? styles.active : ''}>
            <Card
              which={card}
              size={isMobile ? 'small' : 'medium'}
              onClick={() => handleClickOnCard(card)}
            />
          </div>
          {isBuyingLootbox && (
            <div className={styles.buttonWrapper}>
              <Button
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
                onClick={() => handleClickOnCard(card)}
              >
                {t('lootbox.choose')}
                <AnimatePresence>
                  {checkIfActive(card.id) && (
                    <motion.span
                      initial={{
                        scale: 0,
                      }}
                      animate={{
                        scale: 1,
                      }}
                      exit={{
                        scale: 0,
                      }}
                      transition={
                        shouldReduceMotion
                          ? { duration: 0.01 }
                          : {
                              type: 'spring',
                              damping: 10,
                              stiffness: 300,
                            }
                      }
                    >
                      <Check />
                    </motion.span>
                  )}
                </AnimatePresence>
              </Button>
            </div>
          )}
        </motion.li>
      ))}
    </ul>
  )
}
