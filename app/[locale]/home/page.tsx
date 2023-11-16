import { Metadata } from 'next'
import { getTranslator, unstable_setRequestLocale } from 'next-intl/server'
import { getAntagonists } from '@/utils/getData'
import { IAntagonistObject, LocaleParams } from '@/utils/types'
import { HomeClient } from './client'
import styles from './Home.module.scss'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.home'),
    description: t('description.home'),
  }
}

const Home = async ({ params: { locale } }: LocaleParams) => {
  unstable_setRequestLocale(locale)
  const t = await getTranslator(locale)
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