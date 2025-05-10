import { CATEGORIES } from '@/utils/constants'
import getIsBrightColor from '@/utils/getIsBrightColor'

import { Check } from '../Icons/Check'
import styles from './AvatarColorSwatch.module.scss'

type Props = {
  colorsArray?: string[]
  colorCategory: CATEGORIES
  onClick: (colorCategory: CATEGORIES, color: string) => void
  active: string | null
  ariaLabel: string
  group: string
}

export const AvatarColorSwatch = ({
  colorsArray,
  colorCategory,
  onClick,
  active,
  ariaLabel,
  group,
}: Props) => {
  return (
    <>
      {colorsArray?.map((color) => {
        return (
          <label
            key={color}
            htmlFor={colorCategory + color}
            style={{ backgroundColor: color }}
            onClick={() => onClick(colorCategory, color)}
            aria-label={ariaLabel}
            className={styles.colorSwatch}
          >
            {active === color && (
              <Check fill={getIsBrightColor(color) ? 'black' : 'white'} />
            )}
            <input
              id={colorCategory + color}
              name={group}
              type='radio'
              className='sr-only'
            />
          </label>
        )
      })}
    </>
  )
}
