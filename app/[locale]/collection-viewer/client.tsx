'use client'

import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useTokens } from '@/utils/hooks/useTokens'
import { ICard } from '@/utils/types'

import { CardList } from '../components/CardList/'
import { ButtonFilter } from '../components/Filter/ButtonFilter'
import { TabFilter } from '../components/Filter/TabFilter'
import { Folder } from '../components/Folder/'
import { Link } from '../components/Link/Link'
import { Modal } from '../components/Modal'
import { ModalContent } from '../components/Modal/ModalContent'
import { Token } from '../components/Token/'
import styles from './CollectionViewer.module.scss'

interface Props {
  playableCards: ICard[]
  nonPlayableCards: ICard[]
}

export const Client: React.FC<Props> = ({
  playableCards,
  nonPlayableCards,
}) => {
  const t = useTranslations('Collectionviewer')
  const [showBoostModal, setShowBoostModal] = useState(false)
  const [currentCard, setCurrentCard] = useState<ICard | null>(null)
  const [ownedTokens] = useTokens(showBoostModal)
  const [filter, setFilter] = useState<string | null>(null)
  const [allCards, setAllCards] = useState<ICard[]>([])

  const { isMobile } = useOptionsContext()

  const addFirstTimeCollectionViewer = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEWER,
    STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEWER
  )

  useEffect(() => {
    const playableAndNonPlayableCards = playableCards.concat(nonPlayableCards)

    setAllCards(playableAndNonPlayableCards)
    addFirstTimeCollectionViewer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function openBoost(card: ICard) {
    setCurrentCard(card)
    setShowBoostModal(true)
  }

  return (
    <>
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
              <ButtonFilter
                filter={filter}
                setFilter={setFilter}
                JSONsource={allCards}
                isCollectionView
              />
            </div>

            <h1 className={styles.title}>{t('heading')}</h1>
            <div className={styles.folder}>
              {isMobile ? (
                <CardList
                  allCards={allCards}
                  filter={filter}
                  filterType='theme'
                  isCollectionViewer={true}
                  onOpenBoost={openBoost}
                />
              ) : (
                <Folder>
                  <CardList
                    allCards={allCards}
                    filter={filter}
                    filterType='theme'
                    isCollectionViewer={true}
                    onOpenBoost={openBoost}
                  />
                </Folder>
              )}
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
    </>
  )
}
