import { useRef } from 'react'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import { useRouter } from '@/navigation'
import { useOptionsContext } from '@/contexts/OptionsContext'
import playableCards from '@/data/cards.json'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { Link } from '../Link/Link'
import { CardCollectionIcon } from '../CardCollectionIcon'
import { Token } from '../Token'
import { Button } from '../Button'
import { ArrowRight } from '../Icons/ArrowRight'
import NewCards from '../Icons/NewCards'
import NewPart from '../Icons/NewPart'
import styles from './LeftSidebarContent.module.scss'
import { ICard } from '@/utils/types'
import { setGameStateValue } from '@/api/storage'

interface AvatarProps {
  link: React.ReactNode
}

const LazyAvatar = dynamic<AvatarProps>(
  () => import('../Avatar').then((mod) => mod.Avatar) as any
)

const animationConfig = {
  rotation: 1,
  config: {
    type: 'spring',
    damping: 5,
    stiffness: 600,
  },
}

const NO_OF_PLAYABLE_CARDS = playableCards.length

interface Props {
  cardHand: ICard[]
  toggleShowingSidebar: () => void
  numberOfCards: number
  numberOfNewCards: number
  currentTokens: number
  hasNewParts: boolean
}

export const LeftSidebarContent: React.FC<Props> = ({
  cardHand,
  toggleShowingSidebar,
  numberOfCards,
  numberOfNewCards,
  currentTokens,
  hasNewParts,
}) => {
  const t = useTranslations()
  const router = useRouter()
  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const [animateCollection, triggerCollection] = useAnimation(animationConfig)
  const [animateAvatar, triggerAvatar] = useAnimation(animationConfig)
  const [animateToken, triggerToken] = useAnimation(animationConfig)
  const { isMobile } = useOptionsContext()

  const deckBuilderRef = useRef<HTMLAnchorElement>(null)
  const avatarRef = useRef<HTMLAnchorElement>(null)
  const tokensRef = useRef<HTMLAnchorElement>(null)

  const handleClickInNav = (element: string) => {
    switch (element) {
      case 'deck-builder':
        deckBuilderRef.current?.click()
        break
      case 'avatar':
        avatarRef.current?.click()
        break
      case 'tokens':
        currentTokens >= 5 && tokensRef.current?.click()
        break
      default:
        break
    }
  }

  const handleGoToLootbox = () => {
    setGameStateValue({ allowedLootbox: true, isByingLootbox: true })
    router.push('/loot-box')
  }

  const playButton = (
    <Button
      as={cardHand.length ? 'button' : Link}
      to={cardHand.length ? undefined : '/deck-builder'}
      onClick={cardHand.length ? toggleShowingSidebar : undefined}
      variant={ButtonVariant.PRIMARY}
      size={isMobile ? ButtonSize.LARGE : ButtonSize.SMALL}
      onMouseEnter={triggerArrow}
      uppercase
    >
      <span>
        {t('home.play')}
        <motion.span animate={animateArrow}>
          <ArrowRight />
        </motion.span>
      </span>
    </Button>
  )

  return (
    <>
      <nav
        className={styles.secondaryMenu}
        aria-label={t('Start.secondaryMenu')}
      >
        <Link to='/' variant={ButtonVariant.SECONDARY} size={ButtonSize.SMALL}>
          {t('mainmenu.startpage')}
        </Link>
        {!isMobile && playButton}
      </nav>
      <nav className={styles.menu} aria-label={t('Start.primaryMenu')}>
        <motion.div
          className={styles.linkWrapper}
          onClick={() => handleClickInNav('deck-builder')}
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

        <motion.div
          className={styles.linkWrapper}
          onClick={() => handleClickInNav('avatar')}
          animate={animateAvatar}
          onMouseEnter={triggerAvatar}
        >
          <div className={styles.linkContent}>
            <div className={styles.avatarWrapper}>
              {hasNewParts && (
                <div className={styles.newPart}>
                  <NewPart />
                  <p className='sr-only'>{t('home.newpart')}</p>
                </div>
              )}
              <LazyAvatar
                link={
                  <Link
                    to='/avatar-builder'
                    variant={ButtonVariant.TEXT}
                    size={ButtonSize.MEDIUM}
                    ref={avatarRef}
                    fullWidth
                  >
                    {t('home.createavatar')}
                  </Link>
                }
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className={`${styles.linkWrapper} ${
            currentTokens < 5 ? styles.disabled : ''
          }`}
          onClick={() => handleClickInNav('tokens')}
          animate={animateToken}
          onMouseEnter={triggerToken}
        >
          <div className={`${styles.tokensContent} ${styles.linkContent}`}>
            <Token
              ownedTokens={currentTokens}
              size={isMobile ? 'medium' : 'large'}
            />
          </div>
          <Button
            style={{ margin: 'auto' }}
            onClick={handleGoToLootbox}
            variant={ButtonVariant.TEXT}
            size={ButtonSize.MEDIUM}
            ref={tokensRef}
          >
            {t('home.buylootbox')}
          </Button>
        </motion.div>
        {isMobile && (
          <div className={styles.playButtonWrapper}>{playButton}</div>
        )}
      </nav>
    </>
  )
}
