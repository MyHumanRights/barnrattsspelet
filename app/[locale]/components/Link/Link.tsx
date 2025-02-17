'use client'

import { forwardRef } from 'react'
import useSound from 'use-sound'

import { useOptionsContext } from '@/contexts/OptionsContext'
import { AppPathnames } from '@/i18n/routing'
import { Link as NavLink } from '@/i18n/routing'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import styles from './Link.module.scss'

interface Props {
  to: AppPathnames
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
  disabled?: boolean
  hasOwnSound?: boolean
  uppercase?: boolean
  [key: string]: any
}

export const Link: React.FC<Props> = forwardRef<HTMLAnchorElement, Props>(
  (
    {
      children,
      to,
      size = 'medium',
      variant = 'primary',
      fullWidth = false,
      disabled = false,
      hasOwnSound = false,
      uppercase = false,
      ...otherProps
    },
    ref
  ) => {
    const {
      playSoundEffect,
      options: { effectsVolume },
    } = useOptionsContext()

    const btnSound = '/sounds/fx/14-button.mp3'
    const largeBtnSound = '/sounds/fx/15-button-large.mp3'

    const sound = variant === 'huge' ? largeBtnSound : btnSound
    const [playSound] = useSound(sound, { volume: effectsVolume })

    function handleClick() {
      !hasOwnSound && playSoundEffect(playSound)
    }

    return (
      <NavLink
        href={to}
        onClick={handleClick}
        {...(ref ? { ref } : {})}
        className={`
      ${styles.link} 
      ${styles[variant]} 
      ${styles[size]} 
      ${fullWidth && styles.fullWidth}
      ${disabled && styles.disabled}
      ${uppercase && styles.uppercase}
      `}
        {...otherProps}
      >
        {children}
      </NavLink>
    )
  }
)

Link.displayName = 'Link'
