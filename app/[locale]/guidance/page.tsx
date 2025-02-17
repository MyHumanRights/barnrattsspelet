import { use } from "react";
import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { getTranslations } from 'next-intl/server'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { LocaleParams } from '@/utils/types'

import { DownloadPdf } from '../components/DownloadPdf'
import Footer from '../components/Footer'
import { Link } from '../components/Link/Link'
import { PageHeader } from '../components/PageHeader'
import styles from './Guidance.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.guidance'),
    description: t('description.guidance'),
  }
}

const Guidance = (props: LocaleParams) => {
  const params = use(props.params);

  const {
    locale
  } = params;

  setRequestLocale(locale)
  const t = useTranslations('Guidance')

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
