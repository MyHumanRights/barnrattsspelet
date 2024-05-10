import { antagonists } from '@/app/[locale]/components/Antagonist'
import { environments } from '@/app/[locale]/components/Environment'
import { AppPathnames } from '@/config'

import {
  AvatarPart,
  AvatarPartKeys,
} from '../app/[locale]/components/AvatarPart'
import { Antagonist } from './antagonistType'
import { CATEGORIES } from './constants'

export type AvatarId = keyof typeof AvatarPart

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
  theme: string[]
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
  category: string
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
  gameEnvironment: null | Environments
  isSlimPlay: boolean
  progress: Progress
}

export type Environments = keyof typeof environments
export type AntagonistComps = keyof typeof antagonists

export type Progress = {
  level: number
  part: number
}

export type Level = {
  levelNumber: number
  parts: AvatarPartKeys[]
}

export const superHeroIds = ['Accessory19', 'Body19', 'Hair19']

export const levels: Level[] = [
  {
    levelNumber: 1,
    parts: ['Accessory17', 'Hair09', 'Body15', 'Body12', 'Accessory10'],
  },
  {
    levelNumber: 2,
    parts: [
      'Hair11',
      'Accessory13',
      'Accessory15',
      'Accessory08',
      'Accessory12',
    ],
  },
  {
    levelNumber: 3,
    parts: ['Body09', 'Accessory11', 'Body08', 'Hair18', 'Hair19'],
  },
  {
    levelNumber: 4,
    parts: ['Body07', 'Hair16', 'Body16', 'Accessory16', 'Hair13'],
  },
  {
    levelNumber: 5,
    parts: ['Hair10', 'Accessory18', 'Hair12', 'Accessory07', 'Body13'],
  },
  {
    levelNumber: 6,
    parts: ['Accessory09', 'Accessory14', 'Body14', 'Body10', 'Accessory19'],
  },
  {
    levelNumber: 7,
    parts: ['Hair07', 'Body17', 'Hair14', 'Hair15', 'Body18'],
  },
  {
    levelNumber: 8,
    parts: ['Hair08', 'Hair17', 'Body11', 'Body19'],
  },
]
