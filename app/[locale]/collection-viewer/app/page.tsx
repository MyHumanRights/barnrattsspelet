import { getCards, getNonPlayableCards } from '@/utils/getData'
import { getTranslator } from 'next-intl/server'
import { MobileCollectionViewerClient } from './client'
import styles from '../CollectionViewer.module.scss'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.collectionviewer'),
    description: t('description.collectionviewer'),
  }
}

const MobileCollectionViewer = async () => {
  const cards = await getCards()
  const nonPlayableCards = await getNonPlayableCards()

  return (
    <>
      <main className={styles.mobileWrapper}>
        <div className={styles.wrapper}>
          <MobileCollectionViewerClient
            playableCards={cards}
            nonPlayableCards={nonPlayableCards}
          />
        </div>
      </main>
    </>
  )
}

export default MobileCollectionViewer
