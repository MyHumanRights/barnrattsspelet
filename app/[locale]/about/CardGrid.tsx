import { ICard } from '@/utils/types'
import { Card } from '../components/Card'

export const CardGrid = ({ cards }: { cards: ICard[] }) => {
  return (
    <div>
      <h1>CardGrid</h1>
      {cards.map((card) => (
        <Card size='medium' which={card} key={card.id} />
      ))}
    </div>
  )
}
