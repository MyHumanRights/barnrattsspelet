import { useEffect, useState } from 'react'

import { getCardCollection } from '@/api/storage'
import allCards from '@/data/cards.json'

export const useHasWonAllCards = () => {
  const [hasWonAllCards, setHasWonAllCards] = useState(false)

  useEffect(() => {
    const checkCards = async () => {
      const cardCollection = await getCardCollection()
      setHasWonAllCards(cardCollection.length === allCards.length)
    }

    checkCards()
  }, [])

  return hasWonAllCards
}
