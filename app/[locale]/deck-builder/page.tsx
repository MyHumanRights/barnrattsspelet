import { Metadata } from 'next'
import { DeckBuilderClient } from './client'
import styles from './DeckBuilder.module.scss'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.deckbuilder'),
    description: t('description.deckbuilder'),
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
