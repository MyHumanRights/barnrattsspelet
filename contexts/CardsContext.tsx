'use client'

import { getCardCollection } from '@/api/storage'
import { ICard } from '@/utils/types'
import { createContext, useContext, useEffect, useState } from 'react'

interface Props {
  allCards: ICard[]
  cardsInTotal: number
  cardCollection: ICard[]
  cardCount: number
}

const CardsContext = createContext<Props>({
  allCards: [],
  cardsInTotal: 0,
  cardCollection: [],
  cardCount: 0,
})

export const CardsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [allCards, setAllCards] = useState<ICard[]>([])
  const [cardCollection, setCardCollection] = useState<ICard[]>([])

  useEffect(() => {
    const fetchCards = async () => {
      const response = await fetch('/data/cards.json')
      const cardsData = await response.json()
      setAllCards(cardsData)
    }

    if (allCards.length === 0) {
      fetchCards()
    }
  }, [allCards])

  useEffect(() => {
    console.log('fetching collection')
    const fetchCollection = async () => {
      const cardCollection = await getCardCollection()
      setCardCollection(cardCollection)
      console.log({ cardCollection })
      console.log(cardCollection.length)
    }
    fetchCollection()
  }, [])

  return (
    <CardsContext.Provider
      value={{
        allCards,
        cardsInTotal: allCards.length,
        cardCollection,
        cardCount: cardCollection.length,
      }}
    >
      {children}
    </CardsContext.Provider>
  )
}

export const useCardsContext = () => useContext(CardsContext)
