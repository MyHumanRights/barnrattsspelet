import { promises as fs } from 'fs'

export async function getCards() {
  const file = await fs.readFile(process.cwd() + '/data/cards.json', 'utf8')
  return JSON.parse(file)
}

export async function getNonPlayableCards() {
  const file = await fs.readFile(
    process.cwd() + '/data/nonPlayableCards.json',
    'utf8'
  )
  return JSON.parse(file)
}

export async function getAvatarParts() {
  const file = await fs.readFile(process.cwd() + '/data/avatar.json', 'utf8')
  const { parts } = JSON.parse(file)
  return parts
}

export async function getAvatarColors() {
  const file = await fs.readFile(process.cwd() + '/data/avatar.json', 'utf8')
  const { colors } = JSON.parse(file)
  return colors
}

export async function getAntagonists() {
  const file = await fs.readFile(
    process.cwd() + '/data/antagonists.json',
    'utf8'
  )
  return JSON.parse(file)
}
