import { unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { getTranslator } from 'next-intl/server'
import { useTranslations } from 'next-intl'
// import { setCardHand, setPlayFromScenario } from '../../../api/storage'
import { PageHeader } from '../components/PageHeader'
import Footer from '../components/Footer'
import styles from './Guidance.module.scss'
import { DownloadPdf } from '../components/DownloadPdf'
import { Link } from '../components/Link/Link'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.guidance'),
    description: t('description.guidance'),
  }
}

const Guidance = ({ params: { locale } }: { params: { locale: string } }) => {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Guidance')
  // const location = useLocation()
  // const from = location.state?.from

  // useEffect(() => {
  //   ;(async function () {
  //     if (from === '/scenarios') {
  //       await setPlayFromScenario(false)
  //       await setCardHand([])
  //     }
  //   })()
  // }, [from])

  return (
    <div className={styles.guidance}>
      <PageHeader
        buttonText={t('startpage')}
        buttonHref='/'
        heading={t('title')}
      />
      <main className={styles.wrapper}>
        <article className={styles.article}>
          <p>{t('paragraph1')}</p>
          <p>{t('paragraph2')}</p>
          <p>{t('paragraph3')}</p>
        </article>
        <div className={styles.backgroundImage} />
        <div className={styles.buttons}>
          <DownloadPdf />
          <p>{t('or')}</p>
          <Link
            to='/scenarios'
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
          >
            {t('specificScenario')}
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Guidance
