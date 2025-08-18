'use client'

import { forwardRef } from 'react'
import useSound from 'use-sound'

import btnSound from '@/assets/sounds/fx/14-button.mp3'
import largeBtnSound from '@/assets/sounds/fx/15-button-large.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { Link as NavLink } from '@/i18n/navigation'
import { AppPathnames } from '@/i18n/routing'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import styles from './Link.module.scss'

type LinkProps = {
  to: AppPathnames
  size?: ButtonSize
  variant?: ButtonVariant
  fullWidth?: boolean
  disabled?: boolean
  hasOwnSound?: boolean
  uppercase?: boolean
  [key: string]: any
}

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
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
