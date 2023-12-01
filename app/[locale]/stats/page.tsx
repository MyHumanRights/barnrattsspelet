import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'
import { StatsClient } from './client'
import styles from './Stats.module.scss'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.stats'),
    description: t('description.stats'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const Stats: React.FC = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <StatsClient />
      </main>
    </>
  )
}
export default Stats
