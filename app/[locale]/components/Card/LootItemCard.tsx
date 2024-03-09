import { ILootItem } from '@/utils/types'

import { AvatarPart } from '../AvatarPart'
import styles from './LootItemCard.module.scss'

interface Props {
  lootItem: ILootItem[]
}

export const LootItemCard = ({ lootItem }: Props) => {
  return (
    <article className={styles.wrapper}>
      <div className={styles.cardContainer}>
        <div className={styles.card}>
          <div
            className={styles.innerContainer}
            style={{
              backgroundColor: 'white',
            }}
          >
            <AvatarPart avatarPart='Base01' fill='gray' />
            {lootItem.map((item) => (
              <AvatarPart
                avatarPart={item.id}
                fill={item.color}
                key={item.id}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  )
}
