import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button, ChevronRight } from '../../components'
import ArrowRight from '../Icons/ArrowRight'
import useWindowSize from '../../utils/hooks/useWindowSize'

import newPartSvg from '../../assets/svgs/newPart.svg'
import styles from './AvatarPartSelector.module.scss'

const WINDOW_BREAKPOINT = 600

const AvatarPartSelector = ({
  category,
  text,
  onClick,
  disabled,
  ariaPrev,
  ariaNext,
  index,
  newPart,
}) => {
  const { width } = useWindowSize()

  const [animatePrev, triggerPrev] = useAnimation({ x: -4 })
  const [animateNext, triggerNext] = useAnimation({ x: 4 })

  const t = useTranslations()

  return (
    <fieldset className={styles.AvatarPartWrapper}>
      {newPart && (
        <img
          src={newPartSvg}
          alt={t('common:home:newpart')}
          className={styles.newPart}
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
            {width < WINDOW_BREAKPOINT ? (
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
            {width < WINDOW_BREAKPOINT ? <ChevronRight /> : <ArrowRight />}
          </motion.span>
        </Button>
      </div>
    </fieldset>
  )
}

export default AvatarPartSelector
