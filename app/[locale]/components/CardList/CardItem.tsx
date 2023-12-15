import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { memo } from 'react'

import { getAntagonistFromCard } from '@/api/engine'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonistsJson from '@/data/antagonists.json'
import { ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { IAntagonistObject, ICard } from '@/utils/types'

import { Button } from '../Button'
import { ChevronRight } from '../Icons/ChevronRight'
import { Plus } from '../Icons/Plus'
import styles from './CardItem.module.scss'

const LazyCard = dynamic(() => import('../Card').then((mod) => mod.Card))

interface Props {
  card: ICard
  active: boolean
  isApp: boolean
  cardSelectable: boolean
  handleClickOnCard: (card: ICard) => void
  isCollectionViewer: boolean
  onOpenBoost: (card: ICard) => void
  setActiveCardId: (cardId: string | null) => void
  playCardScenario: (card: ICard) => void
  addCardToHand: (card: ICard) => void
  renderSize: (
    active: boolean
  ) => 'small' | 'large' | 'medium' | 'appCard' | 'xsmall'
}

export const CardItem: React.FC<Props> = memo(
  ({
    card,
    active,
    isApp,
    cardSelectable,
    handleClickOnCard,
    isCollectionViewer,
    onOpenBoost,
    setActiveCardId,
    playCardScenario,
    addCardToHand,
    renderSize,
  }) => {
    const t = useTranslations()
    const {
      isMobile,
      options: { shouldReduceMotion },
    } = useOptionsContext()
    const [animateAdd, triggerAdd] = useAnimation({ scale: 1.3 })
    const [animatePlay, triggerPlay] = useAnimation({ x: 4 })
    const [animateStar, triggerStar] = useAnimation({ scale: 1.2 })

    const hoverAnimation = {
      initial: {
        y: 0,
      },
      animate: {
        y: -3,
        transition: {
          type: 'spring',
        },
      },
    }

    const buttonVariants = {
      initial: { y: '-100px', opacity: 0 },
      animate: { y: 0, opacity: 1 },
    }

    const cardVariants = {
      initial: {
        zIndex: 1,
        transition: { delay: 0.2 },
      },
      active: {
        zIndex: 20,
      },
    }

    const borderStyle =
      !isApp && active
        ? { border: `2px solid ${card.color}` }
        : { border: 'none' }
    const listItemClassName = `${active && styles.activeListItem}`
    const cardClassName = !isApp ? `${active && styles.activeCard}` : ''

    function checkIsPlayable(card: ICard) {
      return getAntagonistFromCard(
        antagonistsJson as any as IAntagonistObject,
        card
      )
    }

    return (
      <li key={card.id} className={listItemClassName} style={borderStyle}>
        <motion.div
          layout
          className={cardClassName}
          data-click='outside'
          variants={cardVariants}
          initial='initial'
          animate={active ? 'active' : 'initial'}
        >
          <LazyCard
            which={card}
            onClick={cardSelectable ? () => handleClickOnCard(card) : undefined}
            animation={active && !isMobile ? undefined : hoverAnimation}
            id={`card-${card.id}`}
            size={renderSize(active)}
            isOpen={active}
            isApp={isApp}
          />
          <AnimatePresence>
            {active && cardSelectable && (
              <motion.div
                key={card.id}
                variants={buttonVariants}
                initial='initial'
                animate='animate'
                transition={
                  shouldReduceMotion ? { duration: 0.01 } : { delay: 0.2 }
                }
                aria-controls={`card-${card.id}`}
                className={styles.buttonWrapper}
              >
                {isCollectionViewer && (
                  <div className={styles.collectionBtns}>
                    {checkIsPlayable(card) && (
                      <Button
                        variant={ButtonVariant.SECONDARY}
                        onClick={() => {
                          onOpenBoost(card)
                          setActiveCardId(null)
                        }}
                        onMouseEnter={triggerStar}
                      >
                        {t('carddata.boost')}
                        <motion.span animate={animateStar}>
                          <Image
                            src='/images/token.png'
                            alt='Token'
                            width={43}
                            height={41}
                          />
                        </motion.span>
                      </Button>
                    )}
                    {checkIsPlayable(card) && (
                      <Button
                        onClick={() => playCardScenario(card)}
                        onMouseEnter={triggerPlay}
                        hasOwnSound
                      >
                        {t('carddata.playcard')}
                        <motion.span animate={animatePlay}>
                          <ChevronRight />
                        </motion.span>
                      </Button>
                    )}
                  </div>
                )}
                {!isCollectionViewer && !isApp && (
                  <Button
                    onClick={() => addCardToHand(card)}
                    hasOwnSound
                    onMouseEnter={triggerAdd}
                  >
                    {t('carddata.addtohand')}
                    <motion.span animate={animateAdd}>
                      <Plus />
                    </motion.span>
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </li>
    )
  }
)

CardItem.displayName = 'CardItem'
