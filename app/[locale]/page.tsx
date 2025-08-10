import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { LocaleParams } from '@/utils/types'

import { Client } from './client'
import { ChatBubbleSimple } from './components/ChatBubble/ChatBubbleSimple'
import { Footer } from './components/Footer'
import { Link } from './components/Link/Link'
import { MapBackground } from './components/MapBackground'
import styles from './page.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.start'),
    description: t('description.start'),
  }
}

async function StartPage({ params }: LocaleParams) {
  const { locale } = await params

  setRequestLocale(locale)

  const t = await getTranslations('Start')

  return (
    <div className={styles.wrapper}>
      <main className={styles.start}>
        <MapBackground />
        <div className={styles.headerList}>
          <Link
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            to='/guidance'
          >
            {t('guidance')}
          </Link>
          <Link
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            to='/manual'
          >
            {t('manual')}
          </Link>
        </div>
        <Client />
        <nav className={styles.secondaryMenu} aria-label={t('secondaryMenu')}>
          <ChatBubbleSimple>
            <p className={styles.text}>{t('descriptionThree')}</p>
            <div className={styles.linkWrapper}>
              <Link to='/collection-viewer' variant={ButtonVariant.SECONDARY}>
                {t('seeCards')}
              </Link>
            </div>
          </ChatBubbleSimple>
        </nav>
        <div
          className={styles.avatars}
          style={{
            backgroundImage: 'url("/images/start/avatarer-startsida.svg")',
          }}
        />
      </main>
      <Footer />
    </div>
  )
}

export default StartPage
