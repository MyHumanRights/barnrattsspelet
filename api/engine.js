const MAX_PROGRESS = 100

export const ANSWER_TYPES = {
  CORRECT: 'correct',
  WRONG: 'wrong',
  WIN: 'win',
  LOSS: 'loss',
}

export const GAME_STATES = {
  INTRO: 'intro',
  GAME: 'game',
  WAITING: 'waiting',
  WIN: 'win',
  RETRY: 'retry',
}

const defaultGameState = {
  antagonist: null,
  statement: 0,
  progress: 0,
  cardHand: [],
  state: GAME_STATES.INTRO,
}

let currentGameState = {
  ...defaultGameState,
}

export function resetGameState() {
  currentGameState = {
    ...defaultGameState,
  }
}

export function setGameState(state) {
  return (currentGameState = {
    ...currentGameState,
    ...state,
  })
}

export function getGameState() {
  return currentGameState
}

function checkIfPlayerBeaten(cardHand) {
  return checkDisabledCards(cardHand)
}

function checkDisabledCards(cardHand) {
  // To check if all cards are disabled
  const enabledCards = cardHand.filter(card => card.isDisabled === false)
  if (enabledCards.length === 0) {
    return true
  }
}

function checkIfAntagonistBeaten() {
  const { antagonist, statement } = currentGameState
  return ((statement + 1) / antagonist.statements.length) * 100 >= MAX_PROGRESS
}

export function checkIfAllAntagonistsDefeated(antagonists, defeated) {
  const allDefeated = Object.values(antagonists).every(antagonist => {
    return defeated.includes(antagonist.name)
  })
  return allDefeated
}

function removeCardFromHand(card) {
  setGameState({
    cardHand: currentGameState.cardHand.filter(c => c.id !== card.id),
  })
}

