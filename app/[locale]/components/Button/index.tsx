'use client'

import React, { PropsWithChildren, forwardRef } from 'react'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

import btnSound from '@/assets/sounds/fx/14-button.mp3'
import largeBtnSound from '@/assets/sounds/fx/15-button-large.mp3'
import styles from './Button.module.scss'
import useSound from 'use-sound'

interface Props {
  as?: React.ElementType
  size?: ButtonSize
  variant?: ButtonVariant
  uppercase?: boolean
  hasOwnSound?: boolean
  onClick?: () => void
  [key: string]: any
}

export const Button: React.FC<PropsWithChildren<Props>> = forwardRef(
  function Button(
    {
      as: Component = 'button',
      children,
      onClick,
      size = ButtonSize.MEDIUM,
      variant = ButtonVariant.PRIMARY,
      uppercase = false,
      hasOwnSound = false,
      ...otherProps
    },
    ref
  ) {
    const {
      playSoundEffect,
      options: { effectsVolume },
    } = useOptionsContext()
    const sound = variant === ButtonVariant.HUGE ? largeBtnSound : btnSound
    // TODO: use same volume when we have more even fx volumes
    const volume =
      variant === ButtonVariant.HUGE ? effectsVolume - 0.1 : effectsVolume
    const [playSound] = useSound(sound, { volume: volume })

    const renderSize = () => {
      let cssSize = size
      variant === ButtonVariant.HUGE
        ? (cssSize = ButtonSize.XLARGE)
        : (cssSize = size)
      return cssSize
    }

    const handleClick = () => {
      !hasOwnSound && playSoundEffect(playSound)
      onClick && onClick()
    }

    return (
      <Component
        {...(ref ? { ref } : {})}
        onClick={handleClick}
        className={`${styles.button} ${styles[variant]} ${
          styles[renderSize()]
        } ${uppercase && styles.uppercase} ${styles.ripple}`}
        {...otherProps}
      >
        {children}
      </Component>
    )
  }
)
