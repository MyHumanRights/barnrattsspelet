import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import styles from './AvatarBuilder.module.scss'
import { AvatarBuilderClient } from './client'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.avatarbuilder'),
    description: t('description.avatarbuilder'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const AvatarBuilder = async () => {
  return (
    <main
      className={styles.wrapper}
      style={{
        backgroundImage: 'url("/images/avatarBuilder/avatar-background.svg")',
      }}
    >
      <div className={styles.blurBkgd} />
      <div className={styles.opacityBkgd} />
      <AvatarBuilderClient />
    </main>
  )
}

export default AvatarBuilder
