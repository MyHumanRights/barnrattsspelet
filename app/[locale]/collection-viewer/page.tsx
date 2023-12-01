import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { Client } from './client'
import styles from './CollectionViewer.module.scss'
import { getCards, getNonPlayableCards } from '@/utils/getData'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.collectionviewer'),
    description: t('description.collectionviewer'),
  }
}

const CollectionViewer = async () => {
  const cards = await getCards()
  const nonPlayableCards = await getNonPlayableCards()

  return (
    <div
      className={styles.collectionViewer}
      style={{
        backgroundImage: 'url("/images/start/map-large.svg")',
      }}
    >
      <Client playableCards={cards} nonPlayableCards={nonPlayableCards} />
    </div>
  )
}

export default CollectionViewer
