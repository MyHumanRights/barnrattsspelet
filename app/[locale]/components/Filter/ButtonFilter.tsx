import { LazyMotion, m } from 'motion/react'
import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useState } from 'react'
import useSound from 'use-sound'

import buttonSound from '@/assets/sounds/fx/14-button.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ICard, IGameAntagonist } from '@/utils/types'

import { Button } from '../Button'
import { ArrowRight } from '../Icons/ArrowRight'
import { ChevronRight } from '../Icons/ChevronRight'
import FilterFunnel from '../Icons/FilterFunnel'
import styles from './ButtonFilter.module.scss'

const loadFeatures = () =>
  import('../../../../utils/features.js').then((res) => res.default)

interface Props {
  filter: string | null
  setFilter: Dispatch<SetStateAction<string | null>>
  JSONsource: IGameAntagonist[] | ICard[]
  isCollectionView?: boolean
  isApp?: boolean
}

export const ButtonFilter: React.FC<Props> = ({
  filter,
  setFilter,
  JSONsource,
  isCollectionView = false,
  isApp,
}) => {
  const {
    clientWidth,
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [playButtonSound] = useSound(buttonSound, { volume: effectsVolume })
  const t = useTranslations()
  const [showFilter, setShowFilter] = useState(false)

  if (!clientWidth || clientWidth >= 860) return null

  //TODO: use type guard instead of this:
  const categories = [
    ...new Set((JSONsource as ICard[]).flatMap((card) => card.category)),
  ]
  const themes = [...new Set(JSONsource.flatMap((obj) => obj.theme))]

  // Sort themes so that 'fundamentals' is always first
  themes.sort((a, b) =>
    a === 'fundamentals' ? -1 : b === 'fundamentals' ? 1 : 0
  )

  const filters = isCollectionView ? themes : categories

  const DIV = clientWidth >= 700 ? 'div' : m.div

  const duration = 0.2
  const variants = {
    initial: { height: '1px', opacity: 0, y: '-9999px' },
    show: {
      height: 'auto',
      opacity: 1,
      y: 0,
      transition: {
        height: { duration: duration },
        opacity: { delay: duration, duration: duration },
        y: { duration: 0.01 },
      },
    },
    hide: {
      height: '1px',
      opacity: 0,
      y: '-9999px',
      transition: {
        height: { delay: duration, duration: duration },
        opacity: { duration: duration },
        y: { delay: duration * 2 },
      },
    },
  }

  function changeFilter(theme: string | null) {
    soundEffectsOn && playButtonSound()
    setFilter(theme)
  }

  function renderTab(theme: string | null) {
    const changeAndClose = () => {
      //when in mobile, close menu when choosing:
      if (clientWidth <= 700) {
        setShowFilter(!showFilter)
      }
      changeFilter(theme)
    }
    const themeName =
      theme === null
        ? t('deckbuilder.categories.all')
        : t(`${isCollectionView ? 'theme' : 'category'}.${theme}`)

    const icon = filter === theme ? <ArrowRight /> : <ChevronRight />

    //if app: return buttons instead of inputs (for ripple effect)
    return (
      <>
        {isApp ? (
          <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.SMALL}
            onClick={() => changeAndClose()}
          >
            {themeName}
            {icon}
          </Button>
        ) : (
          <label className={`${filter === theme ? styles.activeLabel : ''}`}>
            <input
              className={`sr-only ${styles.radio}`}
              type='radio'
              name='filter'
              value={themeName}
              onChange={() => changeFilter(theme)}
              checked={filter === theme}
            />
            {themeName}
            {icon}
          </label>
        )}
      </>
    )
  }

  return (
    <fieldset className={styles.wrapper}>
      <legend className='sr-only'>{t('buttonFilter')}</legend>
      <div className={styles.filterButtonWrapperMobile}>
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.SMALL}
          onClick={() => setShowFilter(!showFilter)}
          aria-expanded={showFilter}
          aria-controls='filter-buttons'
        >
          {t('filter')}
          <FilterFunnel />
        </Button>
      </div>
      <LazyMotion features={loadFeatures}>
        <DIV
          className={isApp ? styles.filtersWrapperInApp : styles.filtersWrapper}
          variants={variants}
          initial='initial'
          animate={showFilter ? 'show' : 'hide'}
          id='filter-buttons'
        >
          <ul>
            {showFilter ? (
              <>
                <li>{renderTab(null)}</li>
                {filters?.map((filter) => (
                  <li key={filter}>{renderTab(filter)}</li>
                ))}
              </>
            ) : (
              ''
            )}
          </ul>
        </DIV>
      </LazyMotion>
    </fieldset>
  )
}
