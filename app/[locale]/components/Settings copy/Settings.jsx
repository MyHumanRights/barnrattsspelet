import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router'
import { useTranslations } from 'next-intl'
import Close from '../Icons/Close'

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
} from '../../api/storage'

import { getDefaultAvatorParts, getRandomAvatar } from '../../api/engine'
import { useOptionsContext } from '@/contexts/OptionsContext'
import styles from './Settings.module.scss'

import { Button, OwlDialogue, Link } from '..'
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch'
import { AnimatePresence, motion } from 'framer-motion'
import avatarData from '../../data/avatar.json'
import useIsRightToLeft from '../../utils/hooks/useIsRightToLeft'

const Settings = ({ handleModal, isApp }) => {
  const { options, setOptions, shouldReduceMotion } = useContext(OptionsContext)
  const navigate = useNavigate()
  const t = useTranslations()
  const [showOwlTip, setShowOwlTip] = useState(false)
  const rtl = useIsRightToLeft()

  async function handleThemeMusicOn() {
    await setThemeMusicOn(!options.themeMusicOn)
    setOptions({
      ...options,
      themeMusicOn: !options.themeMusicOn,
    })
  }
  async function handleSoundEffectsOn() {
    await setSoundEffectsOn(!options.soundEffectsOn)
    setOptions({
      ...options,
      soundEffectsOn: !options.soundEffectsOn,
    })
  }

  async function handleAnimation() {
    await setReducedMotion(!options.shouldReduceMotion)
    setOptions({
      ...options,
      shouldReduceMotion: !options.shouldReduceMotion,
    })
  }

  async function handleVoiceover() {
    await setVoiceover(!options.voiceover)
    setOptions({
      ...options,
      voiceover: !options.voiceover,
    })
  }

  async function handleContrast() {
    await setHighContrast(!options.highContrast)
    setOptions({
      ...options,
      highContrast: !options.highContrast,
    })
  }

  function handleResetRequest() {
    setShowOwlTip(true)
  }

  async function handleReset() {
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

    navigate('/')
  }

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
              {t('common:settings:reset')}
            </Button>
          )}
          <button
            onClick={handleModal}
            className={`${styles.closeButton} ${
              rtl ? styles.rightToLeft : undefined
            }`}
            autoFocus
            aria-label={t('common:close')}
          >
            <Close />
          </button>
        </li>

        <li className={`${isApp ? styles.paddingApp : undefined}`}>
          <h1 className={styles.settingHeader}>
            {options.themeMusicOn
              ? t('common:settings:thememusicon')
              : t('common:settings:thememusicoff')}
          </h1>
          <ToggleSwitch
            isOn={options.themeMusicOn}
            handleToggle={handleThemeMusicOn}
            switchType='music'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {options.soundEffectsOn
              ? t('common:settings:soundeffectson')
              : t('common:settings:soundeffectsoff')}
          </h1>
          <ToggleSwitch
            isOn={options.soundEffectsOn}
            handleToggle={handleSoundEffectsOn}
            switchType='soundeffects'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {options.shouldReduceMotion === true
              ? t('common:settings:animationsoff')
              : t('common:settings:animationson')}
          </h1>
          <ToggleSwitch
            isOn={!options.shouldReduceMotion}
            handleToggle={handleAnimation}
            switchType='motion'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {options.voiceover === true
              ? t('common:settings:voiceoveron')
              : t('common:settings:voiceoveroff')}
          </h1>
          <ToggleSwitch
            isOn={options.voiceover}
            handleToggle={handleVoiceover}
            switchType='voiceover'
          />
        </li>
        <li>
          <h1 className={styles.settingHeader}>
            {options.highContrast === true
              ? t('common:settings:highcontrast')
              : t('common:settings:regularcontrast')}
          </h1>
          <ToggleSwitch
            isOn={options.highContrast}
            handleToggle={handleContrast}
            switchType='contrast'
          />
        </li>
        {/* <li>
          <h1 className={styles.settingHeader}>
            {t('common:settings:language')}
          </h1>
          <select
            className={styles.languageSelect}
            name="language"
            onChange={handleLanguageChange}
            defaultValue={options.language}
          >
            <option value="sv">{t('common:settings:swedish')}</option>
            <option value="en">{t('common:settings:english')}</option>
            <option value="ar">{t('common:settings:arabic')}</option>
          </select>
        </li> */}
        {!isApp && (
          <li>
            <Link variant='secondary' size='small' to='/manual' target='_blank'>
              {t('common:start:manual')}
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
              heading='common:owl:resetgame:header'
              body='common:owl:resetgame:body'
              cta={t('common:owl:resetgame:cta')}
              secondButton={
                <Button
                  onClick={() => setShowOwlTip(false)}
                  variant='secondary'
                  size='small'
                >
                  {t('common:owl:resetgame:cancel')}
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

export default Settings
