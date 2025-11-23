import { antagonists } from '@/app/[locale]/components/Antagonist'
import { environments } from '@/app/[locale]/components/Environment'
import { AppPathnames } from '@/i18n/routing'

import {
  AvatarPart,
  AvatarPartKeys,
} from '../app/[locale]/components/AvatarPart'
import { Antagonist } from './antagonistType'
import { CATEGORIES } from './constants'

export type LocaleParams = {
  params: Promise<{
    locale: string
  }>
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
  iconColor?: string
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

export type IAvatar = {
  face: { id: AvatarPartKeys; color: string }
  body: { id: AvatarPartKeys; color: string }
  hair: { id: AvatarPartKeys; color: string }
  accessory: { id: AvatarPartKeys; color?: string }
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
  [key: string]: IGameAntagonist
}
export type IGameState = {
  antagonist?: IGameAntagonist | null
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

export type IScenario = {
  place: string
  playable: string[]
  unbeaten: string[]
}

export type ILootItem = {
  category: string
  id: string
  color?: string
  isNewPart?: boolean
}

export type AvatarPart = {
  isNewPart?: boolean
  id: AvatarPartKeys | null
  isDefault?: boolean | undefined
  isSuperHero?: boolean | undefined
  color?: string | undefined
}

export type IGameStateObject = {
  allowedLootbox: boolean
  activeAntagonist: null | Antagonist
  gameEnvironment: null | Environments
  isSlimPlay: boolean
  progress: Progress
  hasWonAllParts: boolean
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
    parts: ['Accessory17', 'Body15', 'Hair15', 'Body12', 'Accessory10'],
  },
  {
    levelNumber: 2,
    parts: ['Hair11', 'Accessory13', 'Body10', 'Body17', 'Hair19'],
  },
  {
    levelNumber: 3,
    parts: ['Body18', 'Accessory11', 'Hair18', 'Hair16', 'Accessory18'],
  },
  {
    levelNumber: 4,
    parts: ['Body16', 'Accessory16', 'Hair13', 'Hair10', 'Accessory19'],
  },
  {
    levelNumber: 5,
    parts: ['Hair12', 'Body13', 'Accessory09', 'Accessory14', 'Hair17'],
  },
  {
    levelNumber: 6,
    parts: ['Body14', 'Accessory15', 'Hair14', 'Accessory12', 'Body19'],
  },
]

export type StatsData = {
  [key: string]: {
    totalVisits?: number
    monthlyVisits?: {
      [month: string]: number
    }
    count?: number
  }
}

export type DeviceStats = {
  mobile: number
  tablet: number
  desktop: number
}

export const cheatListAvatar: IAvatarParts = {
  face: [
    {
      id: 'Face01',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face02',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face03',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face04',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face05',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face06',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face07',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face08',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face09',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face10',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face11',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face12',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face13',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face14',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face15',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face16',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face17',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Face18',
      isDefault: true,
      isNewPart: false,
      isSuperHero: true,
    },
    {
      id: 'Face19',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
  ],
  body: [
    {
      id: 'Body01',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body02',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body03',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body04',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body05',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body06',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body07',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body08',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body09',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body10',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body11',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body12',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body13',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body14',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body15',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body16',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body17',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Body18',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
  ],
  hair: [
    {
      id: 'Hair01',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair02',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair03',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair04',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair05',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair06',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair07',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair08',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair09',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair10',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair11',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair12',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair13',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair14',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair15',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair16',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair17',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair18',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Hair19',
      isDefault: false,
      isNewPart: false,
      isSuperHero: true,
    },
  ],
  accessory: [
    {
      id: null,
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory01',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory02',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory03',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory04',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory05',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory06',
      isDefault: true,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory07',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory08',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory09',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory10',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory11',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory12',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory13',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory14',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory15',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory16',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory17',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory18',
      isDefault: false,
      isNewPart: false,
      isSuperHero: false,
    },
    {
      id: 'Accessory19',
      isDefault: false,
      isNewPart: false,
      isSuperHero: true,
    },
  ],
}
export const cheatListAntagonists: Antagonist[] = [
  'mum',
  'sibling',
  'relative',
  'drunkparent',
  'troll',
  'bigsister',
  'parentsdivorcing',
  'classmate1',
  'teacher',
  'teacherEnvironment',
  'classmate2',
  'gang',
  'adult',
  'coach',
  'gymteacher',
  'friend',
  'grownup',
  'league',
  'groomer',
  'politician',
  'cashier',
  'borderpolice',
  'mumtodisabledchild',
  'foreigndad',
  'salesPerson',
  'racistTeacher',
  'homophobicAdult',
  'adoptiveDad',
  'noOpinionsDad',
]
