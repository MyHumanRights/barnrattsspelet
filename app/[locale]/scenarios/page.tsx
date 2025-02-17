import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { getAntagonists, getCards } from '@/utils/getData'
import { IAntagonistObject, ICard, LocaleParams } from '@/utils/types'

import { DownloadPdf } from '../components/DownloadPdf'
import { Link } from '../components/Link/Link'
import styles from './Scenarios.module.scss'
import { ScenariosClient } from './ScenariosClient'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.scenarios'),
    description: t('description.scenarios'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const Scenarios = async (props: LocaleParams) => {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale)
  const t = await getTranslations()
  const antagonists: IAntagonistObject = await getAntagonists()
  const cards: ICard[] = await getCards()

  return (
    <>
      <main
        className={styles.wrapper}
        style={{
          backgroundImage: 'url(/images/start/map-large.svg)',
        }}
      >
        <div className={styles.blurBkgd} />
        <div className={styles.opacityBkgd} />
        <div className={styles.content}>
          <div className={styles.topWrapper}>
            <div className={styles.headerLink}>
              <Link
                to='/'
                variant={ButtonVariant.SECONDARY}
                size={ButtonSize.SMALL}
              >
                {t('mainmenu.startpage')}
              </Link>
            </div>
            <div className={styles.titleWrapper}>
              <h1>{t('scenarios.header')}</h1>
              <p>{t('scenarios.description')}</p>
            </div>
            <div className={styles.downloadWrapper}>
              <DownloadPdf />
            </div>
          </div>
          <ScenariosClient antagonistsObj={antagonists} cards={cards} />
        </div>
      </main>
    </>
  )
}

export default Scenarios
