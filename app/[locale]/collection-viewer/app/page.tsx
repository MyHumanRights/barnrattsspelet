import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getCards, getNonPlayableCards } from '@/utils/getData'

import styles from '../CollectionViewer.module.scss'
import { MobileCollectionViewerClient } from './client'

export async function generateMetadata(
  props: {
    params: Promise<{ locale: string }>
  }
): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.collectionviewer'),
    description: t('description.collectionviewer'),
    robots: {
      index: false,
      follow: false,
    },
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
