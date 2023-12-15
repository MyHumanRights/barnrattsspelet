import { Metadata } from 'next'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import styles from './Manual.module.scss'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.manual'),
    description: t('description.manual'),
  }
}

const Manual = ({ params: { locale } }: LocaleParams) => {
  unstable_setRequestLocale(locale)
  const t = useTranslations('Manual')

  return (
    <div className={styles.manual}>
      <PageHeader
        buttonText={t('startpage')}
        buttonHref='/'
        heading={t('title')}
      />
      <main className={styles.wrapper}>
        <p className={styles.preamble}>{t('preamble')}</p>
        <article className={styles.articleWrapper}>
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
            <p>{t('challengestext1')}</p>
            <p>{t('challengestext2')}</p>
            <p>{t('challengestext3')}</p>
            <p>
              <strong>{t('tip')}</strong> {t('challengestext4')}
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
            <h2>{t('quiz')}</h2>
            <p>
              {t('quiztext1')} <strong>{t('quiztextplay')}</strong>{' '}
              {t('quiztext2')} <strong>{t('quiztexttoken')}</strong>{' '}
              {t('quiztext3')}
            </p>
          </div>

          <div className={styles.text}>
            <h2>{t('cards')}</h2>
            <p>{t('cardstext')}</p>
          </div>

          <div className={styles.text}>
            <h2>{t('settings')}</h2>
            <p>{t('settingstext1')}</p>
            <div className={styles.textWithImage}>
              <ul>
                <li>
                  <p>{t('settingsli1')}</p>
                </li>
                <li>
                  <p>{t('settingsli2')}</p>
                </li>
                <li>
                  <p>{t('settingsli3')}</p>
                </li>
                <li>
                  <p>{t('settingsli4')}</p>
                </li>
                <li>
                  <p>{t('settingsli5')}</p>
                </li>
              </ul>
              <Image
                src='/images/manual/settings-dialog.png'
                alt={t('settingsimagealt')}
                width='400'
                height='262'
              />
            </div>
            <p>{t('settingstext2')}</p>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  )
}

export default Manual
