import { getTranslations, unstable_setRequestLocale } from 'next-intl/server'
import { Metadata } from 'next'
import { LocaleParams } from '@/utils/types'
import { getAvatarParts, getCards } from '@/utils/getData'
import { LootBoxClient } from './client'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  unstable_setRequestLocale(locale)
  const t = await getTranslations('meta')

  return {
    title: t('title.stats'),
    description: t('description.stats'),
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
