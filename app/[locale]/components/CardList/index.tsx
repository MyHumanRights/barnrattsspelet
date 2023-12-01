import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useSound from 'use-sound'
import { useRouter } from '@/navigation'
import { MAX_CARDS } from '@/utils/constants'
import { ICard } from '@/utils/types'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonistsJson from '@/data/antagonists.json'
import cardsJson from '@/data/cards.json'
import addCardSound from '@/assets/sounds/fx/07-add-card-to-hand.mp3'
import showCardSound from '@/assets/sounds/fx/14-button.mp3'
import {
  setCardHand,
  setGameStateValue,
  setPlayFromScenario,
} from '@/api/storage'
import { getScenarioCards, getAntagonistFromCard } from '@/api/engine'
import { OwlDialogue } from '../OwlDialogue'
import { CardItem } from './CardItem'
import styles from './CardList.module.scss'

const WINDOW_SMALL = 768
const WINDOW_800 = 800
const WINDOW_900 = 900
const WINDOW_1700 = 1700

/** isApp variable:  for viewing the card without any buttons at all in android/iOs, and for design variation */

interface Props {
  setMyCards: (cards: ICard[]) => void
  myCards: ICard[]
  allCards: ICard[]
  setAllCards: (cards: ICard[]) => void
  filter: string | null
  filterType: 'category' | 'theme'
  cardSelectable?: boolean
  isCollectionViewer?: boolean
  isApp?: boolean
  onOpenBoost?: (card: ICard) => void
}

export const CardList: React.FC<Props> = ({
  setMyCards,
  myCards,
  allCards,
  setAllCards,
  filter,
  filterType,
  cardSelectable = true,
  isCollectionViewer = false,
  isApp = false,
  onOpenBoost = () => {},
}) => {
  const router = useRouter()
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [cards, setCards] = useState<ICard[]>([])
  const [showMaxCardsOwl, setShowMaxCardsOwl] = useState(false)
  const {
    clientWidth,
    isMobile,
    options: { shouldReduceMotion, soundEffectsOn, effectsVolume },
  } = useOptionsContext()

  const [playAddCardSound] = useSound(addCardSound, { volume: effectsVolume })
  const [playOpenCardSound] = useSound(showCardSound, {
    volume: effectsVolume,
  })

  const FULL_HAND = myCards.length === MAX_CARDS

  useEffect(() => {
    setCards(allCards)
  }, [allCards])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  })

  function handleClick(e: MouseEvent) {
    if ((e.target as Element).getAttribute('data-click') === 'outside') {
      setActiveCardId(null)
    }
  }

  function handleClickOnCard(card: ICard) {
    soundEffectsOn && playOpenCardSound()
    const updatedCards = cards.map((c) =>
      c.id === card.id
        ? {
            ...c,
            isNewCard: false,
          }
        : c
    )

    setCards(updatedCards)

    if (activeCardId === card.id) {
      setActiveCardId(null)
    } else {
      setActiveCardId(card.id)
    }
  }

  function playCardScenario(currentCard: ICard) {
    const antagonist = getAntagonistFromCard(
      antagonistsJson as any,
      currentCard
    )
    if (!antagonist) {
      setActiveCardId(null)
      return
    }
    const cardHand = getScenarioCards(antagonist, cardsJson as any)
    setPlayFromScenario(true)
    setCardHand(cardHand)
    setGameStateValue({ activeAntagonist: antagonist.name })
    router.push('/persuade')
  }

  function addCardToHand(currentCard: ICard) {
    setActiveCardId(null)

    if (FULL_HAND) {
      setShowMaxCardsOwl(true)
      return
    }

    soundEffectsOn && playAddCardSound()

    setMyCards([...myCards, currentCard])
    const newCards = cards.filter((card) => card.id !== currentCard.id)

    setAllCards(newCards)
  }

  const renderEmptyCard = (card: ICard) => {
    return (
      <li key={card.id}>
        <div
          className={styles.emptyCard}
          style={{ border: `2px dashed ${card.color}` }}
        ></div>
      </li>
    )
  }

  function renderSize(active: boolean) {
    if (active && clientWidth <= WINDOW_SMALL) {
      return 'appCard'
    } else if (active && clientWidth > WINDOW_SMALL) {
      return 'large'
    } else if (clientWidth < WINDOW_SMALL) {
      return 'appCard'
    } else if (clientWidth < WINDOW_800) {
      return 'small'
    } else if (clientWidth < WINDOW_900) {
      return 'xsmall'
    } else if (clientWidth < WINDOW_1700) {
      return 'small'
    } else {
      return 'medium'
    }
  }

  // For the deckbuilder, we need the cardsJson to render empty slots
  const cardsInList: ICard[] = isCollectionViewer
    ? cards
    : isApp
    ? cards
    : (cardsJson as any as ICard[])

  // sort cardsinList by id
  cardsInList.sort((a, b) =>
    a.id.localeCompare(b.id, undefined, { numeric: true })
  )

  const filteredCards = filter
    ? cardsInList.filter((card) => {
        const cardValue = card[filterType]
        return cardValue.includes(filter)
      })
    : cardsInList

  return (
    <ul
      className={
        !isMobile
          ? `${styles.cardList} ${
              isCollectionViewer ? styles.collectionViewer : ''
            }`
          : `${styles.cardSingle}`
      }
    >
      <AnimatePresence>
        {showMaxCardsOwl && (
          <motion.div
            className={styles.owlWrapper}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: shouldReduceMotion ? 'tween' : 'spring',
              },
            }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.maxcards.heading'
              body='Owl.maxcards.body'
              setShowOwl={setShowMaxCardsOwl}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {filteredCards.map((card) => {
        const active = activeCardId === card.id
        const collectedCard = cards.find((c) => c.id === card.id)
        return collectedCard ? (
          <CardItem
            key={card.id}
            card={card}
            active={active}
            isApp={isApp}
            cardSelectable={cardSelectable}
            handleClickOnCard={handleClickOnCard}
            isCollectionViewer={isCollectionViewer}
            onOpenBoost={onOpenBoost}
            setActiveCardId={setActiveCardId}
            playCardScenario={playCardScenario}
            addCardToHand={addCardToHand}
            renderSize={renderSize}
          />
        ) : (
          !isMobile && renderEmptyCard(card)
        )
      })}
    </ul>
  )
}
