import {
  AvatarPart,
  GAME_STATES,
  IAntagonistObject,
  IAvatar,
  IAvatarColors,
  IAvatarParts,
  ICard,
  IGameAntagonist,
  IGameState,
  Level,
  levels,
  Progress,
} from '@/utils/types'

import { AvatarPartKeys } from '../app/[locale]/components/AvatarPart'

const MAX_PROGRESS = 100

export const ANSWER_TYPES = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  WIN: 'win',
  LOSS: 'loss',
}

const defaultGameState: IGameState = {
  statement: 0,
  progress: 0,
  cardHand: [],
  state: GAME_STATES.INTRO,
  antagonist: null,
}

let currentGameState: IGameState = {
  ...defaultGameState,
}

export function resetGameState() {
  currentGameState = {
    ...defaultGameState,
  }
}

export function setGameState(state: any) {
  return (currentGameState = {
    ...currentGameState,
    ...state,
  })
}

export function getGameState() {
  return currentGameState
}

function checkIfPlayerBeaten(cardHand: ICard[]) {
  return checkDisabledCards(cardHand)
}

function checkDisabledCards(cardHand: ICard[]) {
  // To check if all cards are disabled
  const enabledCards = cardHand.filter((card) => card.isDisabled === false)
  if (enabledCards.length === 0) {
    return true
  }
}

function checkIfAntagonistBeaten(antagonist: IGameAntagonist) {
  const { statement } = currentGameState
  return ((statement + 1) / antagonist!.statements.length) * 100 >= MAX_PROGRESS
}

function removeCardFromHand(card: ICard) {
  setGameState({
    cardHand: currentGameState.cardHand.filter((c) => c.id !== card.id),
  })
}

function moveForward(card: ICard, antagonist: IGameAntagonist) {
  removeCardFromHand(card)

  const { statement, cardHand } = currentGameState
  if (checkIfAntagonistBeaten(antagonist)) {
    setGameState({
      statement: statement + 1,
      progress: ((statement + 1) / antagonist.statements.length) * 100,
      state: GAME_STATES.WIN,
    })
    return { result: ANSWER_TYPES.WIN }
  } else {
    setGameState({
      statement: statement + 1,
      progress: ((statement + 1) / antagonist.statements.length) * 100,
    })

    // Current loss condition is when all cards are disabled
    if (checkIfPlayerBeaten(cardHand)) {
      setGameState({
        state: GAME_STATES.RETRY,
      })
      return { result: ANSWER_TYPES.LOSS }
    }

    return { result: ANSWER_TYPES.CORRECT }
  }
}

function loss(card: ICard) {
  // Save to storage to prevent cheating?
  card.isDisabled = true

  const { cardHand } = currentGameState

  // Current loss condition is when all cards are disabled
  if (checkIfPlayerBeaten(cardHand)) {
    setGameState({
      state: GAME_STATES.RETRY,
    })
    return { result: ANSWER_TYPES.LOSS }
  }

  return { result: ANSWER_TYPES.WRONG }
}

export function answer(card: ICard, antagonist: IGameAntagonist) {
  const { statement } = currentGameState
  if (antagonist!.statements[statement].cards.includes(card.id)) {
    return moveForward(card, antagonist)
  } else {
    return loss(card)
  }
}

export const getAnswerLine = (antagonist: IGameAntagonist) => {
  const { statement } = currentGameState

  // need to subtract 1 because we are moving forward after the answer
  // if statement is 0, it should be zero

  const cardId =
    antagonist.statements[statement === 0 ? statement : statement - 1].cards[0]
  return `cards.${cardId}.answerline`
}

export function mapAntagonistsToArray(
  antagonists: IAntagonistObject
): IGameAntagonist[] {
  return Object.keys(antagonists).map((antagonist) => antagonists[antagonist])
}

export function handMatchesStatement(hand: ICard[], cards: string[]) {
  const handIds = hand.map(({ id }: { id: string }) => id)
  return cards.map((id) => handIds.includes(id)).includes(true)
}

export function hasAllRequiredCards(
  hand: ICard[],
  antagonist: IGameAntagonist
) {
  const matchingStatements = antagonist.statements.filter(({ cards }) =>
    handMatchesStatement(hand, cards)
  )
  return matchingStatements.length === antagonist.statements.length
}

