import { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

import { getAvatarParts, getCards } from '@/utils/getData'
import { LocaleParams } from '@/utils/types'

import { LootBoxClient } from './client'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
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
