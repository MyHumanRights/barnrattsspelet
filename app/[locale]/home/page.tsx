import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getAntagonists } from '@/utils/getData'
import { IAntagonistObject, LocaleParams } from '@/utils/types'

import { HomeClient } from './client'
import styles from './Home.module.scss'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('meta')

  return {
    title: t('title.home'),
    description: t('description.home'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const Home = async ({ params }: LocaleParams) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations()
  const antagonists: IAntagonistObject = await getAntagonists()

  return (
    <>
      <header className={styles.header}>
        <h1 className='sr-only'>{t('home.mainheading')}</h1>
      </header>
      <main className={styles.home}>
        <HomeClient antagonists={antagonists} />
      </main>
    </>
  )
}

export default Home
