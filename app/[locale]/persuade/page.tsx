import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import { PersuadeClient } from './client'

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params
  setRequestLocale(locale)
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
