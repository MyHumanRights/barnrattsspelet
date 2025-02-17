import { AnimatePresence, motion } from 'motion/react'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react'
import useSound from 'use-sound'

import { setGameState } from '@/api/engine'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ICard, IGameState } from '@/utils/types'

import { Button } from '../Button'
import { Card } from '../Card'
import { ChevronRight } from '../Icons/ChevronRight'
import styles from './MobileCardHand.module.scss'

const BOOST_COST = -1

type Props = {
  openBoost: (card: ICard) => void
  setCurrentState: Dispatch<SetStateAction<IGameState | null>>
  cards: ICard[]
  onCardSelected: (card: ICard) => void
  cardSelectText: string
  boostedCards?: string[]
  tokens?: number
  boostable?: boolean
  centeredCard?: string | null
  removeTokens?: (amount: number) => void
  correctCard?: string | null
  interactive?: boolean
  isPersuade?: boolean
}

export const MobileCardHand = ({
  openBoost,
  setCurrentState,
  cards,
  onCardSelected,
  cardSelectText,
  boostedCards = [],
  tokens = 0,
  boostable = false,
  centeredCard = null,
  removeTokens = () => {},
  correctCard,
  interactive = true,
  isPersuade = false,
}: Props) => {
  const t = useTranslations('cardhand')
  const interactionButtons = useRef<HTMLButtonElement>(null)
  const [cardIndex, setCardIndex] = useState<number | null>(null)
  const [animateStar, triggerStar] = useAnimation({ scale: 1.4 })
  const [animateSelectBtn, triggerSelectBtn] = useAnimation({ rotation: 1.3 })
  const [currentCard, setCurrentCard] = useState(0)
  const [animate, setAnimate] = useState(false)
  const [currentCardNumber, setCurrentCardNumber] = useState(1)
  const totalCards = cards.length

  const unlockCardSound = '/sounds/fx/13-card-unlocked.mp3'

  const {
    options: { soundEffectsOn, effectsVolume, shouldReduceMotion },
  } = useOptionsContext()
  const [playUnlockCardSound] = useSound(unlockCardSound, {
    volume: effectsVolume,
  })

  const nextCard = () => {
    !shouldReduceMotion && handleAnimate()
    setCurrentCard((prevCard) => (prevCard + 1) % cards.length)
    setCardIndex(null)
    if (currentCardNumber < totalCards) {
      setCurrentCardNumber(currentCardNumber + 1)
    } else {
      setCurrentCardNumber(1) // Reset to the first card
    }
  }

  const prevCard = () => {
    handleAnimate()
    setCurrentCard((prevCard) => (prevCard - 1 + cards.length) % cards.length)
    setCardIndex(null)
    if (currentCardNumber > 1) {
      setCurrentCardNumber(currentCardNumber - 1)
    } else {
      setCurrentCardNumber(totalCards) // Go to the last card
    }
  }

  const handleClickOnCard = (index: number) => {
    if (cardIndex === index) {
      setCardIndex(null)
      return
    }
    interactive && setCardIndex(index)
  }

  const handleCardSelect = (card: ICard) => {
    setCardIndex(null)
    onCardSelected(card)
  }

  const enableCard = (card: ICard) => {
    removeTokens(BOOST_COST)
    cards.forEach((c) => {
      if (c.id === card.id) {
        c.isDisabled = false
      }
    })
    soundEffectsOn && playUnlockCardSound()
    const currentState = setGameState({ cardHand: cards })
    setCurrentState(currentState)
  }

  // TODO: What is this doing?
  // if (cards.length > 0) {
  //   cards.forEach((card, index) => {
  //     if (cards.length - 1 === index) card.ref = true
  //     else card.ref = false
  //   })
  // }

  const buttonVariants = {
    initial: { y: '100px', x: 0 },
    animate: {
      y: currentCard === cardIndex ? '-70px' : '-5px',
      x: currentCard === cardIndex ? '20px' : 0,
    },
  }

  useEffect(() => {
    interactionButtons.current?.focus()
  }, [cardIndex])

  useEffect(() => {
    if (currentCard > cards.length - 1) {
      setCurrentCard(0)
    }
  }, [cards, currentCard])

  useEffect(() => {
    if (currentCardNumber > totalCards) {
      setCurrentCardNumber(1)
    }
  }, [totalCards, currentCardNumber])

  const handleAnimate = () => {
    setAnimate(true)

    // Reset animation after a delay (0.3s in this case, should match your animation duration)
    setTimeout(() => {
      setAnimate(false)
    }, 300)
  }

  const renderButtons = () => {
    const card = currentCard > cards.length - 1 ? cards[0] : cards[currentCard]

    return !card?.isDisabled ? (
      <AnimatePresence>
        {!boostedCards.includes(card.id) && boostable && (
          <div
            key={`${card.id}-buttonBoost`}
            className={styles.tokenBtnWrapper}
          >
            <motion.button
              variants={buttonVariants}
              initial='initial'
              animate='animate'
              transition={
                shouldReduceMotion ? { duration: 0.01 } : { delay: 0.1 }
              }
              className={styles.primary}
              ref={interactionButtons}
              onClick={() => openBoost(card)}
              onMouseEnter={triggerStar}
              aria-label={t('boost')}
            >
              <motion.span animate={animateStar} style={{ display: 'block' }}>
                <Image
                  src='/images/token.png'
                  alt='Token'
                  width={24}
                  height={24}
                />
              </motion.span>
            </motion.button>
          </div>
        )}
        {isPersuade
          ? card.id !== correctCard && (
              <div className={styles.playBtnWrapper}>
                <motion.div
                  key={`${card.id}-buttonPlay`}
                  animate={animateSelectBtn}
                  onMouseEnter={triggerSelectBtn}
                >
                  <motion.button
                    variants={buttonVariants}
                    initial='initial'
                    animate='animate'
                    transition={
                      shouldReduceMotion ? { duration: 0.01 } : { delay: 0.2 }
                    }
                    className={`${
                      boostable ? styles.secondary : styles.primary
                    }`}
                    onClick={() => handleCardSelect(card)}
                  >
                    {cardSelectText}
                  </motion.button>
                </motion.div>
              </div>
            )
          : currentCard === cardIndex &&
            card.id !== correctCard && (
              <div className={styles.playBtnWrapper}>
                <motion.div
                  key={`${card.id}-buttonPlay`}
                  animate={animateSelectBtn}
                  onMouseEnter={triggerSelectBtn}
                >
                  <motion.button
                    variants={buttonVariants}
                    initial='initial'
                    animate='animate'
                    transition={
                      shouldReduceMotion ? { duration: 0.01 } : { delay: 0.2 }
                    }
                    className={`${
                      boostable ? styles.secondary : styles.primary
                    }`}
                    onClick={() => handleCardSelect(card)}
                  >
                    {cardSelectText}
                  </motion.button>
                </motion.div>
              </div>
            )}
      </AnimatePresence>
    ) : tokens > 0 ? (
      <motion.button
        onClick={() => enableCard(card)}
        variants={buttonVariants}
        initial='initial'
        animate='animate'
        transition={shouldReduceMotion ? { duration: 0.01 } : { delay: 0.1 }}
        className={styles.primary}
        ref={interactionButtons}
      >
        {t('enable')}
      </motion.button>
    ) : null
  }

  const renderCard = () => {
    const card = currentCard > cards.length - 1 ? cards[0] : cards[currentCard]
    const initYPos = isPersuade ? 0 : 5
    const initXPos = isPersuade ? 0 : -20
    const animatedYPos = isPersuade ? -60 : 5
    const animatedXPos = isPersuade ? -20 : -20

    return (
      <>
        <motion.div
          initial={{ y: 0, x: 0 }}
          animate={{
            y: currentCard === cardIndex ? animatedYPos : initYPos,
            x: currentCard === cardIndex ? animatedXPos : initXPos,
          }}
          exit={{ y: initYPos, x: initXPos }}
          transition={{ type: 'spring', duration: 0.3 }}
          className={`${
            isPersuade ? styles.cardNumberPersuade : styles.cardNumber
          }`}
        >
          {currentCardNumber}/{totalCards}
        </motion.div>
        <div
          className={animate ? styles.shuffle : styles.cardsInBack}
          style={{
            width: isPersuade ? '200px' : '150px',
            height: isPersuade ? '300px' : '225px',
          }}
        />
        <div
          className={animate ? styles.cardAnimation : ''}
          style={{ zIndex: 1 }}
        >
          <motion.div
            initial={{ scale: 1, y: 0 }}
            animate={{
              scale: currentCard === cardIndex ? 1.2 : 1,
              y: currentCard === cardIndex ? -40 : 0,
            }}
            exit={{ scale: 1, y: 0 }}
            transition={{ type: 'spring', duration: 0.3 }}
          >
            <Card
              disabledCard={card.isDisabled}
              id={currentCard.toString()}
              cardIndex={currentCard.toString()}
              which={card}
              onClick={() => handleClickOnCard(currentCard)}
              size={isPersuade ? 'medium' : 'small'}
              highlight={centeredCard === card.id}
            />
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <section className={styles.wrapper}>
      <div>
        <div
          className={styles.buttonWrapper}
          aria-controls={`card-${currentCard}`}
        >
          {renderButtons()}
        </div>
        <div className={styles.cardWrapper}>
          <Button
            type='button'
            variant={ButtonVariant.PRIMARY}
            onClick={prevCard}
            aria-label={t('previousCard')}
          >
            <ChevronRight style={{ transform: 'rotate(180deg)' }} />
          </Button>
          {renderCard()}
          <Button
            type='button'
            variant={ButtonVariant.PRIMARY}
            onClick={nextCard}
            aria-label={t('nextCard')}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  )
}
