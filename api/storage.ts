import { IAvatar, IAvatarParts, ICard } from '@/utils/types'

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

export async function setFirstTimePlaying(boolean: boolean) {
  return save('firstTimePlaying', boolean)
}

export async function getFirstTimePlaying() {
  return read('firstTimePlaying')
}

export async function setFirstTimeLootBox(boolean: boolean) {
  return save('firstTimeLootBox', boolean)
}

export async function getFirstTimeLootBox() {
  return read('firstTimeLootBox')
}

export async function setCardCollection(cards: ICard[]) {
  return save('cardCollection', cards)
}

export async function getCardCollection(): Promise<ICard[]> {
  return read('cardCollection')
}

export async function setCardHand(cards: ICard[]) {
  return save('cards', cards)
}

export async function setDefeatedAntagonists(antagonists: string[]) {
  return save('defeatedAntagonists', antagonists)
}

export async function readDefeatedAntagonists(): Promise<string[]> {
  return read('defeatedAntagonists')
}

export async function readTokens(): Promise<number> {
  return read('tokens')
}

export async function setTokens(tokens: number) {
  let savedTokens = await readTokens()
  savedTokens = savedTokens + tokens
  return save('tokens', savedTokens)
}

export async function readWrongAnswers(): Promise<number> {
  return read('wrongAnswers')
}

export async function setWrongAnswers() {
  let wrongAnswers = await readWrongAnswers()
  wrongAnswers = wrongAnswers + 1
  return save('wrongAnswers', wrongAnswers)
}

export async function resetWrongAnswers() {
  return save('wrongAnswers', 0)
}

export async function resetTokens() {
  return save('tokens', 0)
}

export async function getCardHand() {
  return read('cards')
}

export async function removeCardFromHand(card: ICard) {
  const cards: ICard[] = await read('cards')
  return save(
    'cards',
    cards.filter((c) => c.id !== card.id)
  )
}

export function setActiveUser(user: { name: string }) {
  activeUser = user
}

export async function setPlayFromScenario(boolean: boolean) {
  return save('playFromScenario', boolean)
}

export async function getPlayFromScenario(): Promise<boolean> {
  return read('playFromScenario')
}

export async function setAvatar(avatar: IAvatar) {
  return save('avatar', avatar)
}

export async function getAvatar(): Promise<IAvatar> {
  return read('avatar')
}

export async function setAvatarPartCollection(collection: IAvatarParts) {
  return save('avatarPartCollection', collection)
}

export async function getAvatarPartCollection(): Promise<IAvatarParts> {
  return read('avatarPartCollection')
}

export async function getShownChangeHandTip(): Promise<number> {
  return read('shownChangeHandTip')
}

export async function setShownChangeHandTip(number: number) {
  const stored = await getShownChangeHandTip()
  const newNumber = number > 0 ? stored + number : 0
  return save('shownChangeHandTip', newNumber)
}

export async function setShownNoUndefeatedTip(boolean: boolean) {
  return save('shownNoUndefeatedTip', boolean)
}

export async function getShownNoUndefeatedTip(): Promise<boolean> {
  return read('shownNoUndefeatedTip')
}

export async function setShownWelcomeTip(boolean: boolean) {
  return save('shownWelcomeTip', boolean)
}

export async function getShownWelcomeTip() {
  return read('shownWelcomeTip')
}

export async function setShownPlayTip(boolean: boolean) {
  return save('shownPlayTip', boolean)
}

export async function getShownPlayTip(): Promise<boolean> {
  return read('shownPlayTip')
}

export async function setShownSecondChallengeTip(boolean: boolean) {
  return save('shownSecondChallengeTip', boolean)
}

export async function getShownSecondChallengeTip(): Promise<boolean> {
  return read('shownSecondChallengeTip')
}

export async function setShownEnableCardTip(boolean: boolean) {
  return save('shownEnableCardTip', boolean)
}

export async function getShownEnableCardTip() {
  return read('shownEnableCardTip')
}

export async function setShownTokenTip(boolean: boolean) {
  return save('shownTokenTip', boolean)
}

export async function getShownTokenTip(): Promise<boolean> {
  return read('shownTokenTip')
}

export async function setShownFlipCardTip(boolean: boolean) {
  return save('shownFlipCardTip', boolean)
}

export async function getShownFlipCardTip(): Promise<boolean> {
  return read('shownFlipCardTip')
}

export async function resetShownTips() {
  save('shownChangeHandTip', 0)
  save('shownWelcomeTip', false)
  save('shownPlayTip', false)
  save('shownSecondChallengeTip', false)
  save('shownEnableCardTip', false)
  save('shownTokenTip', false)
  save('shownFlipCardTip', false)
  return save('shownNoUndefeatedTip', false)
}

export async function setReducedMotion(boolean: boolean) {
  return save('animationOff', boolean)
}

export async function readReducedMotion(): Promise<boolean> {
  return read('animationOff')
}

export async function setHighContrast(boolean: boolean) {
  return save('highContrast', boolean)
}

export async function readHighContrast(): Promise<boolean> {
  return read('highContrast')
}

export async function setThemeMusicOn(boolean: boolean) {
  return save('themeMusicOn', boolean)
}

export async function readThemeMusicOn(): Promise<boolean> {
  return read('themeMusicOn')
}

export async function setSoundEffectsOn(boolean: boolean) {
  return save('soundEffectsOn', boolean)
}

export async function readSoundEffectsOn(): Promise<boolean> {
  return read('soundEffectsOn')
}

export async function setThemeVolume(number: number) {
  return save('themeVolume', number)
}

export async function readThemeVolume(): Promise<number> {
  return read('themeVolume')
}

export async function setVoiceover(boolean: boolean) {
  return save('voiceover', boolean)
}

export async function readVoiceover(): Promise<boolean> {
  return read('voiceover')
}

export async function seteffectsVolume(number: number) {
  return save('effectsVolume', number)
}

export async function readeffectsVolume(): Promise<number> {
  return read('effectsVolume')
}

export async function setLanguage(language: string) {
  return save('language', language)
}

export async function readLanguage(): Promise<string> {
  return read('language')
}

export async function readSettings(reducedMotion: boolean) {
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
