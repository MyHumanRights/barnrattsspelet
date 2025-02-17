import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { DeckBuilderClient } from './client'
import styles from './DeckBuilder.module.scss'

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
    title: t('title.deckbuilder'),
    description: t('description.deckbuilder'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const DeckBuilder = () => {
  return (
    <div
      className={styles.deckbuilder}
      style={{
        backgroundImage: 'url("/images/start/map-large.svg")',
      }}
    >
      <main className={styles.outerWrapper}>
        <DeckBuilderClient />
      </main>
    </div>
  )
}

export default DeckBuilder
