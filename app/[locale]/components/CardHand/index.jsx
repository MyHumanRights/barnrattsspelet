import { useState, useRef, useEffect, useCallback } from 'react'
import useSound from 'use-sound'
import { AnimatePresence, motion } from 'framer-motion'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { Card } from '../Card'
import { setGameState } from '@/api/engine'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import unlockCardSound from '@/assets/sounds/fx/13-card-unlocked.mp3'
import styles from './CardHand.module.scss'
import Image from 'next/image'

const BOOST_COST = -1

const WIN_SIZES = {
  small: 'small',
  wide: 'wide',
}
const WINDOW_BREAKPOINT = 600
const ROT_DEGREE = 2
const TOP_OFFSET = 5
const SMALL_SCREEN_DIST = 20
const WIDE_SCREEN_DIST = 10
const CARD_WIDTH = 200
const CARD_HEIGHT = 300
const uuid = crypto.randomUUID()

function getrotation(index, len, centeredCard = false) {
  if (centeredCard) {
    return 0
  }
  return (index + 1 - (len + 1) / 2) * ROT_DEGREE
}

function gettop(index, len, winSize, isSelected = false, centeredCard = false) {
  if (centeredCard) {
    return -80
  }

  if (winSize === WIN_SIZES.wide && isSelected) {
    return -50
  }

  if (winSize === WIN_SIZES.small && isSelected) {
    return -10
  }
  return Math.abs(index + 1 - (len + 1) / 2) * TOP_OFFSET
}

function getleft(index, len, winSize, centeredCard = false) {
  const dist =
    winSize === WIN_SIZES.small ? SMALL_SCREEN_DIST : WIDE_SCREEN_DIST
  const total_vw = len * dist
  const free_space = (100 - total_vw) / 2
  if (centeredCard) {
    return total_vw / 2
  }
  if (total_vw >= 100) {
    return index * dist
  }
  return free_space + index * dist
}

function getoffset(len, winSize, centeredCard) {
  if (centeredCard) {
    return -(CARD_WIDTH / 4)
  }
  const dist =
    winSize === WIN_SIZES.small ? SMALL_SCREEN_DIST : WIDE_SCREEN_DIST
  const total_vw = len * dist
  if (total_vw >= 100) {
    return 0
  }
  return CARD_WIDTH / 4
}

