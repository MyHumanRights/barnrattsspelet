import { useEffect, useState } from 'react'

import { getCardCollection } from '@/api/storage'
import allCards from '@/data/cards.json'

export const useHasWonAllCards = () => {
  const [hasWonAllCards, setHasWonAllCards] = useState(false)

  useEffect(() => {
    const cardCollection = getCardCollection() || []
    setHasWonAllCards(cardCollection.length === allCards.length)
  }, [])

  return hasWonAllCards
}
