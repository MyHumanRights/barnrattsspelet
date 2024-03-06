import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button } from '../Button'
import { ArrowRight } from '../Icons/ArrowRight'
import { ChevronRight } from '../Icons/ChevronRight'
import styles from './AvatarPartSelector.module.scss'

const WINDOW_BREAKPOINT = 600

type Props = {
  category: string
  text: string
  onClick: (category: string, direction: number) => void
  disabled: boolean
  ariaPrev: string
  ariaNext: string
  index: number
  newPart?: boolean
}

export const AvatarPartSelector = ({
  category,
  text,
  onClick,
  disabled,
  ariaPrev,
  ariaNext,
  index,
  newPart,
}: Props) => {
  const t = useTranslations()
  const [animatePrev, triggerPrev] = useAnimation({ x: -4 })
  const [animateNext, triggerNext] = useAnimation({ x: 4 })
  const { clientWidth } = useOptionsContext()

  return (
    <fieldset className={styles.AvatarPartWrapper}>
      {newPart && (
        <Image
          src='/svgs/newPart.svg'
          alt={t('home.newpart')}
          className={styles.newPart}
          width='56'
          height='54'
        />
      )}
      <div>
        <Button
          disabled={disabled}
          type='button'
          variant={ButtonVariant.PRIMARY}
          onClick={() => onClick(category, -1)}
          aria-label={ariaPrev}
          onMouseEnter={triggerPrev}
          hasOwnSound
        >
          <motion.span animate={animatePrev}>
            {clientWidth < WINDOW_BREAKPOINT ? (
              <ChevronRight style={{ transform: 'rotate(180deg)' }} />
            ) : (
              <ArrowRight style={{ transform: 'rotate(180deg)' }} />
            )}
          </motion.span>
        </Button>

        <h2 className='font-bangers'>
          {text}
          <span className={styles.index}>{index}</span>
        </h2>
        <Button
          disabled={disabled}
          type='button'
          variant={ButtonVariant.PRIMARY}
          onClick={() => onClick(category, 1)}
          aria-label={ariaNext}
          onMouseEnter={triggerNext}
          hasOwnSound
        >
          <motion.span animate={animateNext}>
            {clientWidth < WINDOW_BREAKPOINT ? (
              <ChevronRight />
            ) : (
              <ArrowRight />
            )}
          </motion.span>
        </Button>
      </div>
    </fieldset>
  )
}
