import React from 'react'
import { Boost } from '../../../components/Boost'
import { ICard } from '@/utils/types'

interface Props {
  onModalClose: () => void
  card: ICard | null
  onCardBoosted: () => void
}

export const ModalContent: React.FC<Props> = ({
  onModalClose,
  card,
  onCardBoosted,
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
      />
    </div>
  )
}
