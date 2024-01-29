//@ts-nocheck
'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import {
  getNewAvatarParts,
  getRandomAvatar,
  resetNewAvatarParts,
} from '@/api/engine'
import {
  getAvatar,
  getAvatarPartCollection,
  setAvatar,
  setAvatarPartCollection,
  setGameStateValue,
} from '@/api/storage'
import accessorySound from '@/assets/sounds/fx/18-avatar-accessory.mp3'
import faceSound from '@/assets/sounds/fx/19-avatar-face.mp3'
import hairSound from '@/assets/sounds/fx/20-avatar-hair.mp3'
import bodySound from '@/assets/sounds/fx/21-avatar-body.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/navigation'
import { ButtonSize, ButtonVariant, CATEGORIES } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { IAvatar, IAvatarColors, IAvatarNew } from '@/utils/types'

import { Avatar } from '../components/Avatar'
import { AvatarColorSelector } from '../components/Avatar/AvatarColorSelector'
import { AvatarPartSelector } from '../components/Avatar/AvatarPartSelector'
import { Body19, Face19 } from '../components/AvatarPart/avatarParts'
import { Button } from '../components/Button'
import { HomeIcon } from '../components/Icons/HomeIcon'
import { Replay } from '../components/Icons/Replay'
import Skip from '../components/Icons/Skip'
import styles from './AvatarBuilder.module.scss'

const { HAIR, FACE, BODY, ACCESSORY } = CATEGORIES

interface Props {
  avatarColors: IAvatarColors
}

