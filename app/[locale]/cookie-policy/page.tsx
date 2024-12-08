import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { DeleteButton } from '../components/DeleteButton'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader/'
import styles from './cookiePolicy.module.scss'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.cookiepolicy'),
    description: t('description.cookiepolicy'),
  }
}

const CookiePolicy = ({
  params: { locale },
}: {
  params: { locale: string }
}) => {
  setRequestLocale(locale)
  const t = useTranslations('Cookiepolicy')

  return (
    <>
      <div className={styles.cookiePolicy}>
        <PageHeader
          buttonText={t('startpage')}
          buttonHref='/'
          heading={t('heading')}
          //TODO: how to reload document with nextjs?
          // reloadDocument
        />
        <main className={styles.wrapper}>
          <p className={styles.preamble}>{t('preamble')}</p>
          <div className={styles.articleWrapper}>
            <article>
              <p>{t('paragraph1')}</p>
              <p>{t('paragraph2')}</p>
              <p>
                <strong>{t('paragraph3')}</strong> {t('paragraph4')}
              </p>
              <p>{t('paragraph5')}</p>
              <p>{t('paragraph6')}</p>
              <ul>
                <li>
                  <p>
                    {t('li1')} <strong>{t('on')}</strong>/{t('off')}
                  </p>
                </li>
                <li>
                  <p>
                    {t('li2')} {t('on')}/<strong>{t('off')}</strong>
                  </p>
                </li>
                <li>
                  <p>
                    {t('li3')} {t('on')}/<strong>{t('off')}</strong>
                  </p>
                </li>
                <li>
                  <p>
                    {t('li4')} <strong>{t('on')}</strong>/{t('off')}
                  </p>
                </li>
                <li>
                  <p>
                    {t('li5')} {t('on')}/<strong>{t('off')}</strong>
                  </p>
                </li>
              </ul>
              <h2>{t('subheading1')}</h2>
              <p>{t('paragraph7')}</p>
              <DeleteButton />
              <p>{t('paragraph8')}</p>
            </article>
          </div>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default CookiePolicy
