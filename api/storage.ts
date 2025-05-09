import {
  IAvatar,
  IAvatarParts,
  ICard,
  IGameStateObject,
  Level,
  levels,
  Progress,
} from '@/utils/types'

import { getNextLevel, hasWonLevel } from './engine'

let activeUser: null | { name: string } = null

const save = <T>(key: string, value: T) => {
  if (typeof window === 'undefined') return // Avoid running on the server

  if (!activeUser) {
    console.error('No User Set')
    return
  }

  try {
    localStorage.setItem(`${activeUser.name}:${key}`, JSON.stringify(value))
  } catch (error) {
    console.error(`Error saving ${key} to localStorage`, error)
  }
}

// const save = async (collection: string, value: any) =>  => {
//   if (!activeUser) return new Error('No User Set')

//   try {
//     window.localStorage.setItem(
//       `${activeUser.name}:${collection}`,
//       JSON.stringify(value)
//     )
//   } catch (error) {
//     throw new Error(`Failed to save ${collection}: ${error}`)
//   }
// }

const read = <T>(key: string): T | null => {
  if (typeof window === 'undefined') return null // Avoid running on the server
  if (!activeUser) {
    console.error('No User Set')
    return null
  }

  try {
    const item = localStorage.getItem(`${activeUser.name}:${key}`)
    return item ? (JSON.parse(item) as T) : null
  } catch (error) {
    console.error(`Error getting ${key} from localStorage`, error)
    return null
  }
}

export const setFirstTimePlaying = (boolean: boolean) => {
  return save('firstTimePlaying', boolean)
}

export const getFirstTimePlaying = (): boolean | null => {
  return read('firstTimePlaying')
}

export const setFirstTimeLootBox = (boolean: boolean) => {
  return save('firstTimeLootBox', boolean)
}

export const getFirstTimeLootBox = (): boolean | null => {
  return read('firstTimeLootBox')
}

export const setCardCollection = (cards: ICard[]) => {
  return save('cardCollection', cards)
}

export const getCardCollection = (): ICard[] => {
  return read('cardCollection') || []
}

export const setCardHand = (cards: ICard[]) => {
  return save('cards', cards)
}

export const setDefeatedAntagonists = (antagonists: string[]) => {
  return save('defeatedAntagonists', antagonists)
}

export const readDefeatedAntagonists = (): string[] => {
  return read('defeatedAntagonists') || []
}

export const readTokens = (): number => {
  return read('tokens') ?? 0
}

export const setTokens = (tokens: number) => {
  const savedTokens = readTokens() ?? 0
  return save('tokens', savedTokens + tokens)
}

export const readWrongAnswers = (): number => {
  return read('wrongAnswers') || 0
}

export const setWrongAnswers = () => {
  let wrongAnswers = readWrongAnswers() ?? 0
  wrongAnswers = wrongAnswers + 1
  return save('wrongAnswers', wrongAnswers)
}

export const resetWrongAnswers = () => {
  return save('wrongAnswers', 0)
}

export const resetTokens = () => {
  return save('tokens', 0)
}

export const getCardHand = (): ICard[] | null => {
  return read('cards')
}

export const removeCardFromHand = (card: ICard) => {
  const cards = getCardHand() ?? []
  return save(
    'cards',
    cards.filter((c) => c.id !== card.id)
  )
}

export const setActiveUser = (user: { name: string }) => {
  activeUser = user
}

export const setPlayFromScenario = (boolean: boolean) => {
  return save('playFromScenario', boolean)
}

export const getPlayFromScenario = (): boolean => {
  return read('playFromScenario') || false
}

export const setAvatar = (avatar: IAvatar) => {
  return save('avatar', avatar)
}

export const getAvatar = (): IAvatar | null => {
  return read('avatar')
}

export const setAvatarPartCollection = (collection: IAvatarParts) => {
  return save('avatarPartCollection', collection)
}

export const getAvatarPartCollection = (): IAvatarParts | null => {
  return read('avatarPartCollection')
}

export const setShownWelcomeTip = (boolean: boolean) => {
  return save('shownWelcomeTip', boolean)
}

export const getShownWelcomeTip = (): boolean | null => {
  return read('shownWelcomeTip')
}

export const setShownPlayTip = (boolean: boolean) => {
  return save('shownPlayTip', boolean)
}

export const getShownPlayTip = (): boolean | null => {
  return read('shownPlayTip')
}

export const setShownEnableCardTip = (boolean: boolean) => {
  return save('shownEnableCardTip', boolean)
}

export const getShownEnableCardTip = (): boolean | null => {
  return read('shownEnableCardTip')
}

