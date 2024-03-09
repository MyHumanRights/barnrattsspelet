import React from 'react'

import { ICard } from '@/utils/types'

import { Boost } from '../../../components/Boost'

interface Props {
  onModalClose: () => void
  card: ICard | null
  onCardBoosted: (card: ICard) => void
  onComplete: (isCorrect: boolean) => void
}

export const ModalContent: React.FC<Props> = ({
  onModalClose,
  card,
  onCardBoosted,
  onComplete,
}) => {
  if (!card) {
    return null
  }

  return (
    <div>
      <Boost
        onCardBoosted={onCardBoosted}
        onModalClose={onModalClose}
        card={card}
        onComplete={onComplete}
      />
    </div>
  )
}
