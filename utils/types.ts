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
    rotateX?: number
    rotateY?: number
    translateY?: number
    transformPerspective?: number
  }
  animate: {
    rotateX?: number
    rotateY?: number
    translateY?: number
    transformPerspective?: number
    transition?: any
  }
}
