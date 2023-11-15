import { useRouter } from 'next/navigation'
import { Card } from '../Card'
import { Plus } from '../Icons/Plus'
import styles from './CardHandSmall.module.scss'

export const CardHandSmall = ({ cards, trigger = () => {} }) => {
  const router = useRouter()

  function handleClick() {
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
                onClick={false}
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
