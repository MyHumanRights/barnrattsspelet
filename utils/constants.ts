export const MAX_CARDS = 7

export const ANSWER_DELAY = 1500

export enum CATEGORIES {
  HAIR = 'hair',
  FACE = 'face',
  BODY = 'body',
  ACCESSORY = 'accessory',
}

export enum OWLS {
  ENABLE_CARD = 'enableCard',
  FLIP_CARD = 'flipCard',
  QUIZ = 'quiz',
  TOKEN = 'token',
}

export enum STAT_COLLECTION_NAMES {
  // what collection to write a time-stamp to (if its the first time)
  FIRST_TIME_START = 'firstTimeStart',
  FIRST_TIME_HOME = 'firstTimeHome',
  FIRST_TIME_PERSUATION = 'firstTimePersuation',
  FIRST_TIME_WIN = 'firstTimeWin',
  FIRST_TIME_WIN_THREE = 'firstTimeWinThree',
  FIRST_TIME_WIN_TEN = 'firstTimeWinTen',
  FIRST_TIME_WIN_GAME_COMPLETE = 'firstTimeGameComplete',
  FIRST_TIME_COLLECTION_VIEWER = 'firstTimeCollectionViewer',
  FIRST_TIME_COLLECTION_VIEW_APP = 'firstTimeCollectionViewerApp',
}

export enum STAT_FLAGS {
  //Used to check if we have written to the db or not
  IS_FIRST_TIME_HOME = 'isFirstTimeHome',
  IS_FIRST_TIME_START = 'isFirstTimeStart',
  IS_FIRST_TIME_PERSUATION = 'isFirstTimePersuation',
  IS_FIRST_TIME_WIN = 'isFirstTimeWin',
  IS_FIRST_TIME_WIN_THREE = 'isFirstTimeWinThree',
  IS_FIRST_TIME_WIN_TEN = 'isFirstTimeWinTen',
  IS_FIRST_TIME_WIN_GAME_COMPLETE = 'isFirstTimeGameComplete',
  IS_FIRST_TIME_COLLECTION_VIEWER = 'isFirstTimeCollectionViewer',
  IS_FIRST_TIME_COLLECTION_VIEW_APP = 'isFirstTimeCollectionViewerApp',
}

export const STAT_STORAGE_KEY = 'statsFlags-v1'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TEXT = 'text',
  SIMPLE = 'simple',
  HUGE = 'huge',
}

export enum ButtonSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  XLARGE = 'xlarge',
  XXLARGE = 'xxlarge',
}
