import { getCardCollection } from '@/api/storage'

import { ICard } from './types'

export const getWonCardsFromHand = async (cardHand: ICard[]) => {
  const cardCollection = await getCardCollection()

  // remove cards from cardHand that are already in cardCollection
  const filteredCardHand = cardHand.filter(
    (card) => !cardCollection.some((c) => c.id === card.id)
  )

  return {
    filteredCards: filteredCardHand,
    filteredCardsCount: filteredCardHand.length,
  }
}
