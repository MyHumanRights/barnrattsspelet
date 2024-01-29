import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { setGameStateValue } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/navigation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button } from '../Button'
import { CardHandSmall } from '../CardHandSmall'
import { ArrowRight } from '../Icons/ArrowRight'
import styles from './RightSidebarContent.module.scss'

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
  const router = useRouter()
  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const [animateBackArrow, triggerBackArrow] = useAnimation({ x: -5 })

  const onChooseCards = () => {
    setGameStateValue({ isSlimPlay: false })
    router.push('/deck-builder')
  }

  const linkButton = (
    <Button
      onClick={onChooseCards}
      to='/deck-builder'
      variant={ButtonVariant.SECONDARY}
      size={ButtonSize.SMALL}
      onMouseEnter={triggerArrow}
    >
      {cardHand.length ? t('map.changecards') : t('map.choosecards')}
      <motion.span animate={animateArrow}>
        <ArrowRight />
      </motion.span>
    </Button>
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
