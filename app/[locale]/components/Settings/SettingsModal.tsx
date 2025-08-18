import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { useStatsContext } from '@/contexts/StatsContext'
import cards from '@/data/cards.json'
import { useRouter } from '@/i18n/routing'
import { getDefaultAvatorParts, getRandomAvatar } from '@/utils/avatar-utils'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import useIsRightToLeft from '@/utils/hooks/useIsRightToLeft'
import {
  cheatListAntagonists,
  cheatListAvatar,
  IAvatarColors,
  IAvatarParts,
} from '@/utils/types'

import {
  resetGameState,
  resetShownTips,
  resetTokens,
  resetWrongAnswers,
  setAvatar,
  setAvatarPartCollection,
  setCardCollection,
  setCardHand,
  setDefeatedAntagonists,
  setFirstTimeLootBox,
  setFirstTimePlaying,
  setGameStateValue,
  setHighContrast,
  setPlayFromScenario,
  setReducedMotion,
  setSoundEffectsOn,
  setThemeMusicOn,
  setVoiceover,
  // setLanguage,
} from '../../../../api/storage'
import { Button } from '../Button'
import { CloseButton } from '../CloseButton'
import { Link } from '../Link/Link'
import { OwlDialogue } from '../OwlDialogue'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import styles from './Settings.module.scss'

type SettingsModalProps = {
  handleModal: () => void
  avatarParts: IAvatarParts
  avatarColors: IAvatarColors
}

