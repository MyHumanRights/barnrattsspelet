import { promises as fs } from 'fs'
import { IAntagonistObject, IAvatarColors, IAvatarParts, ICard } from './types'

export async function getCards(): Promise<ICard[]> {
  const file = await fs.readFile(process.cwd() + '/data/cards.json', 'utf8')
  return JSON.parse(file)
}

export async function getNonPlayableCards(): Promise<ICard[]> {
  const file = await fs.readFile(
    process.cwd() + '/data/nonPlayableCards.json',
    'utf8'
  )
  return JSON.parse(file)
}

export async function getAvatarParts(): Promise<IAvatarParts> {
  const file = await fs.readFile(process.cwd() + '/data/avatar.json', 'utf8')
  const { parts } = JSON.parse(file)
  return parts
}

export async function getAvatarColors(): Promise<IAvatarColors> {
  const file = await fs.readFile(process.cwd() + '/data/avatar.json', 'utf8')
  const { colors } = JSON.parse(file)
  return colors
}

export async function getAntagonists(): Promise<IAntagonistObject> {
  const file = await fs.readFile(
    process.cwd() + '/data/antagonists.json',
    'utf8'
  )
  return JSON.parse(file)
}
