import { Suspense } from 'react'
import { Link } from '../components/Link/Link'
import { getTranslator } from 'next-intl/server'
import { Metadata } from 'next'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { getAntagonists, getCards } from '@/utils/getData'
import { DownloadPdf } from '../components/DownloadPdf'
import { ScenariosClient } from './ScenariosClient'
import styles from './Scenarios.module.scss'
import { IAntagonistObject, ICard, LocaleParams } from '@/utils/types'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.scenarios'),
    description: t('description.scenarios'),
  }
}

const Scenarios: React.FC<LocaleParams> = async ({ params: { locale } }) => {
  const t = await getTranslator(locale)
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
          <Suspense fallback={<p>Loading feed...</p>}>
            <ScenariosClient antagonistsObj={antagonists} cards={cards} />
          </Suspense>
        </div>
      </main>
    </>
  )
}

export default Scenarios
