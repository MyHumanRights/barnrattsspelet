'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { AnimatePresence } from 'framer-motion'
import { useOptionsContext } from '@/contexts/OptionsContext'
import playableCards from '@/data/cards.json'
import nonPlayableCards from '@/data/nonPlayableCards.json'
import { useWindowSize } from '@/utils/hooks/useWindowSize'
import { useTokens } from '@/utils/hooks/useTokens'
import { Link } from '../components/Link/Link'
import { Folder } from '../components/Folder/'
import { CardList } from '../components/CardList/'
import { Modal } from '../components/Modal/Modal'
import { ModalContent } from '../components/Modal/ModalContent'
import { ButtonFilter } from '../components/Filter/ButtonFilter'
import { TabFilter } from '../components/Filter/TabFilter'
import { Token } from '../components/Token/'

// import useAddToStatistics from '@/utils/hooks/useAddToStatistics'
// import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import styles from './CollectionViewer.module.scss'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ICard } from '@/utils/types'

const CollectionViewer: React.FC = () => {
  const t = useTranslations('Collectionviewer')
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [currentCard, setCurrentCard] = useState<ICard | null>(null)
  const { width } = useWindowSize()
  const [ownedTokens] = useTokens(showBoostModal)
  const [filter, setFilter] = useState<string | null>(null)
  const [allCards, setAllCards] = useState<ICard[]>([])

  const { isMobile } = useOptionsContext()

  // const addFirstTimeCollectionViewer = useAddToStatistics(
  //   STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEWER,
  //   STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEWER
  // )

  async function setCardsFromJSONFiles() {
    //@ts-ignore
    const playableAndNonPlayableCards = playableCards.concat(nonPlayableCards)
    //@ts-ignore
    setAllCards(playableAndNonPlayableCards)
  }

  useEffect(() => {
    setCardsFromJSONFiles()

    // addFirstTimeCollectionViewer()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openBoost(card: ICard) {
    // Temp check of card.question during dev.
    if (!card.quiz) return alert('Kortet har ingen fråga sparat!')
    setCurrentCard(card)
    setShowBoostModal(true)
  }

  return (
    <>
      {/* <Helmet>
        <title>{t('common:meta:title:collectionviewer')}</title>
        <meta
          name='description'
          content={t('common:meta:description:collectionviewer')}
        />
      </Helmet> */}
      <div
        className={styles.collectionViewer}
        style={{
          backgroundImage: 'url("/images/start/map-large.svg")',
        }}
      >
        {!isMobile && <div className={styles.blurBkgd} />}
        <div className={styles.opacityBkgd} />
        <div className={styles.content}>
          <div className={styles.headerLink}>
            <Link
              to='/'
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.SMALL}
            >
              {t('startpage')}
            </Link>
          </div>

          <main className={styles.outerWrapper}>
            <div className={styles.wrapper}>
              <div className={styles.tokenWrapper}>
                <AnimatePresence>
                  {ownedTokens > 0 && <Token ownedTokens={ownedTokens} />}
                </AnimatePresence>
              </div>
              <div className={styles.filterWrapper}>
                <TabFilter
                  filter={filter}
                  setFilter={setFilter}
                  JSONsource={allCards}
                  isCollectionView
                />
                {/* {width > 800 ? (
                  <TabFilter
                    filter={filter}
                    setFilter={setFilter}
                    JSONsource={allCards}
                    isCollectionView
                  />
                ) : (
                  <ButtonFilter
                    filter={filter}
                    setFilter={setFilter}
                    JSONsource={allCards}
                    isCollectionView
                  />
                )} */}
              </div>

              <h1 className={styles.title}>{t('heading')}</h1>
              <div className={styles.folder}>
                {/* {isMobile ? (
                  <CardList
                    setMyCards={() => {}}
                    myCards={[]}
                    allCards={allCards}
                    setAllCards={setAllCards}
                    filter={filter}
                    filterType='theme'
                    isCollectionViewer={true}
                    onOpenBoost={openBoost}
                  />
                ) : ( */}
                <Folder>
                  <CardList
                    setMyCards={() => {}}
                    myCards={[]}
                    allCards={allCards}
                    setAllCards={setAllCards}
                    filter={filter}
                    filterType='theme'
                    isCollectionViewer={true}
                    onOpenBoost={openBoost}
                  />
                </Folder>
                {/* )} */}
              </div>
            </div>

            <AnimatePresence>
              {showBoostModal && (
                <Modal onModalClose={() => setShowBoostModal(false)}>
                  <ModalContent
                    card={currentCard}
                    onModalClose={() => setShowBoostModal(false)}
                    onCardBoosted={() => {}}
                  />
                </Modal>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </>
  )
}

export default CollectionViewer
