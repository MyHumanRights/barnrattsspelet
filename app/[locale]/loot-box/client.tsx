'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import Particles from 'react-particles'
import { loadFull } from 'tsparticles'
import useSound from 'use-sound'
import {
  getCardsToLootBox,
  getItemToLootBox,
  getSuperHeroToLootBox,
  getStartingCards,
} from '@/api/engine'
import {
  getAvatar,
  getAvatarPartCollection,
  getCardCollection,
  readTokens,
  setAvatarPartCollection,
  setCardCollection,
  setShownChangeHandTip,
  setShownNoUndefeatedTip,
  setTokens,
  setFirstTimeLootBox,
  readGameStateValue,
} from '@/api/storage'
import powerUpSound from '@/assets/sounds/fx/03-lootbox.mp3'
import unlockCardSound1 from '@/assets/sounds/fx/13-card-unlocked-01.mp3'
import unlockCardSound2 from '@/assets/sounds/fx/13-card-unlocked-02.mp3'
import unlockCardSound3 from '@/assets/sounds/fx/13-card-unlocked-03.mp3'
import mapSound from '@/assets/sounds/fx/22-map-added-color.mp3'
import antagonists from '@/data/antagonists.json'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAllAreDefeated } from '@/utils/hooks/useAllAreDefeated'
import Box from '../components/Box/Box'
import { Button } from '../components/Button'
import { Card } from '../components/Card'
import { Environment } from '../components/Environment'
import { NotAllowed } from '../components/NotAllowed'
import { OwlDialogue } from '../components/OwlDialogue'
import LootItemCard from '../components/Card/LootItemCard'
import { Check } from '../components/Icons/Check'
import { MapBackground } from '../components/MapBackground'
import styles from './LootBox.module.scss'
import { IAvatarParts, ICard, ILootItem } from '@/utils/types'
import { Engine } from 'tsparticles-engine'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

const ROT_DEGREE = 10
const TOP_OFFSET = 20

interface Props {
  cardData: ICard[]
  avatarParts: IAvatarParts
}

