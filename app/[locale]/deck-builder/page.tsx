import { Metadata } from 'next'
import { DeckBuilderClient } from './client'
import styles from './DeckBuilder.module.scss'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  unstable_setRequestLocale(locale)
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
