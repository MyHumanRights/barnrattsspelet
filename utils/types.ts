import { antagonists } from '@/app/[locale]/components/Antagonist'
import { environments } from '@/app/[locale]/components/Environment'
import { AppPathnames } from '@/config'

import { AvatarPart } from '../app/[locale]/components/AvatarPart'
import { Antagonist } from './antagonistType'
import { CATEGORIES } from './constants'

type AvatarId = keyof typeof AvatarPart

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
  isNewCard?: boolean
  article: string
  isDisabled: boolean
  category: string[]
  theme: string
  color: string
  textColor: string
  linkPath: AppPathnames
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
  face: { id: AvatarId; color: string }
  body: { id: AvatarId; color: string }
  hair: { id: AvatarId; color: string }
  accessory: { id: AvatarId; color?: string }
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

type Component = {
  start: AntagonistComps | null
  end: AntagonistComps | null
  background: Environments
}

type Statement = {
  cards: string[]
}

export type IGameAntagonist = {
  health: number
  name: string
  components: Component
  scenarioImage: string
  chatBubblePosition: string
  antagonistPosition: string
  theme: string
  environment: string
  statements: Statement[]
}

export type IAntagonistObject = {
  [key in Antagonist]: IGameAntagonist
}
export interface IGameState {
  antagonist: IGameAntagonist | null
  statement: number
  progress: number
  cardHand: ICard[]
  state: GAME_STATES
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
  id: AvatarId
  color: string
  isNewPart?: boolean
}

export type AvatarPart = {
  isNewPart?: true
  id: AvatarId
  isDefault?: boolean | undefined
  isSuperHero?: boolean | undefined
  color?: string | undefined
}

export interface IGameStateObject {
  isBuyingLootbox: boolean
  allowedLootbox: boolean
  activeAntagonist: null | string
  gameEnvironment: null | string
  isSlimPlay: boolean
}

export type Environments = keyof typeof environments
export type AntagonistComps = keyof typeof antagonists