export const CardHand = ({
  openBoost,
  setCurrentState,
  cards,
  onCardSelected,
  cardSelectText,
  boostedCards = [],
  tokens = 0,
  boostable = false,
  exitTime = 1000,
  centeredCard = null,
  removeTokens = () => {},
  correctCard,
  isDeckBuilder = false,
  interactive = true,
}) => {
  const t = useTranslations('cardhand')
  const interactionButtons = useRef(null)
  const [cardIndex, setCardIndex] = useState()
  const [winSize, setWinSize] = useState(WIN_SIZES.wide)
  const [animateStar, triggerStar] = useAnimation({ scale: 1.4 })
  const [animateSelectBtn, triggerSelectBtn] = useAnimation({ rotation: 1.3 })

  const {
    clientWidth,
    options: { soundEffectsOn, effectsVolume, shouldReduceMotion },
  } = useOptionsContext()
  const [playUnlockCardSound] = useSound(unlockCardSound, {
    volume: effectsVolume,
  })

  let cardTransition = { type: 'spring', damping: 15, stiffness: 200 }
  let exitTransition = { type: 'tween', duration: exitTime / 1000 / 2 }

  const checkWindow = useCallback(() => {
    let screenWidth = window.innerWidth
    if (screenWidth && screenWidth < WINDOW_BREAKPOINT) {
      if (winSize === WIN_SIZES.small) return
      setWinSize(WIN_SIZES.small)
    } else {
      if (winSize === WIN_SIZES.wide) return
      setWinSize(WIN_SIZES.wide)
    }
  }, [winSize])

  useEffect(() => {
    checkWindow()
  }, [checkWindow])

  useEffect(() => {
    window.addEventListener('resize', checkWindow)
    return () => window.removeEventListener('resize', checkWindow)
  })

  if (shouldReduceMotion) {
    cardTransition = { type: 'tween', duration: 0.01 }
    exitTransition = { type: 'tween', duration: 0.01 }
  }

  const hoverAnimation = {
    initial: {
      scale: 1,
      translateY: 0,
    },
    animate: {
      scale: shouldReduceMotion ? 1 : 1.04,
      translateY: shouldReduceMotion ? 0 : -10,
      transition: { type: 'spring', stiffness: 200 },
    },
  }

  const buttonVariants = {
    initial: { y: '100px' },
    animate: { y: 0 },
  }

  useEffect(() => {
    if (interactionButtons.current) {
      interactionButtons.current.focus()
    }
  }, [cardIndex])

  function handleClickOnCard(index, leave) {
    if (cardIndex === index && leave) {
      setCardIndex(null)
      return
    }
    interactive && setCardIndex(index)
  }

  function handleCardSelect(card) {
    setCardIndex(null)
    onCardSelected(card)
  }

  function enableCard(card) {
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

  if (cards.length > 0) {
    cards.forEach((card, index) => {
      if (cards.length - 1 === index) card.ref = true
      else card.ref = false
    })
  }

  return (
    <motion.section
      className={`${styles.wrapper} ${isDeckBuilder && styles.deckBuilder}`}
    >
      <ul>
        <AnimatePresence>
          {cards.map((card, index) => (
            <motion.li
              key={`${card.id}-${uuid}`}
              initial={{
                top: `${gettop(index, cards.length)}px`,
                left: `calc(${getleft(
                  index,
                  cards.length,
                  winSize
                )}vw - ${getoffset(cards.length, winSize)}px)`,
                rotate: `${getrotation(index, cards.length)}deg`,
              }}
              animate={{
                top: `${gettop(
                  index,
                  cards.length,
                  winSize,
                  index === cardIndex,
                  centeredCard === card.id
                )}px`,
                left: `calc(${getleft(
                  index,
                  cards.length,
                  winSize,
                  centeredCard === card.id
                )}vw - ${getoffset(
                  cards.length,
                  winSize,
                  centeredCard === card.id
                )}px)`,
                rotate: `${getrotation(
                  index,
                  cards.length,
                  centeredCard === card.id
                )}deg`,
                scale: centeredCard === card.id ? 1.2 : 1,
                transition:
                  centeredCard === card.id ? exitTransition : cardTransition,
                zIndex: index === cardIndex || centeredCard === card.id ? 2 : 1,
              }}
              exit={{
                opacity: 0,
                top: `-${CARD_HEIGHT}px`,
                left: '0wv',
                rotate: '-15deg',
                transition: exitTransition,
              }}
              onMouseEnter={() => handleClickOnCard(index, false)}
              onMouseLeave={() => handleClickOnCard(index, true)}
            >
              <div
                className={`${styles.buttonWrapper} ${
                  boostable &&
                  !boostedCards.includes(card.id) &&
                  !card.isDisabled &&
                  styles.spaceBetween
                }`}
                aria-controls={`card-${index}`}
              >
                {!card.isDisabled ? (
                  <AnimatePresence>
                    {index === cardIndex &&
                      !boostedCards.includes(card.id) &&
                      boostable && (
                        <div
                          key={`${card.id}-buttonBoost`}
                          className={styles.tokenBtnWrapper}
                        >
                          <motion.button
                            variants={buttonVariants}
                            initial='initial'
                            animate='animate'
                            transition={
                              shouldReduceMotion
                                ? { duration: 0.01 }
                                : { delay: 0.1 }
                            }
                            className={styles.primary}
                            ref={interactionButtons}
                            onClick={() => openBoost(card)}
                            onMouseEnter={triggerStar}
                            aria-label={t('boost')}
                          >
                            <motion.span
                              animate={animateStar}
                              style={{ display: 'block' }}
                            >
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
                    {index === cardIndex && card.id !== correctCard && (
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
                              shouldReduceMotion
                                ? { duration: 0.01 }
                                : { delay: 0.2 }
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
                ) : index === cardIndex && tokens > 0 ? (
                  <motion.button
                    onClick={() => enableCard(card)}
                    variants={buttonVariants}
                    initial='initial'
                    animate='animate'
                    transition={
                      shouldReduceMotion ? { duration: 0.01 } : { delay: 0.1 }
                    }
                    className={styles.primary}
                    ref={interactionButtons}
                  >
                    {t('enable')}
                  </motion.button>
                ) : null}
              </div>
              <Card
                disabledCard={card.isDisabled}
                id={index}
                cardIndex={cardIndex}
                which={card}
                onClick={() => handleClickOnCard(index)}
                animation={hoverAnimation}
                size={`${clientWidth < 768 ? 'small' : 'medium'}`}
                highlight={centeredCard === card.id}
              />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </motion.section>
  )
}
