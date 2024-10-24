import { setGameStateValue } from '@/api/storage'
import { useRouter } from '@/i18n/routing'
import { ICard } from '@/utils/types'

import { Card } from '../Card'
import { Plus } from '../Icons/Plus'
import styles from './CardHandSmall.module.scss'

type Props = {
  cards: ICard[]
  trigger?: () => void
}

export const CardHandSmall = ({ cards, trigger = () => {} }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    setGameStateValue({ isSlimPlay: false })
    router.push('/deck-builder')
  }

  const emptyCards = []
  const emptyCardId = crypto.randomUUID()
  const cardId = crypto.randomUUID()

  for (let i = 0; i < 7; i++) {
    emptyCards.push(
      <li
        key={`${i}-${emptyCardId}`}
        className={styles.empty}
        onClick={handleClick}
        onMouseEnter={trigger}
      >
        <Plus />
      </li>
    )
  }
  return (
    <ul className={styles.wrapper}>
      {cards.length
        ? cards.map((card) => (
            <li key={`${card.id}-${cardId}`}>
              <Card
                which={card}
                onClick={undefined}
                id={`card-${card.id}`}
                size='xsmall'
                nonInteractive={true}
              />
            </li>
          ))
        : emptyCards}
    </ul>
  )
}
