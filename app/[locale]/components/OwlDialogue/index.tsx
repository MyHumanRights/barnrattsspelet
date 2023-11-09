import { PropsWithChildren, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { Button } from '../Button/Button'
// import owlOnTwig from '../../assets/svgs/owl-on-twig.svg'
// import owl from '../../assets/svgs/owl.svg'
// import { TextWithVoiceover } from '../'
import styles from './OwlDialogue.module.scss'
import owlSound from '../../../../assets/sounds/fx/16-owl-popup.mp3'

interface Props {
  body?: string
  heading?: string
  setShowOwl?: (show: boolean) => void
  setHasShownOwlTip?: (show: boolean) => void
  cta?: string
  disabled?: boolean
  secondButton?: React.ReactNode
  secondBody?: string
  onClick?: () => void
  item?: React.ReactNode
  hasOwnSound?: boolean
  small?: boolean
  vertical?: boolean
  buttonHasOwnSound?: boolean
}

export const OwlDialogue: React.FC<PropsWithChildren<Props>> = ({
  body,
  heading,
  setShowOwl = () => {},
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
}) => {
  const t = useTranslations('Owl')
  const {
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()

  useEffect(() => {
    const sound = new Audio(owlSound)
    sound.volume = effectsVolume
    const timeout = setTimeout(() => {
      !hasOwnSound && soundEffectsOn && sound.play()
    }, 100)
    return () => {
      clearTimeout(timeout)
    }
  }, [effectsVolume, hasOwnSound, soundEffectsOn])

  function handleClick() {
    setHasShownOwlTip(true)
    setShowOwl(false)
    onClick()
  }

  return (
    <div
      className={`${styles.wrapper} ${small && styles.small} ${
        vertical && styles.vertical
      }`}
    >
      {/* <picture className={styles.image}>
        <source
          media='(max-width: 499px)'
          srcSet={owl}
          width='117'
          height='120'
        />
        <source
          media='(min-width: 500px)'
          srcSet={owlOnTwig}
          width='147'
          height='150'
        />
        <img src={owlOnTwig} alt={t('common:owl:owlalt')} />
      </picture> */}
      <div className={`${item ? styles.dialogueWithItem : styles.dialogue}`}>
        <div className={styles.bodyWrapper}>
          {!!heading && (
            <p>
              <strong className={styles.heading}>
                {/* <TextWithVoiceover textKey={heading} /> */}
              </strong>
            </p>
          )}
          {body && (
            <p>
              {/* We only need the voiceover button if there is no heading, 
                otherwise, the heading will have the voiceover button */}
              {/* {heading ? t(body) : <TextWithVoiceover textKey={body} />} */}
            </p>
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
              {cta ? cta : t('confirm')}
            </Button>
            {secondButton}
          </div>
          {children}
        </div>
        {item && item}
      </div>
    </div>
  )
}