export const Client: React.FC<Props> = ({ avatarColors }) => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ y: -2 })
  const [animateRandom, triggerRandom] = useAnimation({ rotation: -40 })
  const [animateSkip, triggerSkip] = useAnimation({ x: 10 })
  const [avatarCollection, setAvatarCollection] = useState<IAvatar | null>(null)
  const [choices, setChoices] = useState<IAvatar | null>(null)
  const [colors, setColors] = useState<IAvatarColors | null>(null)
  const [activeHairColor, setActiveHairColor] = useState<string | null>(null)
  const [activeFaceColor, setActiveFaceColor] = useState<string | null>(null)
  const [activeBodyColor, setActiveBodyColor] = useState<string | null>(null)
  const [firstTimer, setFirstTimer] = useState(false)
  const [index, setIndex] = useState({})
  const { toggleThemeSound, options } = useOptionsContext()
  const [playFaceSound] = useSound(faceSound, { volume: options.effectsVolume })
  const [playBodySound] = useSound(bodySound, { volume: options.effectsVolume })
  const [playHairSound] = useSound(hairSound, { volume: options.effectsVolume })
  const [playAccessorySound] = useSound(accessorySound, {
    volume: options.effectsVolume,
  })
  const sounds = {
    face: playFaceSound,
    body: playBodySound,
    hair: playHairSound,
    accessory: playAccessorySound,
  }

  const router = useRouter()
  const formRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    ;(async function () {
      setColors(avatarColors)
      const storedAvatar: IAvatar = await getAvatar()
      const storedPartCollection = await getAvatarPartCollection()
      setChoices(storedAvatar)
      setAvatarCollection(storedPartCollection)
      setActiveHairColor(storedAvatar.hair.color)
      setActiveFaceColor(storedAvatar.face.color)
      setActiveBodyColor(storedAvatar.body.color)
    })()
  }, [avatarColors])

  useEffect(() => {
    if (avatarCollection) {
      const index = [ACCESSORY, BODY, FACE, HAIR].reduce((acc, prop) => {
        //@ts-ignore
        const idx = avatarCollection[prop].findIndex(
          //@ts-ignore
          (svg) => svg.id === choices[prop].id
        )
        //@ts-ignore
        acc[prop] = idx + 1
        return acc
      }, {})
      setIndex(index)
    }
  }, [avatarCollection, choices])

  function hasNewPart(category: CATEGORIES) {
    const newPart: IAvatarNew[] = getNewAvatarParts(avatarCollection)

    return newPart.some((p) => p.category === category)
  }

  function handleSubmit() {
    const resetParts = resetNewAvatarParts(avatarCollection)
    setAvatarPartCollection(resetParts)
    setAvatar(choices)

    //TODO: make sure they're allowed to go to loot box
    firstTimer
      ? (setGameStateValue({ allowedLootbox: true }), router.push('/loot-box'))
      : router.push('/home')
  }

  useEffect(() => {
    document.addEventListener('keyup', handleTabKey)
    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keyup', handleTabKey)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [])

  function handleTabKey(e: KeyboardEvent) {
    if (e.key !== 'Tab') return

    const focusableElements = formRef.current?.querySelectorAll('input') || []
    focusableElements &&
      focusableElements.forEach((el) => {
        const label = el.parentNode as HTMLElement
        label.style.outline = 'none'
      })
    const activeEl = Array.from(focusableElements).filter(
      (el) => el === document.activeElement
    )
    if (activeEl.length) {
      window.scrollTo(0, 0)
      const focussedLabel = activeEl[0]?.parentNode as HTMLElement
      focussedLabel.style.outline = '3px dashed black'
    }
  }

  function handleClickRandom() {
    const randomAvatar: IAvatar =
      avatarCollection && colors && getRandomAvatar(avatarCollection, colors)
    setChoices(randomAvatar)
    setActiveHairColor(randomAvatar.hair.color)
    setActiveFaceColor(randomAvatar.face.color)
    setActiveBodyColor(randomAvatar.body.color)
  }

  function handleClick(category: CATEGORIES, direction: string) {
    const categoryCollection = avatarCollection![category]
    const collectionLength = categoryCollection.length
    if (collectionLength === 0) {
      return
    }
    const currentIndex = categoryCollection.findIndex(
      (svg) => svg.id === choices[category].id
    )
    const newIndex =
      (currentIndex + direction + collectionLength) % collectionLength
    if (options.soundEffectsOn) {
      sounds[category]()
    }
    setChoices({
      ...choices,
      [category]: {
        ...choices[category],
        id: categoryCollection[newIndex].id,
      },
    })
    setIndex({
      ...index,
      [category]: newIndex + 1,
    })
  }

  const handleGoToHome = () => {
    const resetParts = resetNewAvatarParts(avatarCollection)
    setAvatarPartCollection(resetParts)

    router.push('/home')
  }

  const handleColorClick = (category: CATEGORIES, color: string) => {
    // Prevent scroll down to overflow outside html small screens
    // If there's another solution this could be removed
    window.scrollTo(0, 0)

    const newChoices = { ...choices }
    //@ts-ignore
    newChoices[category] = { ...newChoices[category], color }
    //@ts-ignore
    setChoices(newChoices)

    switch (category) {
      case HAIR:
        setActiveHairColor(color)
        break
      case FACE:
        setActiveFaceColor(color)
        break
      case BODY:
        setActiveBodyColor(color)
        break
      default:
        break
    }
  }

  useEffect(() => {
    toggleThemeSound()
  }, [options.themeMusicOn, options.themeVolume, toggleThemeSound])

  const categories = [HAIR, FACE, BODY, ACCESSORY]

  return (
    <div className={styles.content}>
      <div className={styles.menuBar}>
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onMouseEnter={trigger}
          onClick={handleGoToHome}
        >
          {t('mainmenu.home')}
          <motion.span animate={animate}>
            <HomeIcon />
          </motion.span>
        </Button>
      </div>
      <div className={styles.avatarBuildWrapper}>
        {avatarCollection && (
          <form className={styles.partSelectorWrapper}>
            <h1>{t('avatarbuilder.heading')}</h1>
            {categories.map((category) => (
              <AvatarPartSelector
                key={category}
                text={t(`avatarbuilder.parts.${category}`)}
                disabled={avatarCollection[category].length === 0}
                category={category}
                onClick={handleClick}
                ariaPrev={t(`avatarbuilder.previous${category}`)}
                ariaNext={t(`avatarbuilder.next${category}`)}
                index={index[category]}
                newPart={hasNewPart(category)}
              />
            ))}
          </form>
        )}

        <div className={styles.avatarPreviewWrapper}>
          <div className={styles.avatarPreview}>
            <Avatar
              choices={choices}
              link={
                <Button
                  variant={ButtonVariant.TEXT}
                  size={ButtonSize.SMALL}
                  onClick={handleClickRandom}
                  aria-label={t('avatarbuilder.randomAria')}
                  onMouseEnter={triggerRandom}
                >
                  <span className={styles.btnText}>
                    {t('avatarbuilder.random')}
                  </span>
                  <motion.span animate={animateRandom}>
                    <Replay />
                  </motion.span>
                </Button>
              }
            />
          </div>
          <div className={styles.primaryButton}>
            <Button variant={ButtonVariant.HUGE} onClick={handleSubmit}>
              {t('avatarbuilder.save')}
            </Button>
          </div>
        </div>

        <div className={styles.colorPickWrapper} ref={formRef}>
          <form>
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.hairColor')}
              category={HAIR}
              colors={colors?.hair}
              activeColor={activeHairColor}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selecthaircolor')}
            />
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.faceColor')}
              category={FACE}
              colors={colors?.face}
              activeColor={activeFaceColor}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selectfacecolor')}
            />
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.bodyColor')}
              category={BODY}
              colors={colors?.body}
              activeColor={activeBodyColor}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selectbodycolor')}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
