import { Metadata } from 'next'
import Image from 'next/image'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import styles from './Manual.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.manual'),
    description: t('description.manual'),
  }
}

const Manual = async ({ params }: LocaleParams) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Manual')

  return (
    <div className={styles.manual}>
      <PageHeader
        buttonText={t('startpage')}
        buttonHref='/'
        heading={t('title')}
      />
      <main className={styles.wrapper}>
        {t.rich('preamble', {
          p: (chunks) => <p className={styles.preamble}>{chunks}</p>,
        })}
        <article className={styles.articleWrapper}>
          <div className={styles.text}>
            <h2>{t('howToPlay')}</h2>
            <ol>
              <li>{t('howToPlayText1')}</li>
              <li>{t('howToPlayText2')}</li>
            </ol>
          </div>

          <div className={styles.text}>
            <h2>{t('avatar')}</h2>
            <p>{t('avatartext')}</p>
          </div>

          <div className={styles.textWrapper}>
            <div className={styles.text}>
              <h2>{t('map')}</h2>
              <p>{t('maptext')}</p>
            </div>

            <div
              className={styles.backgroundsOwl}
              style={{
                backgroundImage: 'url("/images/owl/owl.svg")',
              }}
            />
          </div>

          <div className={styles.text}>
            <h2>{t('challenges')}</h2>
            <p>
              {t.rich('challengestext', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p>
              {t.rich('tip', {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </div>

          <div className={styles.text}>
            <h2>{t('tokens')}</h2>
            <div className={styles.textWithImage}>
              <p>{t('tokenstext')}</p>
              <Image
                src='/images/manual/token.png'
                alt={t('tokensimagealt')}
                width='100'
                height='94'
              />
            </div>
          </div>

          <div className={styles.text}>
            <h2>{t('settings')}</h2>
            <div className={styles.textWithImage}>
              <p>{t('settingstext')}</p>
              <Image
                src='/images/manual/settings-dialog.png'
                alt={t('settingsimagealt')}
                width='300'
                height='196'
              />
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Manual
