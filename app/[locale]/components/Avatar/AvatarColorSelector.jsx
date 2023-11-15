import { AvatarColorSwatch } from './AvatarColorSwatch'
import styles from './AvatarColorSelector.module.scss'

export const AvatarColorSelector = ({
  title,
  category,
  colors,
  activeColor,
  onClick,
  ariaLabel,
}) => {
  return (
    <fieldset id={`${category}color`} className={styles.wrapper}>
      <h2 className='font-bangers'>{title}</h2>
      <div className={styles.colorWrapper}>
        <AvatarColorSwatch
          active={activeColor}
          colorCategory={category}
          colorsArray={colors}
          onClick={onClick}
          ariaLabel={ariaLabel}
          group={`${category}color`}
        />
      </div>
    </fieldset>
  )
}
