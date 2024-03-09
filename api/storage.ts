import { IAvatar, IAvatarParts, ICard, IGameStateObject } from '@/utils/types'

let activeUser: null | { name: string } = null

async function save(collection: string, value: any) {
  if (!activeUser) return new Error('No User Set')

  return window.localStorage.setItem(
    `${activeUser.name}:${collection}`,
    JSON.stringify(value)
  )
}

async function read(collection: string): Promise<any> {
  if (!activeUser) throw new Error('No User Set')

  const item = window.localStorage.getItem(`${activeUser.name}:${collection}`)
  return item ? JSON.parse(item) : null
}

export async function setFirstTimePlaying(
  boolean: boolean
): Promise<void | Error> {
  return save('firstTimePlaying', boolean)
}

export async function getFirstTimePlaying(): Promise<boolean> {
  return read('firstTimePlaying')
}

export async function setFirstTimeLootBox(
  boolean: boolean
): Promise<void | Error> {
  return save('firstTimeLootBox', boolean)
}

export async function getFirstTimeLootBox(): Promise<boolean> {
  return read('firstTimeLootBox')
}

export async function setCardCollection(cards: ICard[]): Promise<void | Error> {
  return save('cardCollection', cards)
}

export async function getCardCollection(): Promise<ICard[]> {
  return read('cardCollection')
}

export async function setCardHand(cards: ICard[]): Promise<void | Error> {
  return save('cards', cards)
}

export async function setDefeatedAntagonists(
  antagonists: string[]
): Promise<void | Error> {
  return save('defeatedAntagonists', antagonists)
}

export async function readDefeatedAntagonists(): Promise<string[]> {
  return read('defeatedAntagonists')
}

export async function readTokens(): Promise<number> {
  return read('tokens')
}

export const setTokens = async (tokens: number): Promise<void | Error> => {
  const savedTokens = await readTokens()
  return save('tokens', savedTokens + tokens)
}

export async function readWrongAnswers(): Promise<number> {
  return read('wrongAnswers')
}

export async function setWrongAnswers(): Promise<void | Error> {
  let wrongAnswers = await readWrongAnswers()
  wrongAnswers = wrongAnswers + 1
  return save('wrongAnswers', wrongAnswers)
}

export async function resetWrongAnswers(): Promise<void | Error> {
  return save('wrongAnswers', 0)
}

export async function resetTokens(): Promise<void | Error> {
  return save('tokens', 0)
}

export async function getCardHand(): Promise<ICard[]> {
  return read('cards')
}

export async function removeCardFromHand(card: ICard): Promise<void | Error> {
  const cards: ICard[] = await read('cards')
  return save(
    'cards',
    cards.filter((c) => c.id !== card.id)
  )
}

export function setActiveUser(user: { name: string }): void {
  activeUser = user
}

export async function setPlayFromScenario(boolean: boolean) {
  return save('playFromScenario', boolean)
}

export async function getPlayFromScenario(): Promise<boolean> {
  return read('playFromScenario')
}

export async function setAvatar(avatar: IAvatar): Promise<void | Error> {
  return save('avatar', avatar)
}

export async function getAvatar(): Promise<IAvatar> {
  return read('avatar')
}

export async function setAvatarPartCollection(
  collection: IAvatarParts
): Promise<void | Error> {
  return save('avatarPartCollection', collection)
}

export async function getAvatarPartCollection(): Promise<IAvatarParts> {
  return read('avatarPartCollection')
}

export async function getShownChangeHandTip(): Promise<number> {
  return read('shownChangeHandTip')
}

export async function setShownChangeHandTip(
  number: number
): Promise<void | Error> {
  const stored = await getShownChangeHandTip()
  const newNumber = number > 0 ? stored + number : 0
  return save('shownChangeHandTip', newNumber)
}

export async function setShownNoUndefeatedTip(
  boolean: boolean
): Promise<void | Error> {
  return save('shownNoUndefeatedTip', boolean)
}

export async function getShownNoUndefeatedTip(): Promise<boolean> {
  return read('shownNoUndefeatedTip')
}

export async function setShownWelcomeTip(
  boolean: boolean
): Promise<void | Error> {
  return save('shownWelcomeTip', boolean)
}

export async function getShownWelcomeTip(): Promise<boolean> {
  return read('shownWelcomeTip')
}

export async function setShownPlayTip(boolean: boolean): Promise<void | Error> {
  return save('shownPlayTip', boolean)
}

export async function getShownPlayTip(): Promise<boolean> {
  return read('shownPlayTip')
}

