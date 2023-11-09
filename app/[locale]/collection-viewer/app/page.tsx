import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Helmet } from 'react-helmet-async'
import { CardList } from '../../components'
import ButtonFilter from '../../components/Filter/ButtonFilter'
import styles from './CollectionViewer.module.scss'
import useAddToStatistics from '../../utils/hooks/useAddToStatistics'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '../../utils/constants'

const MobileCollectionViewer = () => {
  const t = useTranslations()
  const [filter, setFilter] = useState(null)
  const [allCards, setAllCards] = useState([])

  const addFirstTimeCollectionViewerApp = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_COLLECTION_VIEW_APP,
    STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEW_APP
  )

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const [cardsResponse, nonPlayableCardsResponse] = await Promise.all([
          fetch('../../data/cards.json'),
          fetch('../../data/nonPlayableCards.json'),
        ])

        if (!cardsResponse.ok || !nonPlayableCardsResponse.ok) {
          throw new Error('Failed to fetch card data')
        }

        const cardsData = await cardsResponse.json()
        const nonPlayableCardsData = await nonPlayableCardsResponse.json()

        const combinedCards = [...cardsData, ...nonPlayableCardsData]

        setAllCards(combinedCards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchCards()
  }, [])

  useEffect(() => {
    addFirstTimeCollectionViewerApp()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Helmet>
        <title>{t('common:meta:title:collectionviewer')}</title>
        <meta
          name='description'
          content={t('common:meta:description:collectionviewer')}
        />
        <meta name='robots' content='noindex' />
      </Helmet>

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
              {...{
                setMyCards: () => {}, // Not needed in this context
                myCards: [],
                allCards,
                setAllCards,
                filter,
                filterType: 'theme',
                isApp: true,
              }}
            />
          </div>
        </div>
      </main>
    </>
  )
}

export default MobileCollectionViewer
