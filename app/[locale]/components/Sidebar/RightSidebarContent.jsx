import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { Link } from '../Link/Link'
import { CardHandSmall } from '../CardHandSmall'
import { ArrowRight } from '../Icons/ArrowRight'
import { Button } from '../Button'
import styles from './RightSidebarContent.module.scss'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

export const RightSidebarContent = ({
  cardHand,
  unlockedPlaces,
  getAnyUnbeaten,
  getUnbeaten,
  sidebarEnvironment,
  onToggle,
}) => {
  const { isMobile } = useOptionsContext()
  const t = useTranslations()
  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const [animateBackArrow, triggerBackArrow] = useAnimation({ x: -5 })

  const linkButton = (
    <Link
      to='/deck-builder'
      variant={ButtonVariant.SECONDARY}
      size={ButtonSize.SMALL}
      onMouseEnter={triggerArrow}
    >
      {cardHand.length ? t('map.changecards') : t('map.choosecards')}
      <motion.span animate={animateArrow}>
        <ArrowRight />
      </motion.span>
    </Link>
  )

  return (
    <section className={styles.sectionRight}>
      <h2>
        {cardHand.length ? t('map.playheading') : t('map.playheadingnocards')}
      </h2>
      <div className={styles.linkWrapperRight}>
        {!isMobile && (
          <>
            <h3>{t('map.cardhand')}</h3>
            <CardHandSmall cards={cardHand} trigger={triggerArrow} />
            {linkButton}
          </>
        )}
      </div>
      {getAnyUnbeaten()
        ? unlockedPlaces.map((place) => {
            const unbeaten = getUnbeaten(place)
            if (unbeaten?.length) {
              return sidebarEnvironment(place, true)
            }
            return null
          })
        : unlockedPlaces.map((place) => sidebarEnvironment(place, false))}
      {isMobile && (
        <div className={styles.linkWrapper}>
          <Button
            size='small'
            variant='secondary'
            onClick={onToggle}
            onMouseEnter={triggerBackArrow}
          >
            <motion.span animate={animateBackArrow} className={styles.arrow}>
              <ArrowRight />
            </motion.span>
            Översikt
          </Button>
          {linkButton}
        </div>
      )}
    </section>
  )
}
