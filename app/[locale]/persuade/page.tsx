import { Metadata } from 'next'
import { PersuadeClient } from './client'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.persuade'),
  }
}

const Persuade = () => {
  return <PersuadeClient />
}

export default Persuade
