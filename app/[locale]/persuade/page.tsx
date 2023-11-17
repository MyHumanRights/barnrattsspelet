import { Metadata } from 'next'
import { PersuadeClient } from './client'
import { getTranslator, unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslator(locale, 'meta')

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
