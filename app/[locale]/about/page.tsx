import { Metadata } from 'next'
import { getTranslator, unstable_setRequestLocale } from 'next-intl/server'
import { IAntagonistObject, ICard, LocaleParams } from '@/utils/types'
import { ChatBubbleSimple } from '../components/ChatBubble/ChatBubbleSimple'
import { getAntagonists, getCards } from '@/utils/getData'
import { AboutClient } from './client'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { Link } from '../components/Link/Link'
import { DownloadPdf } from '../components/DownloadPdf'

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

  const cards: ICard[] = await getCards()
  const antagonists: IAntagonistObject = await getAntagonists()

  return (
    <div>
      <h1>{t('readmoreonhelp')}</h1>
      <ChatBubbleSimple>
        <p>chat bubble simple</p>
      </ChatBubbleSimple>
      <Link to='/' variant={ButtonVariant.SECONDARY} size={ButtonSize.SMALL}>
        {t('mainmenu.startpage')}
      </Link>
      <DownloadPdf />
      <AboutClient antagonistsObj={antagonists} cards={cards} />
    </div>
  )
}

export default About
