'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

import { setAvatar, setAvatarPartCollection } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/i18n/navigation'
import { getNewAvatarParts, resetNewAvatarParts } from '@/utils/avatar-utils'
import { ButtonSize, ButtonVariant, CATEGORIES } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { useAvatarData } from '@/utils/hooks/useAvatarData'
import { useAvatarNavigation } from '@/utils/hooks/useAvatarNavigation'
import { useAvatarSounds } from '@/utils/hooks/useAvatarSounds'
import { useTabKeyHandler } from '@/utils/hooks/useTabKeyHandler'

import { Avatar } from '../components/Avatar'
import { AvatarColorSelector } from '../components/Avatar/AvatarColorSelector'
import { AvatarPartSelector } from '../components/Avatar/AvatarPartSelector'
import { Button } from '../components/Button'
import { HomeIcon } from '../components/Icons/HomeIcon'
import { Replay } from '../components/Icons/Replay'
import styles from './AvatarBuilder.module.scss'

export const AvatarBuilderClient = () => {
  const t = useTranslations()
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const { toggleThemeSound, options } = useOptionsContext()

  const sounds = useAvatarSounds(options)
  useTabKeyHandler(formRef)

  const {
    avatarCollection,
    choices,
    colors,
    activeColors,
    setChoices,
    loadAvatarData,
  } = useAvatarData()

  const { index, handleClick, handleColorClick, handleClickRandom } =
    useAvatarNavigation({
      avatarCollection,
      choices,
      colors,
      setChoices,
      sounds,
      options,
    })

  const [animate, triggerHomeAnimate] = useAnimation({ y: -2 })
  const [animateRandom, triggerRandomAnimate] = useAnimation({ rotation: -40 })

  useEffect(() => {
    loadAvatarData()
  }, [loadAvatarData])

  useEffect(() => {
    toggleThemeSound()
  }, [options.themeMusicOn, options.themeVolume, toggleThemeSound])

  const handleSubmit = () => {
    if (choices) {
      const resetParts = resetNewAvatarParts(avatarCollection) ?? []
      setAvatarPartCollection(resetParts)
      setAvatar(choices)
    }
    router.push('/home')
  }

  const handleGoToHome = () => {
    const resetParts = resetNewAvatarParts(avatarCollection) ?? []
    setAvatarPartCollection(resetParts)
    router.push('/home')
  }

  const hasNewPart = (category: CATEGORIES) => {
    const newPart = getNewAvatarParts(avatarCollection)
    return newPart.some((p) => p.category === category)
  }

  return (
    <div className={styles.content}>
      <div className={styles.menuBar}>
        <Button
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.SMALL}
          onMouseEnter={triggerHomeAnimate}
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
          <form className={styles.partSelectorWrapper} ref={formRef}>
            <h1>{t('avatarbuilder.heading')}</h1>
            {[
              CATEGORIES.HAIR,
              CATEGORIES.FACE,
              CATEGORIES.BODY,
              CATEGORIES.ACCESSORY,
            ].map((category) => (
              <AvatarPartSelector
                key={category}
                text={t(`avatarbuilder.parts.${category}`)}
                disabled={avatarCollection[category]?.length === 0}
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
                  onMouseEnter={triggerRandomAnimate}
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
            <Button
              variant={ButtonVariant.HUGE}
              onClick={handleSubmit}
              size={ButtonSize.XLARGE}
            >
              {t('avatarbuilder.save')}
            </Button>
          </div>
        </div>

        <div className={styles.colorPickWrapper}>
          <form>
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.hairColor')}
              category={CATEGORIES.HAIR}
              colors={colors?.hair}
              activeColor={activeColors.hair}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selecthaircolor')}
            />
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.faceColor')}
              category={CATEGORIES.FACE}
              colors={colors?.face}
              activeColor={activeColors.face}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selectfacecolor')}
            />
            <AvatarColorSelector
              title={t('avatarbuilder.colorcategories.bodyColor')}
              category={CATEGORIES.BODY}
              colors={colors?.body}
              activeColor={activeColors.body}
              onClick={handleColorClick}
              ariaLabel={t('avatarbuilder.selectbodycolor')}
            />
          </form>
        </div>
      </div>
    </div>
  )
}
