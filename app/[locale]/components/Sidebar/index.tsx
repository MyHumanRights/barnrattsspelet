import { useTranslations } from 'next-intl'

import { useRouter } from '@/navigation'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ICard } from '@/utils/types'

import { Link } from '../Link/Link'
import { AvatarLink } from './AvatarLink'
import { CardCollectionLink } from './CardCollectionLink'
import styles from './Sidebar.module.scss'

export const animationConfig = {
  rotation: 1,
  config: {
    type: 'spring',
    damping: 5,
    stiffness: 600,
  },
}

interface Props {
  cardHand: ICard[]
  numberOfCards: number
  numberOfNewCards: number
  hasNewParts: boolean
}

export const Sidebar: React.FC<Props> = ({
  numberOfCards,
  numberOfNewCards,
  hasNewParts,
}) => {
  const t = useTranslations()
  const router = useRouter()

  // const [animateToken, triggerToken] = useAnimation(animationConfig)
  // const tokensRef = useRef<HTMLAnchorElement>(null)

  // const handleClickInNav = (element: string) => {
  //   switch (element) {
  //     case 'tokens':
  //       currentTokens >= 5 && tokensRef.current?.click()
  //       break
  //     default:
  //       break
  //   }
  // }

  // const handleGoToLootbox = () => {
  //   setGameStateValue({ allowedLootbox: true, isBuyingLootbox: true })
  //   router.push('/loot-box')
  // }

  return (
    <section className={styles.sidebar}>
      <div className={styles.scrollWrapper}>
        <nav
          className={styles.secondaryMenu}
          aria-label={t('Start.secondaryMenu')}
        >
          <Link
            to='/'
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
          >
            {t('mainmenu.startpage')}
          </Link>
        </nav>
        <nav className={styles.menu} aria-label={t('Start.primaryMenu')}>
          <CardCollectionLink
            numberOfNewCards={numberOfNewCards}
            numberOfCards={numberOfCards}
          />

          <AvatarLink hasNewParts={hasNewParts} />

          {/* <motion.div
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
          </motion.div> */}
        </nav>
      </div>
    </section>
  )
}
