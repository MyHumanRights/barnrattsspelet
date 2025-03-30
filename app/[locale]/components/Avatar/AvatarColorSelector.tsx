import { CATEGORIES } from '@/utils/constants'

import styles from './AvatarColorSelector.module.scss'
import { AvatarColorSwatch } from './AvatarColorSwatch'

type Props = {
  title: string
  category: CATEGORIES
  colors?: string[]
  activeColor: string | null
  onClick: (colorCategory: CATEGORIES, color: string) => void
  ariaLabel: string
}

export const AvatarColorSelector = ({
  title,
  category,
  colors,
  activeColor,
  onClick,
  ariaLabel,
}: Props) => {
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
