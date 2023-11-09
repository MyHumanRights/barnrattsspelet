let activeUser = null

async function save(collection, value) {
  if (!activeUser) return new Error('No User Set')

  return window.localStorage.setItem(
    `${activeUser.name}:${collection}`,
    JSON.stringify(value)
  )
}

async function read(collection) {
  if (!activeUser) return new Error('No User Set')

  return JSON.parse(
    window.localStorage.getItem(`${activeUser.name}:${collection}`)
  )
}

export async function setFirstTimePlaying(boolean) {
  return save('firstTimePlaying', boolean)
}

export async function getFirstTimePlaying() {
  return read('firstTimePlaying')
}

export async function setFirstTimeLootBox(boolean) {
  return save('firstTimeLootBox', boolean)
}

export async function getFirstTimeLootBox() {
  return read('firstTimeLootBox')
}

export async function setCardCollection(cards) {
  return save('cardCollection', cards)
}

export async function getCardCollection() {
  return read('cardCollection')
}

export async function setCardHand(cards) {
  return save('cards', cards)
}

export async function setDefeatedAntagonists(antagonists) {
  return save('defeatedAntagonists', antagonists)
}

export async function readDefeatedAntagonists() {
  return read('defeatedAntagonists')
}

export async function readTokens() {
  return read('tokens')
}

export async function setTokens(tokens) {
  let savedTokens = await readTokens()
  savedTokens = savedTokens + tokens
  return save('tokens', savedTokens)
}

export async function readWrongAnswers() {
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

export async function removeCardFromHand(card) {
  const cards = await read('cards')
  return save(
    'cards',
    cards.filter((c) => c.id !== card.id)
  )
}

export function setActiveUser(user) {
  activeUser = user
}

export async function setPlayFromScenario(boolean) {
  return save('playFromScenario', boolean)
}

export async function getPlayFromScenario() {
  return read('playFromScenario')
}

export async function setAvatar(avatar) {
  return save('avatar', avatar)
}

export async function getAvatar() {
  return read('avatar')
}

export async function setAvatarPartCollection(collection) {
  return save('avatarPartCollection', collection)
}

export async function getAvatarPartCollection() {
  return read('avatarPartCollection')
}

export async function getShownChangeHandTip() {
  return read('shownChangeHandTip')
}

export async function setShownChangeHandTip(number) {
  const stored = await getShownChangeHandTip()
  const newNumber = number > 0 ? stored + number : 0
  return save('shownChangeHandTip', newNumber)
}

export async function setShownNoUndefeatedTip(boolean) {
  return save('shownNoUndefeatedTip', boolean)
}

export async function getShownNoUndefeatedTip() {
  return read('shownNoUndefeatedTip')
}

export async function setShownWelcomeTip(boolean) {
  return save('shownWelcomeTip', boolean)
}

export async function getShownWelcomeTip() {
  return read('shownWelcomeTip')
}

export async function setShownPlayTip(boolean) {
  return save('shownPlayTip', boolean)
}

export async function getShownPlayTip() {
  return read('shownPlayTip')
}

export async function setShownSecondChallengeTip(boolean) {
  return save('shownSecondChallengeTip', boolean)
}

export async function getShownSecondChallengeTip() {
  return read('shownSecondChallengeTip')
}

export async function setShownEnableCardTip(boolean) {
  return save('shownEnableCardTip', boolean)
}

export async function getShownEnableCardTip(boolean) {
  return read('shownEnableCardTip', boolean)
}

export async function setShownTokenTip(boolean) {
  return save('shownTokenTip', boolean)
}

export async function getShownTokenTip(boolean) {
  return read('shownTokenTip', boolean)
}

export async function setShownFlipCardTip(boolean) {
  return save('shownFlipCardTip', boolean)
}

export async function getShownFlipCardTip() {
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

export async function setReducedMotion(boolean) {
  return save('animationOff', boolean)
}

export async function readReducedMotion() {
  return read('animationOff')
}

export async function setHighContrast(boolean) {
  return save('highContrast', boolean)
}

export async function readHighContrast() {
  return read('highContrast')
}

export async function setThemeMusicOn(boolean) {
  return save('themeMusicOn', boolean)
}

export async function readThemeMusicOn() {
  return read('themeMusicOn')
}

export async function setSoundEffectsOn(boolean) {
  return save('soundEffectsOn', boolean)
}

export async function readSoundEffectsOn() {
  return read('soundEffectsOn')
}

export async function setThemeVolume(number) {
  return save('themeVolume', number)
}

export async function readThemeVolume() {
  return read('themeVolume')
}

export async function setVoiceover(boolean) {
  return save('voiceover', boolean)
}

export async function readVoiceover() {
  return read('voiceover')
}

export async function seteffectsVolume(number) {
  return save('effectsVolume', number)
}

export async function readeffectsVolume() {
  return read('effectsVolume')
}

export async function setLanguage(language) {
  return save('language', language)
}

export async function readLanguage() {
  return read('language')
}

export async function readSettings(reducedMotion) {
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
