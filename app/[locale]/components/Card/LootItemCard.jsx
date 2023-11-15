import AvatarPart from '../AvatarPart/'
import styles from './LootItemCard.module.scss'

const LootItemCard = ({ lootItem }) => {
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
            <AvatarPart path='base/avatar-base01' fill='gray' />
            {lootItem.map((item) => (
              <AvatarPart
                path={`${item.category}/${item.id}`}
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

export default LootItemCard
