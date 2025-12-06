import { useState } from 'react'

import { getCardCollection } from '@/api/storage'
import allCards from '@/data/cards.json'

export const useHasWonAllCards = () => {
  const [hasWonAllCards] = useState<boolean>(() => {
    const cardCollection = getCardCollection() || []
    return cardCollection.length === allCards.length
  })

  return hasWonAllCards
}
