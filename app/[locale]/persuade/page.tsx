import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import { PersuadeClient } from './client'

export async function generateMetadata(props: LocaleParams): Promise<Metadata> {
  const params = await props.params;

  const {
    locale
  } = params;

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
