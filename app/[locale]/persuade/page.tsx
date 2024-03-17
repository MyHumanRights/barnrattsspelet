import { Metadata } from 'next'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import { PersuadeClient } from './client'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.persuade'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const Persuade = () => {
  return <PersuadeClient />
}

export default Persuade