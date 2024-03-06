'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import {
  getCardsToLootBox,
  getItemToLootBox,
  getStartingCards,
  getSuperHeroToLootBox,
} from '@/api/engine'
import {
  getAvatar,
  getAvatarPartCollection,
  getCardCollection,
  getCardHand,
  readGameStateValue,
  readTokens,
  setAvatarPartCollection,
  setCardCollection,
  setCardHand,
  setShownChangeHandTip,
  setShownNoUndefeatedTip,
  setTokens,
} from '@/api/storage'
import powerUpSound from '@/assets/sounds/fx/03-lootbox.mp3'
import unlockCardSound1 from '@/assets/sounds/fx/13-card-unlocked-01.mp3'
import unlockCardSound2 from '@/assets/sounds/fx/13-card-unlocked-02.mp3'
import unlockCardSound3 from '@/assets/sounds/fx/13-card-unlocked-03.mp3'
import mapSound from '@/assets/sounds/fx/22-map-added-color.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonists from '@/data/antagonists.json'
import { useRouter } from '@/navigation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useHasWonAllCards } from '@/utils/hooks/useHasWonAllCards'
import { removeDuplicates } from '@/utils/removeDuplicates'
import {
  AvatarPart,
  Environments,
  IAvatarParts,
  ICard,
  ILootItem,
} from '@/utils/types'

import Box from '../components/Box/Box'
import { Button } from '../components/Button'
import LootItemCard from '../components/Card/LootItemCard'
import { Confetti } from '../components/Confetti'
import { Environment } from '../components/Environment'
import { LootBoxCards } from '../components/LootBoxCards'
import { LootBoxOwl } from '../components/LootBoxOwl'
import { MapBackground } from '../components/MapBackground'
import { NotAllowed } from '../components/NotAllowed'
import { OwlDialogue } from '../components/OwlDialogue'
import styles from './LootBox.module.scss'

interface Props {
  cardData: ICard[]
  avatarParts: IAvatarParts
}

export const LootBoxClient: React.FC<Props> = ({ cardData, avatarParts }) => {
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
  const [isBuyingLootbox, setIsBuyingLootbox] = useState<boolean | null>(false)
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

  const lootItemOnly = lootCards.length === 0
  const fullLootAmount = isFirstLoot
    ? 10
    : lootCards.length >= 2
    ? 2
    : lootCards.length === 1
    ? 1
    : 0
  const fullLoot = myLootCards.length === fullLootAmount

  const hasWonAllCards = useHasWonAllCards()

  useEffect(() => {
    const init = async () => {
      const cardCollection = (await getCardCollection()) || []
      const buyingLootbox = await readGameStateValue('isBuyingLootbox')
      const environment = await readGameStateValue('gameEnvironment')
      const isSlimPlay = await readGameStateValue('isSlimPlay')
      const allowedLootbox = await readGameStateValue('allowedLootbox')
      const avatarPartCollection = await getAvatarPartCollection()
      const storedAvatar = await getAvatar()

      setIsAllowedLootbox(allowedLootbox)
      setGameEnvironment(environment)
      setIsBuyingLootbox(buyingLootbox)
      setLocalCollection(cardCollection)

      const item =
        !hasWonAllCards || isBuyingLootbox
          ? getItemToLootBox(avatarPartCollection, avatarParts, storedAvatar)
          : getSuperHeroToLootBox(
              avatarPartCollection,
              avatarParts,
              storedAvatar
            )

      setLootItem(item)
      setCollectedItems(avatarPartCollection)

      const handleSlimPlay = async () => {
        const startingCards = getStartingCards(antagonists, cardData)
        setMyLootCards(startingCards)
        setLootCards(startingCards)
        setIsFirstLoot(true)
      }

      const handleBuyingLootbox = async () => {
        const availableTokens = await readTokens()
        if (availableTokens < 5) {
          router.back()
          return
        }
        const cardsToLootbox = getCardsToLootBox(cardCollection, cardData, 3)
        setLootCards(cardsToLootbox)
      }

      const handleDefaultCase = async () => {
        const cardHand = await getCardHand()
        const cardCollection = (await getCardCollection()) || []

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
      } else if (buyingLootbox) {
        handleBuyingLootbox()
      } else {
        handleDefaultCase()
      }
    }
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardData, hasWonAllCards, avatarParts, isBuyingLootbox])

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
        }, 2000) // sync with box opening
      : setShowOwlTip(true)
    setOpenBox(true)
    lootItemOnly && setShowLootItem(true)
  }

  const saveLootToStorage = async () => {
    let items: IAvatarParts = {}
    let updatedAvatarParts: IAvatarParts = collectedItems ?? {}

    const updateCollection = async (
      category: string,
      itemData: AvatarPart[]
    ) => {
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
      await updateCollection(category, items[category] ?? [])
    }

    // Make sure we don't add duplicates
    const uniqueData = Object.fromEntries(
      Object.entries(updatedAvatarParts).map(([key, value]) => [
        key,
        removeDuplicates(value ?? [], 'id'),
      ])
    )

    await setAvatarPartCollection(uniqueData)
    // if user doesn't get an item, don't take tokens
    isBuyingLootbox && lootItem.length > 0 && setTokens(-5)
    router.push('/home')
  }

  const saveCardsToStorage = async () => {
    soundEffectsOn && playUnlockCardSound3()
    gameEnvironment && playSoundEffect(playMapSound, 1000)

    // Concatenate collections and remove duplicates before setting the card collection
    await setCardCollection([
      ...new Map(
        [...localCollection, ...myLootCards].map((card) => [card.id, card])
      ).values(),
    ])

    isBuyingLootbox && setTokens(-5)
    setShownNoUndefeatedTip(false)
    setShownChangeHandTip(0)

    if (isFirstLoot || !lootItem.length || isBuyingLootbox) {
      // If playing for the first time or player has won all loot items already, send user to home
      router.push('/home')
    } else {
      // If player still can win loot items
      setShowLootItem(true)
    }
  }

  const checkIfActive = (id: string) => {
    if (
      myLootCards.some((y) => y.id === id) &&
      !isFirstLoot &&
      isBuyingLootbox
    ) {
      return true
    } else {
      return false
    }
  }

  const handleClickOnCard = (card: ICard) => {
    if (!isBuyingLootbox) return

    // If clicking twice on same card, remove it from myLootCards
    if (myLootCards.some((y) => y.id === card.id)) {
      setMyLootCards(myLootCards.filter((myCard) => myCard.id !== card.id))
      return
    }

    let tempCard = { ...card, isNewCard: true }

    if (fullLoot) return

    setMyLootCards([...myLootCards, tempCard])
    soundEffectsOn &&
      (myLootCards.length > 0 ? playUnlockCardSound2() : playUnlockCardSound1())
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
              isBuyingLootbox={isBuyingLootbox}
              fullLootAmount={fullLootAmount}
              fullLoot={fullLoot}
              saveLootToStorage={saveLootToStorage}
              saveCardsToStorage={saveCardsToStorage}
              hasLootItem={lootItem.length > 0}
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
        {!isFirstLoot && showConfetti && <Confetti />}
        {lootCards.length > 0 && !showLootItem && (
          <LootBoxCards
            lootCards={lootCards}
            handleClickOnCard={handleClickOnCard}
            checkIfActive={checkIfActive}
            isBuyingLootbox={isBuyingLootbox}
            openBox={openBox}
          />
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
