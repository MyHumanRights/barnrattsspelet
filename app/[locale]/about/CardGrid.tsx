import { ICard } from '@/utils/types'

export const CardGrid = ({ cards }: { cards: ICard[] }) => {
  return (
    <div>
      <h1>CardGrid</h1>
      {cards.map((card) => (
        <div key={card.id}>
          <h2>{card.category}</h2>
          <p>{card.article}</p>
        </div>
      ))}
    </div>
  )
}
