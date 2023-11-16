import { Metadata } from 'next'
import { getTranslator, unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'
import { ChatBubbleSimple } from '../components/ChatBubble/ChatBubbleSimple'
import { getCards } from '@/utils/getData'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.scenarios'),
    description: t('description.scenarios'),
  }
}

const About: React.FC<LocaleParams> = async ({ params: { locale } }) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslator(locale)

  const cards = await getCards()

  console.log(cards)

  return (
    <div>
      <h1>{t('readmoreonhelp')}</h1>
      <ChatBubbleSimple>
        <p>chat bubble simple</p>
      </ChatBubbleSimple>
    </div>
  )
}

export default About