export async function setShownEnableCardTip(
  boolean: boolean
): Promise<void | Error> {
  return save('shownEnableCardTip', boolean)
}

export async function getShownEnableCardTip(): Promise<boolean> {
  return read('shownEnableCardTip')
}

export async function setShownTokenTip(
  boolean: boolean
): Promise<void | Error> {
  return save('shownTokenTip', boolean)
}

export async function getShownTokenTip(): Promise<boolean> {
  return read('shownTokenTip')
}

export async function setShownFlipCardTip(
  boolean: boolean
): Promise<void | Error> {
  return save('shownFlipCardTip', boolean)
}

export async function getShownFlipCardTip(): Promise<boolean> {
  return read('shownFlipCardTip')
}

export async function resetShownTips(): Promise<void | Error> {
  save('shownChangeHandTip', 0)
  save('shownWelcomeTip', false)
  save('shownPlayTip', false)
  save('shownEnableCardTip', false)
  save('shownTokenTip', false)
  save('shownFlipCardTip', false)
  return save('shownNoUndefeatedTip', false)
}

export async function setReducedMotion(
  boolean: boolean
): Promise<void | Error> {
  return save('animationOff', boolean)
}

export async function readReducedMotion(): Promise<boolean> {
  return read('animationOff')
}

export async function setHighContrast(boolean: boolean): Promise<void | Error> {
  return save('highContrast', boolean)
}

export async function readHighContrast(): Promise<boolean> {
  return read('highContrast')
}

export async function setThemeMusicOn(boolean: boolean): Promise<void | Error> {
  return save('themeMusicOn', boolean)
}

export async function readThemeMusicOn(): Promise<boolean> {
  return read('themeMusicOn')
}

export async function setSoundEffectsOn(
  boolean: boolean
): Promise<void | Error> {
  return save('soundEffectsOn', boolean)
}

export async function readSoundEffectsOn(): Promise<boolean> {
  return read('soundEffectsOn')
}

export async function setThemeVolume(number: number): Promise<void | Error> {
  return save('themeVolume', number)
}

export async function readThemeVolume(): Promise<number> {
  return read('themeVolume')
}

export async function setVoiceover(boolean: boolean): Promise<void | Error> {
  return save('voiceover', boolean)
}

export async function readVoiceover(): Promise<boolean> {
  return read('voiceover')
}

export async function seteffectsVolume(number: number): Promise<void | Error> {
  return save('effectsVolume', number)
}

export async function readeffectsVolume(): Promise<number> {
  return read('effectsVolume')
}

export async function setLanguage(language: string): Promise<void | Error> {
  return save('language', language)
}

export async function readLanguage(): Promise<string> {
  return read('language')
}

interface ISettings {
  shouldReduceMotion: boolean
  highContrast: boolean
  themeMusicOn: boolean
  soundEffectsOn: boolean
  themeVolume: number
  effectsVolume: number
  voiceover: boolean
  language: string
}

export async function readSettings(reducedMotion: boolean): Promise<ISettings> {
  const shouldReduceMotion = await readReducedMotion()
  const highContrast = (await readHighContrast()) || false
  const themeMusicOn = await readThemeMusicOn()
  const soundEffectsOn = await readSoundEffectsOn()
  const themeVolume = (await readThemeVolume()) || 0.3
  const effectsVolume = (await readeffectsVolume()) || 0.3
  const voiceover = (await readVoiceover()) || true
  const language = (await readLanguage()) || 'sv'

  return {
    // if there is a true / false setting - keep it, otherwise use built in setting
    shouldReduceMotion:
      shouldReduceMotion === false || shouldReduceMotion
        ? shouldReduceMotion
        : reducedMotion,
    highContrast,
    themeMusicOn,
    soundEffectsOn,
    themeVolume,
    effectsVolume,
    voiceover,
    language,
  }
}

async function readGameState(): Promise<IGameStateObject> {
  // @ts-ignore
  return read('gameState')
}

export async function setGameStateValue(
  updatedValues: Partial<IGameStateObject>
): Promise<void | Error> {
  const currentGameState = await readGameState()

  // Merge the updated values with the current state
  const newGameState = { ...currentGameState, ...updatedValues }

  return save('gameState', newGameState)
}

export async function readGameStateValue<T extends keyof IGameStateObject>(
  key: T
): Promise<IGameStateObject[T] | null> {
  const currentGameState = await readGameState()

  // Check if the key exists in the game state
  if (currentGameState && key in currentGameState) {
    return currentGameState[key]
  }

  // Return a default value or handle the case when the key is not found
  return null
}

export async function resetGameState(): Promise<void | Error> {
  return await save('gameState', null)
}
