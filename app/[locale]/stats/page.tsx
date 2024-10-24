import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import styles from './Stats.module.scss'
import { StatsClient } from './StatsClient'

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

const Stats = () => {
  return (
    <>
      <main className={styles.wrapper}>
        <StatsClient />
      </main>
    </>
  )
}
export default Stats
