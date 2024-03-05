'use client'

import { useEffect, useState } from 'react'

import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { ICard } from '@/utils/types'

import { CardList } from '../../components/CardList'
import { ButtonFilter } from '../../components/Filter/ButtonFilter'
import styles from '../CollectionViewer.module.scss'

interface Props {
  playableCards: ICard[]
  nonPlayableCards: ICard[]
}

export const MobileCollectionViewerClient: React.FC<Props> = ({
  playableCards,
  nonPlayableCards,
}) => {
  const [filter, setFilter] = useState<string | null>(null)
  const [allCards, setAllCards] = useState<ICard[]>([])

  const addFirstTimeCollectionViewerApp = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEW_APP,
    STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEW_APP
  )

  useEffect(() => {
    const playableAndNonPlayableCards = playableCards.concat(nonPlayableCards)
    setAllCards(playableAndNonPlayableCards)
    addFirstTimeCollectionViewerApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <main className={styles.mobileWrapper}>
        <div className={styles.wrapper}>
          <div className={styles.filterWrapper}>
            <ButtonFilter
              filter={filter}
              setFilter={setFilter}
              JSONsource={allCards}
              isCollectionView
              isApp={true}
            />
          </div>
          <div className={styles.folder}>
            <CardList
              allCards={allCards}
              filter={filter}
              filterType='theme'
              isApp={true}
            />
          </div>
        </div>
      </main>
    </>
  )
}