export const SettingsModal = ({
  handleModal,
  avatarParts,
  avatarColors,
}: SettingsModalProps) => {
  const t = useTranslations('Settings')
  const {
    options: {
      shouldReduceMotion,
      themeMusicOn,
      soundEffectsOn,
      highContrast,
      voiceover,
    },
    setOptions,
  } = useOptionsContext()
  const router = useRouter()
  const [showOwlTip, setShowOwlTip] = useState(false)
  const rtl = useIsRightToLeft()
  const [isApp, setApp] = useState(false)
  const { resetStatFlags } = useStatsContext()

  function handleThemeMusicOn() {
    setThemeMusicOn(!themeMusicOn)
    setOptions((prevState) => ({ ...prevState, themeMusicOn: !themeMusicOn }))
  }

  function handleSoundEffectsOn() {
    setSoundEffectsOn(!soundEffectsOn)
    setOptions((prevState) => ({
      ...prevState,
      soundEffectsOn: !soundEffectsOn,
    }))
  }

  function handleAnimation() {
    setReducedMotion(!shouldReduceMotion)
    setOptions((prevState) => ({
      ...prevState,
      shouldReduceMotion: !shouldReduceMotion,
    }))
  }

  function handleVoiceover() {
    setVoiceover(!voiceover)
    setOptions((prevState) => ({ ...prevState, voiceover: !voiceover }))
  }

  const handleContrast = () => {
    setHighContrast(!highContrast)
    setOptions((prevState) => ({ ...prevState, highContrast: !highContrast }))
  }

  const handleResetRequest = () => {
    setShowOwlTip(true)
  }

  const handleReset = () => {
    const defaultAvatarParts = getDefaultAvatorParts(avatarParts)
    const randomAvatar = getRandomAvatar(defaultAvatarParts, avatarColors)
    setAvatarPartCollection(defaultAvatarParts)
    setAvatar(randomAvatar)
    // Reset statistics flags so one-time events can be tracked again
    resetStatFlags()
    resetShownTips()
    resetTokens()
    setCardHand([])
    resetWrongAnswers()
    setDefeatedAntagonists([])
    setFirstTimePlaying(true)
    setFirstTimeLootBox(true)
    setCardCollection([])
    setPlayFromScenario(false)
    resetGameState()

    handleModal()

    router.push('/')
  }

  useEffect(() => {
    const APP_SITE = window.location.href.endsWith('collection-viewer/app')
    if (APP_SITE) {
      setApp(true)
      setOptions((prevState) => ({ ...prevState, shouldReduceMotion: false }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // function handleLanguageChange(e) {
  //   const selectedLanguage = e.target.value
  //   setLanguage(selectedLanguage)
  //   setOptions({
  //     ...options,
  //     language: selectedLanguage
  //   })
  // }

  const handleCheat = () => {
    setGameStateValue({
      progress: { level: 6, part: 4 },
      hasWonAllParts: false,
    })
    setDefeatedAntagonists(cheatListAntagonists)
    setAvatarPartCollection(cheatListAvatar)
    window.location.href = '/sv/home'
  }

  const handleGetAllCards = () => {
    //@ts-ignore
    setCardCollection(cards)
    window.location.href = '/sv/home'
  }

  return (
    <section className={styles.wrapper}>
      <ul className={`${styles.list} ${rtl ? styles.rightToLeft : ''}`}>
        <li>
          {!isApp && (
            <Button
              onClick={handleResetRequest}
              hasOwnSound
              size={ButtonSize.SMALL}
            >
              {t('reset')}
            </Button>
          )}
          <CloseButton onClick={handleModal} />
        </li>

        <li className={`${isApp ? styles.paddingApp : undefined}`}>
          <h1 className={styles.settingHeader}>
            {themeMusicOn ? t('thememusicon') : t('thememusicoff')}
          </h1>
          <ToggleSwitch
            isOn={themeMusicOn}
            handleToggle={handleThemeMusicOn}
            switchType='music'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {soundEffectsOn ? t('soundeffectson') : t('soundeffectsoff')}
          </h1>
          <ToggleSwitch
            isOn={soundEffectsOn}
            handleToggle={handleSoundEffectsOn}
            switchType='soundeffects'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {shouldReduceMotion === true
              ? t('animationsoff')
              : t('animationson')}
          </h1>
          <ToggleSwitch
            isOn={!shouldReduceMotion}
            handleToggle={handleAnimation}
            switchType='motion'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {voiceover === true ? t('voiceoveron') : t('voiceoveroff')}
          </h1>
          <ToggleSwitch
            isOn={voiceover}
            handleToggle={handleVoiceover}
            switchType='voiceover'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {highContrast === true ? t('highcontrast') : t('regularcontrast')}
          </h1>
          <ToggleSwitch
            isOn={highContrast}
            handleToggle={handleContrast}
            switchType='contrast'
          />
        </li>
        {process.env.NEXT_PUBLIC_APP_ENV !== 'production' && (
          <>
            <Button
              size={ButtonSize.SMALL}
              onClick={handleCheat}
              style={{ marginBottom: '1rem' }}
            >
              Fuska
            </Button>
            <Button
              size={ButtonSize.SMALL}
              onClick={handleGetAllCards}
              style={{ marginBottom: '1rem' }}
            >
              Få alla kort
            </Button>
          </>
        )}
        {/* <li>
          <h1 className={styles.settingHeader}>
            {t('language')}
          </h1>
          <select
            className={styles.languageSelect}
            name="language"
            onChange={handleLanguageChange}
            defaultValue={options.language}
          >
            <option value="sv">{t('swedish')}</option>
            <option value="en">{t('english')}</option>
            <option value="ar">{t('arabic')}</option>
          </select>
        </li> */}
        {!isApp && (
          <li>
            <Link
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.SMALL}
              to='/manual'
              // target='_blank'
            >
              {t('manual')}
            </Link>
          </li>
        )}
      </ul>
      <AnimatePresence>
        {showOwlTip && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
            }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.4,
              type: shouldReduceMotion ? 'tween' : 'spring',
            }}
            exit={{ scale: 0.5, opacity: 0 }}
            className={styles.owlWrapper}
          >
            <OwlDialogue
              heading='Owl.resetgame.header'
              body='Owl.resetgame.body'
              cta={t('cta')}
              secondButton={
                <Button
                  onClick={() => setShowOwlTip(false)}
                  variant={ButtonVariant.SECONDARY}
                  size={ButtonSize.SMALL}
                >
                  {t('cancel')}
                </Button>
              }
              onClick={handleReset}
              setShowOwl={setShowOwlTip}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
