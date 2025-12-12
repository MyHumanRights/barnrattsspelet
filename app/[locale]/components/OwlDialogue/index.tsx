import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Dispatch, ReactNode, SetStateAction, useEffect } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant, OWLS } from '@/utils/constants'

import { Button } from '../Button'
import { TextWithVoiceover } from '../TextWithVoiceover'
import styles from './OwlDialogue.module.scss'

type OwlDialogueProps = {
  body?: string | null
  heading?: string | null
  setShowOwl?: Dispatch<SetStateAction<boolean>>
  setShowSpecificOwl?: Dispatch<SetStateAction<OWLS | null>>
  setHasShownOwlTip?: (show: boolean) => void
  cta?: string
  disabled?: boolean
  secondButton?: ReactNode
  secondBody?: string
  onClick?: () => void
  item?: ReactNode
  hasOwnSound?: boolean
  small?: boolean
  vertical?: boolean
  buttonHasOwnSound?: boolean
  children?: ReactNode
}

export const OwlDialogue = ({
  body,
  heading,
  setShowOwl,
  setShowSpecificOwl,
  setHasShownOwlTip = () => {},
  cta,
  disabled = false,
  secondButton,
  secondBody,
  onClick = () => {},
  item = false,
  hasOwnSound = false,
  small = false,
  vertical = false,
  children,
  buttonHasOwnSound = false,
}: OwlDialogueProps) => {
  const t = useTranslations()
  const {
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const owlSound = '/sounds/fx/16-owl-popup.mp3'

  const handleClick = () => {
    setHasShownOwlTip(true)
    setShowOwl?.(false)
    setShowSpecificOwl?.(null)
    onClick()
  }

  // Optimize sound effect logic
  useEffect(() => {
    const playSound = async () => {
      if (!hasOwnSound && soundEffectsOn) {
        try {
          const sound = new Audio(owlSound)
          sound.volume = effectsVolume
          await sound.play()
        } catch (error) {
          console.error('Failed to play sound:', error)
        }
      }
    }

    playSound()
  }, [hasOwnSound, soundEffectsOn, effectsVolume])

  // Memoize class names to prevent unnecessary recalculations
  const wrapperClasses = `${styles.wrapper} ${small ? styles.small : ''} ${
    vertical ? styles.vertical : ''
  }`
  const dialogueClasses = item ? styles.dialogueWithItem : styles.dialogue

  return (
    <div className={wrapperClasses}>
      <picture className={styles.image}>
        <source
          media='(max-width: 499px)'
          srcSet='/svgs/owl.svg'
          width='117'
          height='120'
        />
        <source
          media='(min-width: 500px)'
          srcSet='/svgs/owl-on-twig.svg'
          width='147'
          height='150'
        />
        <Image
          src='/svgs/owl-on-twig.svg'
          alt={t('Owl.owlalt')}
          width={147}
          height={150}
          priority
        />
      </picture>
      <div className={dialogueClasses}>
        <div className={styles.bodyWrapper}>
          {heading && (
            <p>
              <strong className={styles.heading}>
                <TextWithVoiceover textKey={heading} />
              </strong>
            </p>
          )}
          {body && (
            <p>{heading ? t(body) : <TextWithVoiceover textKey={body} />}</p>
          )}
          {secondBody && <p>{secondBody}</p>}
          <div className={styles.ctaWrapper}>
            <Button
              onClick={handleClick}
              disabled={disabled}
              variant={ButtonVariant.SECONDARY}
              size={ButtonSize.SMALL}
              hasOwnSound={buttonHasOwnSound}
            >
              {cta || t('Owl.confirm')}
            </Button>
            {secondButton}
          </div>
          {children}
        </div>
        {item}
      </div>
    </div>
  )
}