export const LootBoxClient: React.FC<Props> = ({ cardData, avatarParts }) => {
  const t = useTranslations()
  const router = useRouter()
  const {
    isMobile,
    playSoundEffect,
    options: { shouldReduceMotion, soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [gameEnvironment, setGameEnvironment] = useState<string | null>(null)
  const [isByingLootbox, setIsByingLootbox] = useState<boolean | null>(true)
  const [isAllowedLootbox, setIsAllowedLootbox] = useState<boolean | null>(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [bgColor, setBgColor] = useState('none')
  const [openBox, setOpenBox] = useState(false)
  const [collectedItems, setCollectedItems] = useState<IAvatarParts | null>(
    null
  )
  const [lootItem, setLootItem] = useState<ILootItem[]>([])
  const [lootCards, setLootCards] = useState<ICard[]>([])
  const [myLootCards, setMyLootCards] = useState<ICard[]>([])
  const [collection, setCollection] = useState<ICard[]>([])
  const [isFirstLoot, setIsFirstLoot] = useState(false)
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [showLootItem, setShowLootItem] = useState(false)
  const [playOpenBoxSound] = useSound(powerUpSound, { volume: effectsVolume })
  const [playUnlockCardSound1] = useSound(unlockCardSound1, {
    volume: effectsVolume,
  })
  const [playUnlockCardSound2] = useSound(unlockCardSound2, {
    volume: effectsVolume,
  })
  const [playUnlockCardSound3] = useSound(unlockCardSound3, {
    volume: effectsVolume,
  })
  const [playMapSound] = useSound(mapSound, {
    volume: effectsVolume,
    interupt: true,
  })

  const FULL_LOOT_AMOUNT = isFirstLoot ? 10 : lootCards.length >= 2 ? 2 : 1
  const FULL_LOOT = myLootCards.length === FULL_LOOT_AMOUNT
  const lootItemOnly = lootCards.length === 0

  const allAreDefeated = useAllAreDefeated()

  useEffect(() => {
    const init = async () => {
      let tempLootCards = []
      const cardCollection = await getCardCollection()
      const byingLootbox = await readGameStateValue('isByingLootbox')
      const environment = await readGameStateValue('gameEnvironment')
      const allowedLootbox = await readGameStateValue('allowedLootbox')
      setIsAllowedLootbox(allowedLootbox)
      setGameEnvironment(environment)
      setIsByingLootbox(byingLootbox)

      if (isByingLootbox) {
        const availableTokens = await readTokens()
        if (availableTokens < 5) {
          router.back()
          return
        }
      }

      if (!cardCollection || cardCollection.length === 0) {
        const startingCards = getStartingCards(antagonists, cardData)

        tempLootCards = startingCards

        const newCards = startingCards.map((card) => {
          return { ...card, isNewCard: false }
        })
        setIsFirstLoot(true)
        setMyLootCards(newCards)
      } else {
        tempLootCards = getCardsToLootBox(cardCollection, cardData, 3)

        const avatarPartCollection = await getAvatarPartCollection()
        const storedAvatar = await getAvatar()

        const item = allAreDefeated
          ? getSuperHeroToLootBox(
              avatarPartCollection,
              avatarParts,
              storedAvatar
            )
          : getItemToLootBox(avatarPartCollection, avatarParts, storedAvatar)

        if (tempLootCards.length === 0 && !item.length) {
          router.push('/home')
          return
        } else if (tempLootCards.length === 0 && isByingLootbox) {
          setCollectedItems(avatarPartCollection)
          setLootItem(item)
          setCollection(cardCollection)
          return
        }
        setCollectedItems(avatarPartCollection)
        setLootItem(item)
        setCollection(cardCollection)
      }
      setLootCards(tempLootCards)
    }

    Promise.resolve(init()).catch((error) => console.error(error))

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAreDefeated])

  useEffect(() => {
    // find svg background (floor) color
    const svgBgElement = document.getElementById('ENVIRONMENT_BACKGROUND')
    const color = svgBgElement?.style?.fill
    color && setBgColor(color)
    // return () =>
  }, [gameEnvironment])

  function handleClick() {
    soundEffectsOn && playOpenBoxSound()
    !shouldReduceMotion
      ? setTimeout(() => {
          setShowConfetti(true)
          setShowOwlTip(true)
        }, 2000) // sync with box opening
      : setShowOwlTip(true)
    setOpenBox(true)
    lootItemOnly && setShowLootItem(true)
  }

  function getrotation(index: number, len: number) {
    return (index + 1 - (len + 1) / 2) * ROT_DEGREE
  }

  function gettop(index: number, len: number) {
    return Math.abs(index + 1 - (len + 1) / 2) * TOP_OFFSET
  }

  function getleftpos(index: number, len: number) {
    return (100 / (len - 1)) * index
  }

  function getxpos(index: number, len: number) {
    return (100 / (len - 1)) * index * -1
  }

  async function saveCardsToStorage() {
    const isByingLootbox = await readGameStateValue('isByingLootbox')
    const gameEnvironment = await readGameStateValue('gameEnvironment')
    soundEffectsOn && playUnlockCardSound3()
    gameEnvironment && playSoundEffect(playMapSound, 1000)

    let myCollection = collection.concat(myLootCards)

    // Make sure we don't add any duplicates to card collection
    let uniqueCollection = [
      ...new Map(myCollection.map((card) => [card.id, card])).values(),
    ]
    await setCardCollection(uniqueCollection)
    setFirstTimeLootBox(false)

    isByingLootbox && setTokens(-5)
    setShownNoUndefeatedTip(false)
    setShownChangeHandTip(0)

    if (isFirstLoot) {
      // If playing for the first time, send user to home
      router.push('/home')
    } else if (lootItem.length && !isByingLootbox) {
      // If player still can win loot items
      setShowLootItem(true)
    } else {
      // If player has won all loot items already
      router.push('/home')
    }
  }

  async function saveLootToStorage() {
    let items: IAvatarParts = {}

    const loot = lootItem[0]
    const avatarDetail = avatarParts[loot.category]

    if (lootItem.length === 1 && avatarDetail !== undefined) {
      let lootItemData = avatarDetail.find((item) => item.id === lootItem[0].id)

      lootItemData = { ...lootItemData, isNewPart: true }

      if (collectedItems) {
        await setAvatarPartCollection({
          ...collectedItems,
          [lootItem[0].category]: [
            //@ts-ignore
            ...collectedItems[lootItem[0].category],
            lootItemData,
          ],
        })
      }
    } else {
      lootItem.map((loot) => {
        const avatarDetail = avatarParts[lootItem[0].category]
        if (avatarDetail !== undefined) {
          let lootItemData = avatarDetail.find((item) => item.id === loot.id)
          //@ts-ignore
          items[loot.category] = { ...lootItemData, isNewPart: true }
          return null
        }
      })

      if (collectedItems) {
        await setAvatarPartCollection({
          ...collectedItems,
          //@ts-ignore
          accessory: [...collectedItems['accessory'], items.accessory],
          body: [...collectedItems['body'], items.body],
          hair: [...collectedItems['hair'], items.hair],
          face: [...collectedItems['face'], items.face],
        })
      }
    }
    router.push('/home')
  }

  function handleClickOnCard(card: ICard) {
    if (isFirstLoot) return

    // If clicking twice on same card, remove it from myLootCards
    if (myLootCards.some((y) => y.id === card.id)) {
      setMyLootCards(myLootCards.filter((myCard) => myCard.id !== card.id))
      return
    }

    let tempCard = { ...card, isNewCard: true }

    if (FULL_LOOT) return

    setMyLootCards([...myLootCards, tempCard])
    soundEffectsOn &&
      (myLootCards.length > 0 ? playUnlockCardSound2() : playUnlockCardSound1())
  }

  function checkIfActive(id: string) {
    if (myLootCards.some((y) => y.id === id) && !isFirstLoot) {
      return true
    } else {
      return false
    }
  }

  function getOwlHeading() {
    if (lootItemOnly) {
      return 'Owl.lootbox.itemonly.heading'
    }
    if (showLootItem) {
      return null
    }
    if (isByingLootbox) {
      return `Owl.lootbox.bought${FULL_LOOT_AMOUNT}.heading`
    }
    return `Owl.lootbox.won${FULL_LOOT_AMOUNT}.heading`
  }

  function getOwlBody() {
    if (lootItemOnly) {
      return 'Owl.lootbox.itemonly.body'
    }
    if (showLootItem) {
      return 'Owl.lootbox.item.body'
    }
    return `Owl.lootbox.won${FULL_LOOT_AMOUNT}.body`
  }

  if (!isAllowedLootbox) {
    return <NotAllowed />
  }

  const particlesInit = async (main: Engine) => {
    await loadFull(main)
  }

  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          backgroundColor: bgColor !== 'none' ? bgColor : 'transparent',
        }}
      >
        {!gameEnvironment && <MapBackground opacity={1} />}
        {gameEnvironment ? (
          <div className={styles.background}>
            <Environment environment={gameEnvironment} />
            <div className={styles.backdrop} />
          </div>
        ) : (
          <>
            <div className={styles.blurBkgd} />
            <div className={styles.opacityBkgd} />
          </>
        )}
        <AnimatePresence>
          {!isFirstLoot && openBox && (
            <motion.div
              key='carddialog'
              className={styles.owlWrapper}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                transition: {
                  type: shouldReduceMotion ? 'tween' : 'spring',
                  stiffness: 200,
                  delay: shouldReduceMotion ? 0.01 : 2.5,
                  duration: shouldReduceMotion ? 0.01 : 2.5,
                },
              }}
              exit={{
                scale: 0,
                opacity: 0,
                transition: {
                  type: 'spring',
                  stiffness: 200,
                  duration: shouldReduceMotion ? 0.01 : 1,
                },
              }}
            >
              <OwlDialogue
                heading={getOwlHeading()}
                body={getOwlBody()}
                cta={
                  showLootItem || !lootItem.length ? t('done') : t('confirm')
                }
                onClick={showLootItem ? saveLootToStorage : saveCardsToStorage}
                disabled={!FULL_LOOT && !lootItemOnly}
                hasOwnSound
                buttonHasOwnSound={showLootItem ? false : true}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isFirstLoot && showOwlTip && (
            <div className={styles.owlWelcomeWrapper}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0.01 }
                    : { type: 'spring', stiffness: 200, duration: 0.8 }
                }
              >
                <OwlDialogue
                  heading='Owl.lootbox.start.heading'
                  body='Owl.lootbox.start.body'
                  setShowOwl={setShowOwlTip}
                  cta={t('Owl.lootbox.cta')}
                  onClick={
                    showLootItem ? saveLootToStorage : saveCardsToStorage
                  }
                  hasOwnSound
                />
              </motion.div>
            </div>
          )}
        </AnimatePresence>
        {!openBox && (
          <div className={styles.ctaWrapper}>
            <Button
              size={ButtonSize.XLARGE}
              onClick={() => handleClick()}
              hasOwnSound
              variant={ButtonVariant.TEXT}
            >
              {t('openlootbox')}
            </Button>
          </div>
        )}
        {!isFirstLoot && showConfetti && (
          <Particles
            id='tsparticles'
            init={particlesInit}
            options={{
              fullScreen: { enable: true },
              interactivity: {
                detectsOn: 'window',
              },
              life: {
                duration: {
                  sync: true,
                  value: 5,
                },
                count: 1,
              },
              emitters: {
                position: {
                  x: 50,
                  y: 80,
                },
                rate: {
                  quantity: 100, // how many?
                  delay: 0.75, // how often?
                },
                life: {
                  count: 0,
                  duration: 0.1,
                  delay: 0.4,
                },
              },
              particles: {
                color: {
                  value: ['#E60080', '#4F1E6F', '#F39200', '#0090CF'],
                },
                move: {
                  decay: 0.05, // Slow down particles
                  direction: 'top',
                  enable: true,
                  gravity: {
                    enable: true,
                    maxSpeed: 150,
                  },
                  outModes: {
                    top: 'none',
                    default: 'destroy',
                  },
                  speed: { min: 50, max: 75 },
                },
                number: {
                  value: 0, // Show only particles from emitter
                },
                opacity: {
                  value: 1,
                },
                rotate: {
                  value: {
                    min: 0,
                    max: 360,
                  },
                  direction: 'random',
                  animation: {
                    enable: true,
                    speed: 30,
                  },
                },
                tilt: {
                  direction: 'random',
                  enable: true,
                  value: {
                    min: 0,
                    max: 360,
                  },
                  animation: {
                    enable: true,
                    speed: 30,
                  },
                },
                size: {
                  value: 4,
                },
                roll: {
                  darken: {
                    enable: true,
                    value: 25,
                  },
                  enable: true,
                  speed: {
                    min: 5,
                    max: 15,
                  },
                },
                wobble: {
                  distance: 30,
                  enable: true,
                  speed: {
                    min: -15,
                    max: 15,
                  },
                },
                shape: {
                  type: ['circle', 'square'],
                },
              },
            }}
          />
        )}
        {lootCards && !showLootItem && (
          <ul className={styles.cardList}>
            {lootCards.map((card, i) => (
              <motion.li
                key={i}
                initial={{
                  top: '60vh',
                  rotate: `${getrotation(i, lootCards.length)}deg`,
                  x: '-50%',
                  left: '50%',
                  scale: 0,
                }}
                animate={
                  openBox && {
                    top: `${gettop(i, lootCards.length)}px`,
                    rotate: `${getrotation(i, lootCards.length)}deg`,
                    scale: 1,
                    left: `${getleftpos(i, lootCards.length)}%`,
                    x: `${
                      lootCards.length > 1 ? getxpos(i, lootCards.length) : 0
                    }%`,
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
                {!isFirstLoot && (
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
        )}

        <AnimatePresence>
          {showLootItem && (
            <motion.div
              className={styles.lootItem}
              key='lootItem'
              initial={{
                scale: 0,
                top: '60vh',
              }}
              animate={{
                scale: 1,
                top: '5vh',
              }}
              exit={{
                scale: 0,
                top: '60vh',
              }}
              transition={
                shouldReduceMotion
                  ? { duration: 0.01 }
                  : {
                      type: 'tween',
                      delay: 0.2,
                    }
              }
            >
              <LootItemCard lootItem={lootItem} />
            </motion.div>
          )}
        </AnimatePresence>
        <Box
          onClick={() => {
            handleClick()
          }}
          {...{ openBox }}
        />
      </div>
    </>
  )
}
