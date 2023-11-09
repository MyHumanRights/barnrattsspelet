import { useContext } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import Link from '../Link/Link'
import { useOptionsContext } from '@/contexts/OptionsContext'
import CardHandSmall from '../CardHandSmall/CardHandSmall'
import { useAnimation } from '@/utils/hooks/useAnimation'
import ArrowRight from '../Icons/ArrowRight'
import styles from './RightSidebarContent.module.scss'
import Button from '../Button/Button'

const RightSidebarContent = ({
  cardHand,
  unlockedPlaces,
  getAnyUnbeaten,
  getUnbeaten,
  sidebarEnvironment,
  onToggle,
}) => {
  const { isMobile } = useContext(OptionsContext)
  const t = useTranslations()
  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const [animateBackArrow, triggerBackArrow] = useAnimation({ x: -5 })

  const linkButton = (
    <Link
      to='/deck-builder'
      variant='secondary'
      size='small'
      onMouseEnter={triggerArrow}
    >
      {cardHand.length
        ? t('common:map:changecards')
        : t('common:map:choosecards')}
      <motion.span animate={animateArrow}>
        <ArrowRight />
      </motion.span>
    </Link>
  )

  return (
    <section className={styles.sectionRight}>
      <h2>
        {cardHand.length
          ? t('common:map:playheading')
          : t('common:map:playheadingnocards')}
      </h2>
      <div className={styles.linkWrapperRight}>
        {!isMobile && (
          <>
            <h3>{t('common:map:cardhand')}</h3>
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

export default RightSidebarContent
