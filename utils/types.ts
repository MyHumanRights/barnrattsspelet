import { CATEGORIES } from './constants'

export interface LocaleParams {
  params: {
    locale: string
  }
}

export interface IBoostAnswer {
  text: string
  id: string
  isCorrect: boolean | null
}

export interface IBoostQuiz {
  question: string
  infoCorrect: string
  infoIncorrect: string
  answers: IBoostAnswer[]
}

export interface IQuiz {
  answers: {
    id: string
    isCorrect: boolean
  }[]
}

export interface ICard {
  id: string
  isNewCard: boolean
  article: string
  isDisabled: boolean
  category: string[]
  theme: string
  color: string
  textColor: string
  linkPath: string
  image: string
  quiz: IQuiz
  iconColor: string
}

export interface IAnimation {
  initial: {
    y?: number
    x?: number
    rotateX?: number
    rotateY?: number
    translateY?: number
    transformPerspective?: number
  }
  animate: {
    y?: number
    x?: number
    rotateX?: number
    rotateY?: number
    translateY?: number
    transformPerspective?: number
    transition?: any
  }
}

export type AvatarPart = {
  isNewPart?: true
  id?: string | null | undefined
  isDefault?: boolean | undefined
  isSuperHero?: boolean | undefined
  color?: string | undefined
}

export interface IAvatarParts {
  [key: string]: AvatarPart[] | undefined
  face?: AvatarPart[] | undefined
  body?: AvatarPart[] | undefined
  hair?: AvatarPart[] | undefined
  accessory?: AvatarPart[] | undefined
}

export interface IAvatarColors {
  hair: string[]
  face: string[]
  body: string[]
}

export interface IAvatar {
  face: { id: string; color: string }
  body: { id: string; color: string }
  hair: { id: string; color: string }
  accessory: { id: string }
}

export interface IAvatarNew {
  category: CATEGORIES
  isNewPart: boolean
}

export enum ANSWER_TYPES {
  CORRECT = 'correct',
  WRONG = 'wrong',
  WIN = 'win',
  LOSS = 'loss',
}

export enum GAME_STATES {
  INTRO = 'intro',
  GAME = 'game',
  WAITING = 'waiting',
  WIN = 'win',
  RETRY = 'retry',
}

export interface IGameAntagonist {
  health: number
  name: string
  components: {
    start: string | null
    end: string | null
    background: string
  }
  scenarioImage: string
  chatBubblePosition: string
  antagonistPosition: string
  theme: string
  environment: string
  statements: {
    cards: string[]
  }[]
}

export interface IAntagonistObject {
  [key: string]: IGameAntagonist
}
export interface IGameState {
  antagonist: IGameAntagonist | null
  statement: number
  progress: number
  cardHand: ICard[]
  state: GAME_STATES.INTRO
}

export interface IOwlContent {
  heading: string | null
  body: string
}

export interface IGameProgress {
  [key: string]: {
    defeated: number
    total: number
  }
}

export interface IScenario {
  place: string
  playable: string[]
  unbeaten: string[]
}

export interface ILootItem {
  category: string
  id: string
  color: string
  isNewPart?: boolean
}
