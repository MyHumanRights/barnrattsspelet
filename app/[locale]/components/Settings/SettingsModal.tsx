import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { Close } from '../Icons/Close'

import {
  resetTokens,
  setCardHand,
  setReducedMotion,
  setDefeatedAntagonists,
  setHighContrast,
  setCardCollection,
  setFirstTimePlaying,
  setFirstTimeLootBox,
  setAvatarPartCollection,
  setAvatar,
  setPlayFromScenario,
  setThemeMusicOn,
  setSoundEffectsOn,
  resetShownTips,
  setVoiceover,
  resetWrongAnswers,
  // setLanguage,
} from '../../../../api/storage'

import { getDefaultAvatorParts, getRandomAvatar } from '../../../../api/engine'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import styles from './Settings.module.scss'
import { Button } from '../Button'
import { Link } from '../Link/Link'
import { OwlDialogue } from '../OwlDialogue'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { AnimatePresence, motion } from 'framer-motion'
import avatarData from '@/data/avatar.json'
import useIsRightToLeft from '@/utils/hooks/useIsRightToLeft'

interface Props {
  handleModal: () => void
}

export const SettingsModal: React.FC<Props> = ({ handleModal }) => {
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

  async function handleThemeMusicOn() {
    await setThemeMusicOn(!themeMusicOn)
    setOptions((prevState) => ({ ...prevState, themeMusicOn: !themeMusicOn }))
  }

  async function handleSoundEffectsOn() {
    await setSoundEffectsOn(!soundEffectsOn)
    setOptions((prevState) => ({
      ...prevState,
      soundEffectsOn: !soundEffectsOn,
    }))
  }

  async function handleAnimation() {
    await setReducedMotion(!shouldReduceMotion)
    setOptions((prevState) => ({
      ...prevState,
      shouldReduceMotion: !shouldReduceMotion,
    }))
  }

  async function handleVoiceover() {
    await setVoiceover(!voiceover)
    setOptions((prevState) => ({ ...prevState, voiceover: !voiceover }))
  }

  const handleContrast = async () => {
    await setHighContrast(!highContrast)
    setOptions((prevState) => ({ ...prevState, highContrast: !highContrast }))
  }

  const handleResetRequest = () => {
    setShowOwlTip(true)
  }

  const handleReset = async () => {
    const defaultAvatarParts = getDefaultAvatorParts(avatarData.parts)
    const randomAvatar = getRandomAvatar(defaultAvatarParts, avatarData.colors)

    await setAvatarPartCollection(defaultAvatarParts)
    await setAvatar(randomAvatar)
    await resetShownTips()
    await resetTokens()
    await setCardHand([])
    await resetWrongAnswers()
    await setDefeatedAntagonists([])
    await setFirstTimePlaying(true)
    await setFirstTimeLootBox(true)
    await setCardCollection([])
    await setPlayFromScenario(false)

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

  // async function handleLanguageChange(e) {
  //   const selectedLanguage = e.target.value
  //   await setLanguage(selectedLanguage)
  //   setOptions({
  //     ...options,
  //     language: selectedLanguage
  //   })
  // }

  return (
    <section className={styles.wrapper}>
      <ul className={`${styles.list} ${rtl ? styles.rightToLeft : undefined}`}>
        <li>
          {!isApp && (
            <Button onClick={handleResetRequest} hasOwnSound>
              {t('reset')}
            </Button>
          )}
          <button
            onClick={handleModal}
            className={`${styles.closeButton} ${
              rtl ? styles.rightToLeft : undefined
            }`}
            autoFocus
            aria-label={t('close')}
          >
            <Close />
          </button>
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
