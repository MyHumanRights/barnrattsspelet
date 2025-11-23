import antagonistsJson from '@/data/antagonists.json'
import avatarJson from '@/data/avatar.json'
import cardsJson from '@/data/cards.json'
import nonPlayableCardsJson from '@/data/nonPlayableCards.json'

import { IAntagonistObject, IAvatarColors, IAvatarParts, ICard } from './types'

export async function getCards(): Promise<ICard[]> {
  return cardsJson as ICard[]
}

export async function getNonPlayableCards(): Promise<ICard[]> {
  return nonPlayableCardsJson as ICard[]
}

export async function getAvatarParts(): Promise<IAvatarParts> {
  return avatarJson.parts as IAvatarParts
}

export async function getAvatarColors(): Promise<IAvatarColors> {
  return avatarJson.colors as IAvatarColors
}

export async function getAntagonists(): Promise<IAntagonistObject> {
  return antagonistsJson as IAntagonistObject
}
