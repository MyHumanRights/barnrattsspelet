import { getTranslator } from 'next-intl/server'
import { getAntagonists } from '@/utils/getData'
import { HomeClient } from './client'
import styles from './Home.module.scss'
import { IAntagonistObject } from '@/utils/types'
import { Metadata } from 'next'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.home'),
    description: t('description.home'),
  }
}

const Home = async ({ params: { locale } }: { params: { locale: string } }) => {
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
