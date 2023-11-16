import { AboutClient } from './client'
import { Metadata } from 'next'
import { getTranslator } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.scenarios'),
    description: t('description.scenarios'),
  }
}

const About: React.FC<LocaleParams> = async ({ params: { locale } }) => {
  const t = await getTranslator(locale)

  return (
    <div>
      <h1>{t('readmoreonhelp')}</h1>
      <AboutClient />
    </div>
  )
}

export default About
