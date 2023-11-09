import { v4 as uuidv4 } from 'uuid'

import styles from './CardHandSmall.module.scss'
import { Card } from '../../components'
import Plus from '../Icons/Plus'
import { useNavigate } from 'react-router-dom'

const uuid = uuidv4()

const CardHandSmall = ({cards, trigger = () => {}}) => {
  const navigate = useNavigate()

  function handleClick() {
    navigate('/deck-builder')
  }

  const emptyCards = []
  for (let i = 0; i < 7; i++) {
    emptyCards.push(
      <li key={`${i}-${uuid}`} className={styles.empty} onClick={handleClick} onMouseEnter={trigger}>
        <Plus />
      </li>
    )
  }
  return (
    <ul className={styles.wrapper}>
      {cards.length ? cards.map((card) => (
        <li key={`${card.id}-${uuid}`}>
          <Card 
            which={card}
            onClick={false}
            id={`card-${card.id}`}
            size='xsmall'
            nonInteractive={true}
          />
        </li>
      )) : emptyCards}
    </ul>
  )
}

export default CardHandSmall