export function getAntagonistsByHand(
  hand: ICard[],
  antagonists: { [key: string]: IGameAntagonist }
) {
  return mapAntagonistsToArray(antagonists).filter((antagonist) =>
    hasAllRequiredCards(hand, antagonist)
  )
}

export function getStartingCards(
  antagonists: IAntagonistObject,
  cards: ICard[]
) {
  const antagonistCards = getAntagonistCards(antagonists, cards, 'mum', 'dad')
  const randomCardsAmount = 10 - antagonistCards.length
  const randomCards = getCardsToLootBox(
    antagonistCards,
    cards,
    randomCardsAmount
  )

  const startingCards = [...randomCards, ...antagonistCards]
  startingCards.sort(() => 0.5 - Math.random())

  return startingCards
}

function getRandomAntagonistHand(
  antagonists: { [key: string]: IGameAntagonist },
  cards: ICard[]
) {
  //@ts-ignore
  const randomIndex = Math.floor(Math.random() * antagonists.length)
  const randomAntagonist = antagonists[randomIndex]
  const playableHand = getScenarioCards(randomAntagonist, cards)
  return playableHand
}

export function getHandSuggestion(
  cards: ICard[],
  antagonists: {
    [key: string]: IGameAntagonist
  },
  defeated: string[]
) {
  const antagonistsArr = mapAntagonistsToArray(antagonists)
  let error
  const undefeated = antagonistsArr.filter((antagonist) => {
    return !defeated.includes(antagonist.name)
  })
  if (undefeated.length > 0) {
    //@ts-ignore
    const playableAntagonists = getAntagonistsByHand(cards, undefeated)
    if (playableAntagonists.length > 0) {
      //@ts-ignore
      const playableHand = getRandomAntagonistHand(playableAntagonists, cards)
      return { playableHand }
    }
    // user has won against all playable antagonists
    error = 'alldefeatedcollection'
  } else {
    // user has won against all antagonists in the game
    error = 'alldefeatedhand'
  }

  // return any playable scenario hand if no undefeated
  //@ts-ignore
  const playableHand = getRandomAntagonistHand(antagonistsArr, cards)
  return { playableHand, error }
}

export function getScenarioCards(antagonist: IGameAntagonist, cards: ICard[]) {
  const cardIds: string[] = []
  antagonist.statements.forEach((statement) => {
    // Push one playable card
    const correctCards = statement.cards
    const randomCardIndex = Math.floor(Math.random() * correctCards.length)
    cardIds.push(correctCards[randomCardIndex])
  })

  const antagonistCards = cards.filter((card) =>
    cardIds.some((id) => id === card.id)
  )
  const randomCardsAmount = 7 - antagonistCards.length
  const randomCards = getCardsToLootBox(
    antagonistCards,
    cards,
    randomCardsAmount
  )
  const cardHand = [...randomCards, ...antagonistCards]
  cardHand.sort(() => 0.5 - Math.random())

  return cardHand
}

export function getAntagonistCards(
  antagonists: IAntagonistObject,
  cards: ICard[],
  ...names: string[]
) {
  // make array of chosen antagonists by names
  const chosenAntagonists = names.map((name) => antagonists[name])

  // save all antagonists' statement card ids
  const cardIds: string[] = []
  chosenAntagonists.forEach((a) => {
    if (!a) return
    a.statements.forEach((s) => {
      const correctCards = s.cards
      const randomCardIndex = Math.floor(Math.random() * correctCards.length)
      cardIds.push(correctCards[randomCardIndex])
    })
  })

  // find all cards in cardId array
  return cards.filter((card) => cardIds.some((id) => id === card.id))
}

export function getAntagonistFromCard(
  antagonists: {
    [key: string]: IGameAntagonist
  },
  card: ICard
) {
  const antagonistArr = mapAntagonistsToArray(antagonists)
  const filtered = antagonistArr.filter((antagonist) => {
    return antagonist.statements.some((statement) =>
      statement.cards.includes(card.id)
    )
  })
  const antagonist = filtered[Math.floor(Math.random() * filtered.length)]

  return antagonist
}

export function getCardsToLootBox(
  collection: ICard[],
  cards: ICard[],
  number: number
) {
  // Get random cards that are not in the collection
  const diffArray = cards.filter((x) => !collection.some((y) => y.id === x.id))
  if (diffArray.length <= number) {
    return diffArray
  }

  return diffArray.sort(() => 0.5 - Math.random()).slice(0, number)
}

