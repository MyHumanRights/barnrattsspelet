import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction } from 'react'
import Skeleton from 'react-loading-skeleton'
import useSound from 'use-sound'

import buttonSound from '@/assets/sounds/fx/14-button.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ICard } from '@/utils/types'

import styles from './TabFilter.module.scss'

interface Props {
  filter: string | null
  setFilter: Dispatch<SetStateAction<string | null>>
  JSONsource: ICard[]
  isCollectionView?: boolean
  isApp?: boolean
}

export const TabFilter: React.FC<Props> = ({
  setFilter,
  filter,
  JSONsource,
  isCollectionView = false,
}) => {
  const {
    clientWidth,
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [playButtonSound] = useSound(buttonSound, { volume: effectsVolume })
  const t = useTranslations()

  const categories = JSONsource
    ? [...new Set(JSONsource.flatMap((card) => card.category))]
    : []
  const themes = JSONsource
    ? [...new Set(JSONsource.flatMap((obj) => obj.theme))]
    : []

  // Sort themes so that 'fundamentals' is always first
  themes.sort((a, b) =>
    a === 'fundamentals' ? -1 : b === 'fundamentals' ? 1 : 0
  )

  const filters = isCollectionView ? themes : categories

  function changeFilter(theme: string | null) {
    soundEffectsOn && playButtonSound()
    setFilter(theme)
  }

  function renderTab(category: string | null) {
    const categoryName =
      category === null
        ? t('deckbuilder.categories.all')
        : t(`${isCollectionView ? 'theme' : 'category'}.${category}`)

    return (
      <label
        className={`${styles.label} ${filter === category && styles.active}`}
      >
        <input
          className={`sr-only ${styles.radio}`}
          type='radio'
          name='filter'
          value={categoryName}
          onChange={() => changeFilter(category)}
          checked={filter === category}
        />
        <div className={styles.tab}>
          <div className={styles.tabTitle}>
            <p>
              {categoryName}
              <span className={styles.border} />
            </p>
          </div>
        </div>
      </label>
    )
  }

  if (!clientWidth || !filters) {
    return (
      <fieldset className={styles.filter}>
        <Skeleton width={132} height={50} style={{ marginTop: '.5rem' }} />
        <Skeleton width={132} height={50} style={{ marginTop: '.5rem' }} />
        <Skeleton width={132} height={50} style={{ marginTop: '.5rem' }} />
        <Skeleton width={132} height={50} style={{ marginTop: '.5rem' }} />
        <Skeleton width={132} height={50} style={{ marginTop: '.5rem' }} />
      </fieldset>
    )
  }

  if (clientWidth < 860) return null

  return (
    <fieldset className={styles.filter}>
      <legend className='sr-only'>{t('filterCards')}</legend>
      <div className={styles.tabWrapper} id='filter-buttons'>
        <ul>
          <li>{renderTab(null)}</li>
          {filters?.map((filter) => (
            <li key={filter}>{renderTab(filter)} </li>
          ))}
        </ul>
      </div>
    </fieldset>
  )
}
