'use client'

import { AnimatePresence, motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
import useSound from 'use-sound'

import { getPartId, getStartingCards } from '@/api/engine'
import {
  getAvatar,
  getAvatarPartCollection,
  getCardCollection,
  getCardHand,
  readGameStateValue,
  setAvatarPartCollection,
  setCardCollection,
  setCardHand,
} from '@/api/storage'
import powerUpSound from '@/assets/sounds/fx/03-lootbox.mp3'
import unlockCardSound3 from '@/assets/sounds/fx/13-card-unlocked-03.mp3'
import mapSound from '@/assets/sounds/fx/22-map-added-color.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonists from '@/data/antagonists.json'
import { useRouter } from '@/i18n/navigation'
import { getAvatarPartById } from '@/utils/avatar-utils'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useHasWonAllCards } from '@/utils/hooks/useHasWonAllCards'
import { removeDuplicates } from '@/utils/removeDuplicates'
import {
  AvatarPart,
  Environments,
  IAntagonistObject,
  IAvatarParts,
  ICard,
  ILootItem,
} from '@/utils/types'

import { Box } from '../components/Box/Box'
import { Button } from '../components/Button'
import { Environment } from '../components/Environment'
import { NotAllowed } from '../components/NotAllowed'
import styles from './LootBox.module.scss'

const Confetti = dynamic(() =>
  import('../components/Confetti/Confetti').then((mod) => mod.Confetti)
)
const LootBoxCards = dynamic(() =>
  import('../components/LootBoxCards').then((mod) => mod.LootBoxCards)
)
const LootItemCard = dynamic(() =>
  import('../components/Card/LootItemCard').then((mod) => mod.LootItemCard)
)
const LootBoxOwl = dynamic(() =>
  import('../components/LootBoxOwl').then((mod) => mod.LootBoxOwl)
)
const OwlDialogue = dynamic(() =>
  import('../components/OwlDialogue').then((mod) => mod.OwlDialogue)
)
const MapBackground = dynamic(() =>
  import('../components/MapBackground').then((mod) => mod.MapBackground)
)

type Props = {
  cardData: ICard[]
  avatarParts: IAvatarParts
}