export function getCardById(id: string, cards: ICard[]) {
  return cards.filter((card) => card.id === id)
}

export function getNumberOfNewCards(collection: ICard[]) {
  return collection.filter((c) => c.isNewCard === true).length
}

export function resetNewCards(collection: ICard[]) {
  const updatedCollection = collection.map((c) => {
    c.isNewCard = false
    return c
  })

  return updatedCollection
}

export function getAllPlaces(antagonists: { [key: string]: IGameAntagonist }) {
  const tempObject = Object.keys(antagonists).map(
    (antagonist) => antagonists[antagonist]
  )
  const places = [...new Set(tempObject.map((obj) => obj.environment))]

  return places
}

export function getAntagonistsByPlace(
  place: string,
  antagonists: {
    [key: string]: IGameAntagonist
  }
) {
  return mapAntagonistsToArray(antagonists).filter((antagonist) => {
    return antagonist.environment === place
  })
}

export const getPartId = (progress: Progress): AvatarPartKeys => {
  const level = levels.find((level) => level.levelNumber === progress.level)

  if (!level || level === undefined) {
    console.error('Level not found')
    return 'Accessory01' as AvatarPartKeys
  }

  // Adjust for zero-based index
  const partIndex = progress.part - 1
  const part = level.parts[partIndex]

  return part as AvatarPartKeys
}

export const getColorForPart = (
  id: AvatarPartKeys,
  storedAvatar: IAvatar
): string => {
  // remove digits and convert to lowercase to match the storedAvatar key
  const key = id.replace(/\d+/g, '').toLowerCase() as keyof IAvatar

  return storedAvatar[key].color || ''
}

export const getItemToLootBox = (
  collectedParts: IAvatar,
  parts: IAvatarParts,
  storedAvatar: IAvatar
) => {
  const nonCollectedItems = Object.entries(parts).reduce<AvatarPart[]>(
    (items, [key, value]) => {
      if (!value) return items
      const nonCollected = value
        .filter((item) => {
          const collected = (collectedParts as any)[key]?.some(
            (collectedItem: AvatarPart) => collectedItem.id === item.id
          )
          const isSuperHero = item.isSuperHero === true
          return !collected && !isSuperHero
        })
        .map((item) => ({
          id: item.id,
          color: (storedAvatar as any)[key]?.color,
          isNewPart: item.isNewPart,
          isDefault: item.isDefault,
          isSuperHero: item.isSuperHero,
        }))
      return [...items, ...nonCollected]
    },
    []
  )

  const randomItemIndex = Math.floor(Math.random() * nonCollectedItems.length)

  return nonCollectedItems.length ? [nonCollectedItems[randomItemIndex]] : []
}

export function getSuperHeroToLootBox(
  collectedParts: IAvatarParts,
  parts: IAvatarParts,
  storedAvatar: IAvatar
): AvatarPart[] {
  // Check if any superhero part is already collected
  for (const items of Object.values(collectedParts)) {
    if (Array.isArray(items) && items.some((cat) => cat.isSuperHero === true)) {
      return []
    }
  }

  // Collect all superhero parts from available parts
  const superHero: AvatarPart[] = []
  for (const [category, items] of Object.entries(parts)) {
    if (!Array.isArray(items)) continue
    for (const item of items) {
      if (item.isSuperHero === true) {
        superHero.push({
          id: item.id,
          color: (storedAvatar as any)[category]?.color,
          isNewPart: item.isNewPart,
          isDefault: item.isDefault,
          isSuperHero: item.isSuperHero,
        })
      }
    }
  }
  return superHero
}

export const hasWonLevel = (progress: Progress, level: Level): boolean => {
  return (
    progress.level === level.levelNumber && progress.part === level.parts.length
  )
}

export const getNextLevel = (
  currentProgress: Progress,
  levels: Level[]
): Level | null => {
  const currentLevelIndex = levels.findIndex(
    (level) => level.levelNumber === currentProgress.level
  )
  if (currentLevelIndex === -1 || currentLevelIndex === levels.length - 1) {
    return null // No next level or current level not found
  }
  return levels[currentLevelIndex + 1]
}

export const getPartsForLevel = (currentLevel: number) => {
  const levelIndex = currentLevel - 1 // Adjust for zero-based index
  return levels[levelIndex].parts
}