export const setShownTokenTip = (boolean: boolean) => {
  return save('shownTokenTip', boolean)
}

export const getShownTokenTip = (): boolean => {
  return read('shownTokenTip') || false
}

export const setShownFlipCardTip = (boolean: boolean) => {
  return save('shownFlipCardTip', boolean)
}

export const getShownFlipCardTip = (): boolean => {
  return read('shownFlipCardTip') || false
}

export const resetShownTips = () => {
  try {
    save('shownWelcomeTip', false)
    save('shownPlayTip', false)
    save('shownEnableCardTip', false)
    save('shownTokenTip', false)
    save('shownFlipCardTip', false)
  } catch (error) {
    console.error('Failed to reset shown tips', error)
  }
}

export const setReducedMotion = (boolean: boolean) => {
  return save('animationOff', boolean)
}

export const readReducedMotion = (): boolean | null => {
  return read('animationOff')
}

export const setHighContrast = (boolean: boolean) => {
  return save('highContrast', boolean)
}

export const readHighContrast = (): boolean | null => {
  return read('highContrast')
}

export const setThemeMusicOn = (boolean: boolean) => {
  return save('themeMusicOn', boolean)
}

export const readThemeMusicOn = (): boolean | null => {
  return read('themeMusicOn')
}

export const setSoundEffectsOn = (boolean: boolean) => {
  return save('soundEffectsOn', boolean)
}

export const readSoundEffectsOn = (): boolean | null => {
  return read('soundEffectsOn')
}

export const setThemeVolume = (number: number) => {
  return save('themeVolume', number)
}

export const readThemeVolume = (): number | null => {
  return read('themeVolume')
}

export const setVoiceover = (boolean: boolean) => {
  return save('voiceover', boolean)
}

export const readVoiceover = (): boolean | null => {
  return read('voiceover')
}

export const seteffectsVolume = (number: number) => {
  return save('effectsVolume', number)
}

export const readeffectsVolume = (): number | null => {
  return read('effectsVolume')
}

export const setLanguage = (language: string) => {
  return save('language', language)
}

export const readLanguage = (): string | null => {
  return read('language')
}

type ISettings = {
  shouldReduceMotion: boolean
  highContrast: boolean
  themeMusicOn: boolean
  soundEffectsOn: boolean
  themeVolume: number
  effectsVolume: number
  voiceover: boolean
  language: string
}

export const readSettings = (reducedMotion: boolean): ISettings => {
  const shouldReduceMotion = readReducedMotion()
  const highContrast = readHighContrast() || false
  const themeMusicOn = readThemeMusicOn() || false
  const soundEffectsOn = readSoundEffectsOn() || false
  const themeVolume = readThemeVolume() || 0.3
  const effectsVolume = readeffectsVolume() || 0.3
  const voiceover = readVoiceover() || true
  const language = readLanguage() || 'sv'

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

const readGameState = (): IGameStateObject | null => {
  return read('gameState')
}

export const setGameStateValue = (updatedValues: Partial<IGameStateObject>) => {
  const currentGameState = readGameState()

  // Merge the updated values with the current state
  const newGameState = { ...currentGameState, ...updatedValues }

  return save('gameState', newGameState)
}

export const readGameStateValue = <T extends keyof IGameStateObject>(
  key: T
): IGameStateObject[T] | null => {
  const currentGameState = readGameState()

  // Check if the key exists in the game state
  if (currentGameState && key in currentGameState) {
    return currentGameState[key]
  }

  // Return a default value or handle the case when the key is not found
  return null
}

export const resetGameState = () => {
  return save('gameState', null)
}

export const getProgress = (): Progress | null => {
  return readGameStateValue('progress')
}

export const getCurrentLevel = (progress: Progress): Level | undefined => {
  return levels.find((level) => level.levelNumber === progress.level)
}

export const saveProgress = () => {
  const progress = getProgress() || { level: 1, part: 0 }

  const currentLevel = getCurrentLevel(progress)

  if (!currentLevel) {
    console.error('Invalid progress: Level not found.')
    return
  }

  if (hasWonLevel(progress, currentLevel)) {
    const nextLevel = getNextLevel(progress, levels)
    if (nextLevel) {
      progress.level = nextLevel.levelNumber
      progress.part = 0
    } else {
      console.log('Congratulations! You have completed all levels!')
      // setGameStateValue({ hasWonAllParts: true })
      return
    }
  } else {
    progress.part++
  }

  process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
    console.log('Saving progress:', progress)

  setGameStateValue({ progress })
}

export const setProgress = (level: number, part: number) => {
  setGameStateValue({ progress: { level, part } })
}
