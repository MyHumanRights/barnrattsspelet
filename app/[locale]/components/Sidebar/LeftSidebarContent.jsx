import { lazy, Suspense, useContext, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import playableCards from '../../data/cards.json'
import { Link, CardCollectionIcon, Token, Button } from '../'
import { useAnimation } from '@/utils/hooks/useAnimation'
import styles from './LeftSidebarContent.module.scss'
import ArrowRight from '../Icons/ArrowRight'
import Loader from '../Loader/Loader'
import NewCards from '../Icons/NewCards'
import NewPart from '../Icons/NewPart'
import { useOptionsContext } from '@/contexts/OptionsContext'

const LazyAvatar = lazy(() => import('../../components/Avatar/Avatar'))

const animationConfig = {
  rotation: 1,
  config: {
    type: 'spring',
    damping: 5,
    stiffness: 600,
  },
}

const NO_OF_PLAYABLE_CARDS = playableCards.length

const LeftSidebarContent = ({
  cardHand,
  toggleShowingSidebar,
  numberOfCards,
  numberOfNewCards,
  currentTokens,
  hasNewParts,
}) => {
  const t = useTranslations()

  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const [animateCollection, triggerCollection] = useAnimation(animationConfig)
  const [animateAvatar, triggerAvatar] = useAnimation(animationConfig)
  const [animateToken, triggerToken] = useAnimation(animationConfig)
  const { isMobile } = useContext(OptionsContext)

  const deckBuilderRef = useRef()
  const avatarRef = useRef()
  const tokensRef = useRef()

  const handleClickInNav = (element) => {
    switch (element) {
      case 'deck-builder':
        deckBuilderRef.current.click()
        break
      case 'avatar':
        avatarRef.current.click()
        break
      case 'tokens':
        currentTokens >= 5 && tokensRef.current.click()
        break
      default:
        break
    }
  }

  const playButton = (
    <Button
      as={cardHand.length ? 'button' : Link}
      to={cardHand.length ? undefined : '/deck-builder'}
      onClick={cardHand.length ? toggleShowingSidebar : undefined}
      variant={ButtonVariant.PRIMARY}
      size={isMobile ? 'large' : 'small'}
      onMouseEnter={triggerArrow}
      uppercase
    >
      <span>
        {t('common:home:play')}
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
        aria-label={t('common:start:secondaryMenu')}
      >
        <Link to='/' variant='secondary' size='small'>
          {t('common:mainmenu:startpage')}
        </Link>
        {!isMobile && playButton}
      </nav>
      <nav className={styles.menu} aria-label={t('common:start:primaryMenu')}>
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
                    {t('common:numberOfNewCards', {
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
            variant='text'
            size='medium'
            ref={deckBuilderRef}
            fullWidth
          >
            {t('common:home:mycollectionbutton')}
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
                  <p className='sr-only'>{t('common:home:newpart')}</p>
                </div>
              )}
              <Suspense fallback={<Loader />}>
                <LazyAvatar
                  link={
                    <Link
                      to='/avatar-builder'
                      variant='text'
                      size='medium'
                      ref={avatarRef}
                      fullWidth
                    >
                      {t('common:home:createavatar')}
                    </Link>
                  }
                />
              </Suspense>
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
              size={isMobile ? 'small' : 'medium'}
            />
          </div>
          <Link
            to={currentTokens >= 5 ? '/loot-box' : '/home'}
            state={currentTokens >= 5 ? { from: '/home', allowed: true } : {}}
            variant='text'
            size='medium'
            disabled={currentTokens < 5}
            ref={tokensRef}
          >
            {t('common:home:buylootbox')}
          </Link>
        </motion.div>
        {isMobile && (
          <div className={styles.playButtonWrapper}>{playButton}</div>
        )}
      </nav>
    </>
  )
}

export default LeftSidebarContent
