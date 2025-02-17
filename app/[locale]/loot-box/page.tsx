import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getAvatarParts, getCards } from '@/utils/getData'

import { LootBoxClient } from './client'

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const params = await props.params

  const { locale } = params

  setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.lootbox'),
    description: t('description.lootbox'),
    robots: {
      index: false,
      follow: false,
    },
  }
}

const LootBox = async () => {
  const cards = await getCards()
  const avatarParts = await getAvatarParts()
  return <LootBoxClient cardData={cards} avatarParts={avatarParts} />
}

export default LootBox
