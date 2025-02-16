import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import playableCards from '@/data/cards.json'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { animationConfig } from '../AvatarLink/AvatarLink'
import { CardCollectionIcon } from '../CardCollectionIcon'
import NewCards from '../Icons/NewCards'
import { Link } from '../Link/Link'
import styles from './CardCollectionLink.module.scss'

type Props = {
  numberOfCards: number
  numberOfNewCards: number
}

const NO_OF_PLAYABLE_CARDS = playableCards.length

export const CardCollectionLink = ({
  numberOfNewCards,
  numberOfCards,
}: Props) => {
  const [animateCollection, triggerCollection] = useAnimation(animationConfig)
  const t = useTranslations()
  const deckBuilderRef = useRef<HTMLAnchorElement>(null)

  return (
    <div className={styles.cardCollectionLink}>
      <motion.div
        className={styles.linkWrapper}
        onClick={() => deckBuilderRef.current?.click()}
        animate={animateCollection}
        onMouseEnter={triggerCollection}
      >
        <div className={styles.cardCollectionIcon}>
          <div className={styles.cardCollectionWrapper}>
            {!!numberOfNewCards && (
              <div className={styles.newCards}>
                <NewCards />
                <p className='sr-only'>
                  {t('numberOfNewCards', {
                    number: numberOfNewCards,
                  })}
                </p>
              </div>
            )}
            <CardCollectionIcon
              numberOfCards={numberOfCards}
              numberOfPlayableCards={NO_OF_PLAYABLE_CARDS}
            />
          </div>
        </div>
        <Link
          to='/deck-builder'
          variant={ButtonVariant.TEXT}
          size={ButtonSize.MEDIUM}
          ref={deckBuilderRef}
          fullWidth
        >
          {t('home.mycollectionbutton')}
        </Link>
      </motion.div>
    </div>
  )
}
