import { getCards } from '@/utils/getData'
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
  const cards = await getCards()
  console.log({ locale })

  return (
    <div>
      <h1>{t('readmoreonhelp')}</h1>
      <AboutClient cards={cards} />
    </div>
  )
}

export default About
