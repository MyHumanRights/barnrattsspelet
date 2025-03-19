import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import { getAntagonistFromCard, getScenarioCards } from '@/api/engine'
import {
  setCardHand,
  setGameStateValue,
  setPlayFromScenario,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonistsJson from '@/data/antagonists.json'
import cardsJson from '@/data/cards.json'
import { useRouter } from '@/i18n/routing'
import { IAntagonistObject, ICard } from '@/utils/types'

import { OwlDialogue } from '../OwlDialogue'
import { CardItem } from './CardItem'
import styles from './CardList.module.scss'

const WINDOW_SMALL = 768
const WINDOW_1700 = 1700

/** isApp variable:  for viewing the card without any buttons at all in android/iOs, and for design variation */

interface Props {
  allCards: ICard[]
  filter: string | null
  filterType: 'category' | 'theme'
  cardSelectable?: boolean
  isCollectionViewer?: boolean
  isApp?: boolean
  onOpenBoost?: (card: ICard) => void
}

export const CardList: React.FC<Props> = ({
  allCards,
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

  const showCardSound = '/sounds/fx/14-button.mp3'
  const [playOpenCardSound] = useSound(showCardSound, {
    volume: effectsVolume,
  })

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
      antagonistsJson as IAntagonistObject,
      currentCard
    )
    if (!antagonist) {
      setActiveCardId(null)
      return
    }
    const cardHand = getScenarioCards(antagonist, cardsJson as ICard[])
    setPlayFromScenario(true)
    setCardHand(cardHand)
    setGameStateValue({ activeAntagonist: antagonist.name })
    router.push('/persuade')
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

  const renderSize = (active: boolean) => {
    if (clientWidth <= WINDOW_SMALL) {
      return 'appCard'
    } else if (active && clientWidth > WINDOW_SMALL) {
      return 'large'
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
    : (cardsJson as ICard[])

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
        const collectedCard = cards ? cards.find((c) => c.id === card.id) : null
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
            renderSize={renderSize}
          />
        ) : (
          !isMobile && renderEmptyCard(card)
        )
      })}
    </ul>
  )
}
