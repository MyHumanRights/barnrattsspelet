import { Client } from './client'
import styles from './AvatarBuilder.module.scss'
import { getAvatarColors } from '@/utils/getData'
import { Metadata } from 'next'
import { getTranslator } from 'next-intl/server'

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.avatarbuilder'),
    description: t('description.avatarbuilder'),
  }
}

const AvatarBuilder = async () => {
  const avatarColors = await getAvatarColors()

  return (
    <main
      className={styles.wrapper}
      style={{
        backgroundImage: 'url("/images/avatarBuilder/avatar-background.svg")',
      }}
    >
      <div className={styles.blurBkgd} />
      <div className={styles.opacityBkgd} />
      <Client avatarColors={avatarColors} />
    </main>
  )
}

export default AvatarBuilder