export const LootBoxClient = ({ cardData, avatarParts }: Props) => {
  const t = useTranslations()
  const router = useRouter()
  const {
    playSoundEffect,
    options: { shouldReduceMotion, soundEffectsOn, effectsVolume },
  } = useOptionsContext()

  const [isFirstLoot, setIsFirstLoot] = useState(false)
  const [lootItem, setLootItem] = useState<ILootItem[]>([])
  const [lootCards, setLootCards] = useState<ICard[]>([])
  const [myLootCards, setMyLootCards] = useState<ICard[]>([])
  const [showConfetti, setShowConfetti] = useState(false)
  const [openBox, setOpenBox] = useState(false)
  const [bgColor, setBgColor] = useState('none')
  const [gameEnvironment, setGameEnvironment] = useState<Environments | null>(
    null
  )
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [showLootItem, setShowLootItem] = useState(false)
  const [isAllowedLootbox, setIsAllowedLootbox] = useState<boolean | null>(true)
  const [localCollection, setLocalCollection] = useState<ICard[]>([])
  const [collectedItems, setCollectedItems] = useState<IAvatarParts | null>(
    null
  )

  const [playOpenBoxSound] = useSound(powerUpSound, { volume: effectsVolume })

  const [playUnlockCardSound3] = useSound(unlockCardSound3, {
    volume: effectsVolume,
  })
  const [playMapSound] = useSound(mapSound, {
    volume: effectsVolume,
    interupt: true,
  })

  // derive some UI states with memoization
  const lootItemOnly = useMemo(() => lootCards.length === 0, [lootCards])

  const hasWonAllCards = useHasWonAllCards()

  // initialize loot box only once
  const hasInitRef = useRef(false)
  useEffect(() => {
    if (hasInitRef.current) return
    hasInitRef.current = true
    const init = () => {
      const cardCollection = getCardCollection() || []
      const environment = readGameStateValue('gameEnvironment')
      const isSlimPlay = readGameStateValue('isSlimPlay')
      const allowedLootbox = readGameStateValue('allowedLootbox')
      const avatarPartCollection = getAvatarPartCollection()
      const storedAvatar = getAvatar()
      const progress = readGameStateValue('progress')
      const hasWonAllParts = readGameStateValue('hasWonAllParts')

      if (!progress) {
        console.error('No progress found')
        return
      }

      if (!storedAvatar) {
        console.error('No stored avatar found')
        return
      }

      setIsAllowedLootbox(allowedLootbox)
      setGameEnvironment(environment)
      setLocalCollection(cardCollection)

      const partId = getPartId(progress)

      const item = hasWonAllParts
        ? [] // if user has won all parts, don't give them any more
        : getAvatarPartById(partId, avatarParts, storedAvatar)

      setLootItem(item)
      setCollectedItems(avatarPartCollection)

      const handleSlimPlay = async () => {
        // Cast antagonists to IAntagonistObject to satisfy type requirements
        const startingCards = getStartingCards(
          antagonists as unknown as IAntagonistObject,
          cardData
        )
        setMyLootCards(startingCards)
        setLootCards(startingCards)
        setIsFirstLoot(true)
      }

      const handleDefaultCase = () => {
        const cardHand = getCardHand() || []
        const cardCollection = getCardCollection() || []

        // remove cards from cardHand that are already in cardCollection
        const filteredCardHand = cardHand.filter(
          (card) => !cardCollection.some((c) => c.id === card.id)
        )

        setLootCards(filteredCardHand)
        setMyLootCards(filteredCardHand)
        setCardHand([])
      }

      if (!isSlimPlay && cardCollection.length === 0) {
        handleSlimPlay()
      } else {
        handleDefaultCase()
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // run once on mount

  useEffect(() => {
    // find svg background (floor) color
    const svgBgElement = document.getElementById('ENVIRONMENT_BACKGROUND')
    const color = svgBgElement?.style?.fill
    color && setBgColor(color)
  }, [gameEnvironment])

  if (!isAllowedLootbox) {
    return <NotAllowed />
  }

  const handleClick = () => {
    soundEffectsOn && playOpenBoxSound()
    !shouldReduceMotion
      ? setTimeout(() => {
          setShowConfetti(true)
          setShowOwlTip(true)
        }, 800) // sync with box opening
      : setShowOwlTip(true)
    setOpenBox(true)
    lootItemOnly && setShowLootItem(true)
  }

  const saveLootToStorage = () => {
    let items: IAvatarParts = {}
    let updatedAvatarParts: IAvatarParts = collectedItems ?? {}

    const updateCollection = (category: string, itemData: AvatarPart[]) => {
      if (collectedItems) {
        updatedAvatarParts = {
          ...updatedAvatarParts,
          [category]: [...(collectedItems[category] ?? []), itemData[0]],
        }
      }
    }

    const processLootItem = (loot: ILootItem): void => {
      const avatarDetail = avatarParts[loot.category]
      if (avatarDetail !== undefined) {
        let lootItemData = avatarDetail.find(
          (item) => item.id === loot.id
        ) as AvatarPart
        lootItemData = { ...lootItemData, isNewPart: true }
        items[loot.category] = [lootItemData]
      }
    }

    lootItem.forEach(processLootItem)

    for (const category in items) {
      updateCollection(category, items[category] ?? [])
    }

    // Make sure we don't add duplicates
    const uniqueData = Object.fromEntries(
      Object.entries(updatedAvatarParts).map(([key, value]) => [
        key,
        removeDuplicates(value ?? [], 'id'),
      ])
    )

    setAvatarPartCollection(uniqueData)
    router.push('/home')
  }

  const saveCardsToStorage = () => {
    soundEffectsOn && playUnlockCardSound3()
    gameEnvironment && playSoundEffect(playMapSound, 1000)

    // Concatenate collections and remove duplicates before setting the card collection
    setCardCollection([
      ...new Map(
        [...localCollection, ...myLootCards].map((card) => [card.id, card])
      ).values(),
    ])

    if (isFirstLoot || lootItem.length === 0) {
      // If playing for the first time or player has won all loot items already, send user to home
      router.push('/home')
    } else {
      // If player still can win loot items
      setShowLootItem(true)
    }
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
            <LootBoxOwl
              lootItemOnly={lootItemOnly}
              showLootItem={showLootItem}
              saveLootToStorage={saveLootToStorage}
              saveCardsToStorage={saveCardsToStorage}
              noCardsToWinFromHand={lootItemOnly && !hasWonAllCards}
            />
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
        {!isFirstLoot && <Confetti isActive={showConfetti} />}
        {lootCards.length > 0 && !showLootItem && (
          <LootBoxCards lootCards={lootCards} openBox={openBox} />
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
              animate={
                openBox && {
                  scale: 1,
                  top: '5vh',
                }
              }
              exit={{
                scale: 0,
                top: '60vh',
              }}
              transition={{
                delay: lootCards.length === 0 && !shouldReduceMotion ? 2 : 0,
                duration: shouldReduceMotion ? 0.01 : 1,
                type: 'spring',
              }}
            >
              <LootItemCard lootItem={lootItem} />
            </motion.div>
          )}
        </AnimatePresence>
        <Box
          onClick={() => {
            handleClick()
          }}
          openBox={openBox}
        />
      </div>
    </>
  )
}
