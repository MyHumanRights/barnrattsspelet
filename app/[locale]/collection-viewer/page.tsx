import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getCards, getNonPlayableCards } from '@/utils/getData'
import { LocaleParams } from '@/utils/types'

import { Client } from './client'
import styles from './CollectionViewer.module.scss'

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
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