function moveForward(card) {
  removeCardFromHand(card)

  const { statement, cardHand, antagonist } = currentGameState
  if (checkIfAntagonistBeaten()) {
    setGameState({
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

function loss(card) {
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

export function answer(card) {
  const { antagonist, statement } = currentGameState
  if (antagonist.statements[statement].cards.includes(card.id)) {
    return moveForward(card)
  } else {
    return loss(card)
  }
}

export function mapAntagonistsToArray(antagonists) {
  return Object.keys(antagonists).map(antagonist => antagonists[antagonist])
}

export function handMatchesStatement(hand, cards) {
  const handIds = hand.map(({ id }) => id)
  return cards.map(id => handIds.includes(id)).includes(true)
}

export function hasAllRequiredCards(hand, antagonist) {
  const matchingStatements = antagonist.statements.filter(({ cards }) =>
    handMatchesStatement(hand, cards),
  )
  return matchingStatements.length === antagonist.statements.length
}

export function getAntagonistsByHand(hand, antagonists) {
  return mapAntagonistsToArray(antagonists).filter(antagonist =>
    hasAllRequiredCards(hand, antagonist),
  )
}

export function getStartingCards(antagonists, cards) {
  const antagonistCards = getAntagonistCards(antagonists, cards, 'mum', 'dad')
  const randomCardsAmount = 10 - antagonistCards.length
  const randomCards = getCardsToLootBox(antagonistCards, cards, randomCardsAmount)

  const startingCards = [...randomCards, ...antagonistCards]
  startingCards.sort(() => 0.5 - Math.random())

  return startingCards
}

function getRandomAntagonistHand(antagonists, cards) {
  const randomIndex = Math.floor(Math.random() * antagonists.length)
  const randomAntagonist = antagonists[randomIndex]
  const playableHand = getScenarioCards(randomAntagonist, cards)
  return playableHand
}

export function getHandSuggestion(cards, antagonists, defeated) {
  const antagonistsArr = mapAntagonistsToArray(antagonists)
  let error
  const undefeated = antagonistsArr.filter(antagonist => {
    return !defeated.includes(antagonist.name)
  })
  if (undefeated.length > 0) {
    const playableAntagonists = getAntagonistsByHand(cards, undefeated)
    if (playableAntagonists.length > 0) {
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
  const playableHand = getRandomAntagonistHand(antagonistsArr, cards)
  return { playableHand, error }
}

export function getScenarioCards(antagonist, cards) {
  const cardIds = []
  antagonist.statements.forEach(statement => {
    // Push one playable card
    const correctCards = statement.cards
    const randomCardIndex = Math.floor(Math.random() * correctCards.length)
    cardIds.push(correctCards[randomCardIndex])
  })

  const antagonistCards = cards.filter(card => cardIds.some(id => id === card.id))
  const randomCardsAmount = 7 - antagonistCards.length
  const randomCards = getCardsToLootBox(antagonistCards, cards, randomCardsAmount)
  const cardHand = [...randomCards, ...antagonistCards]
  cardHand.sort(() => 0.5 - Math.random())

  return cardHand
}

export function getAntagonistCards(antagonists, cards, ...names) {
  // make array of chosen antagonists by names
  const chosenAntagonists = names.map(name => antagonists[name])

  // save all antagonists' statement card ids
  const cardIds = []
  chosenAntagonists.forEach(a => {
    if (!a) return
    a.statements.forEach(s => {
      const correctCards = s.cards
      const randomCardIndex = Math.floor(Math.random() * correctCards.length)
      cardIds.push(correctCards[randomCardIndex])
    })
  })

  // find all cards in cardId array
  return cards.filter(card => cardIds.some(id => id === card.id))
}

export function getAntagonistFromCard(antagonists, card) {
  const antagonistArr = mapAntagonistsToArray(antagonists)
  const filtered = antagonistArr.filter((antagonist) => {
    return antagonist.statements.some(statement => statement.cards.includes(card.id))
  })
  const antagonist = filtered[Math.floor(Math.random() * filtered.length)]
  
  return antagonist
}

export function getCardsToLootBox(collection, cards, number) {
  // Get random cards that are not in the collection
  const diffArray = cards.filter(x => !collection.some(y => y.id === x.id))
  if (diffArray.length <= number) {
    return diffArray
  }

  return diffArray.sort(() => 0.5 - Math.random()).slice(0, number)
}

export function getCardById(id, cards) {
  return cards.filter(card => card.id === id)
}

export function getNumberOfNewCards(collection) {
  return collection.filter(c => c.isNewCard === true).length
}

export function resetNewCards(collection) {
  const updatedCollection = collection.map(c => {
    c.isNewCard = false
    return c
  })

  return updatedCollection
}

export function getAllPlaces(antagonists) {
  const tempObject = Object.keys(antagonists).map(antagonist => antagonists[antagonist])
  const places = [...new Set(tempObject.map(obj => obj.environment))]

  return places
}

export function getAntagonistsByPlace(place, antagonists) {
  return mapAntagonistsToArray(antagonists).filter(antagonist => {
    return antagonist.environment === place
  })
}

export function getDefaultAvatorParts(parts) {
  const defaultParts = { ...parts }
  Object.entries(defaultParts).forEach(category => {
    const filtered = category[1].filter(svg => svg.isDefault)
    defaultParts[category[0]] = filtered
  })
  return defaultParts
}

export function getRandomAvatar(parts, colors) {
  const avatar = {}
  Object.entries(parts).forEach(category => {
    const randomPartIndex = Math.floor(Math.random() * category[1].length)
    avatar[category[0]] = {
      id: category[1][randomPartIndex].id,
    }
    if (colors[category[0]]) {
      const randomColorIndex = Math.floor(Math.random() * colors[category[0]].length)
      avatar[category[0]].color = colors[category[0]][randomColorIndex]
    }
  })
  return avatar
}

export function getItemToLootBox(collectedParts, parts, storedAvatar) {
  // collect all non-collected items in array as { category: 'face', id: 'avatar-face01' }
  let nonCollectedItems = []
  Object.entries(parts).forEach(category => {
    category[1].forEach(item => {
      const isCollected = collectedParts[category[0]].some(
        collectedItem => collectedItem.id === item.id,
      ) 
      const isSuperHero = item.isSuperHero === true
      
      if (!isCollected && !isSuperHero) {
        nonCollectedItems.push({
          category: category[0],
          id: item.id,
          color: storedAvatar[category[0]].color,
        })
      }
    })
  })
  // select random item from array
  const randomItemIndex = Math.floor(Math.random() * nonCollectedItems.length)

  if (!nonCollectedItems.length) {
    // Return empty array if we have no non collected items
    return nonCollectedItems
  } else {
    return [nonCollectedItems[randomItemIndex]]
  }
  
}

export function getSuperHeroToLootBox(collectedParts, parts, storedAvatar){
  let superHero = []
  
  Object.entries(collectedParts).forEach(category => {
    const hasSuperheroParts = category[1].some(
      cat => cat.isSuperHero === true
    )

    // Return empty array if we already have the superhero parts
    if (hasSuperheroParts) return superHero
  })
  
  Object.entries(parts).forEach(category => {

    category[1].forEach(item => {
      const isSuperHero = item.isSuperHero === true

      
      if (isSuperHero) {
        superHero.push({
          category: category[0],
          id: item.id,
          color: storedAvatar[category[0]].color,
        })
      }
    })

  })

  return superHero
}

export function getNewAvatarParts(collectedParts) {
  // Get all new parts from our already collected avatar parts
  let newParts = []
  Object.entries(collectedParts).forEach(category => {
    category[1].forEach(item => {

      if (item.isNewPart === true) {
        newParts.push({
          category: category[0],
          id: item.id,
        })
      }
    })
  })
  return newParts
}

export function resetNewAvatarParts(collectedParts) {
  let avatarPartsObject = {}
  
  Object.entries(collectedParts).forEach(category => {
    const partsArray = category[1].map(c => {
      return {
        ...c,
        isNewPart: false
      }
    })

    avatarPartsObject = {
      ...avatarPartsObject,
      [category[0]]: partsArray
    }

  })

  return avatarPartsObject
}
