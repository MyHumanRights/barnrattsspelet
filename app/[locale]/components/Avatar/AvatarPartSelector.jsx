import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ButtonVariant } from '@/utils/constants'
import Image from 'next/image'
import { Button } from '../Button'
import { ChevronRight } from '../Icons/ChevronRight'
import { ArrowRight } from '../Icons/ArrowRight'

import styles from './AvatarPartSelector.module.scss'
import { useOptionsContext } from '@/contexts/OptionsContext'

const WINDOW_BREAKPOINT = 600

export const AvatarPartSelector = ({
  category,
  text,
  onClick,
  disabled,
  ariaPrev,
  ariaNext,
  index,
  newPart,
}) => {
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
