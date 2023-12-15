import getIsBrightColor from '@/utils/getIsBrightColor'

import { Check } from '../Icons/Check'
import styles from './AvatarColorSwatch.module.scss'

export const AvatarColorSwatch = ({
  colorsArray,
  colorCategory,
  onClick,
  active,
  ariaLabel,
  group,
}) => {
  return (
    <>
      {colorsArray?.map((color) => (
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
      ))}
    </>
  )
}
