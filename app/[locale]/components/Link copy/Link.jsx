import { useContext, forwardRef } from 'react'
import { NavLink } from 'react-router-dom'
import { useOptionsContext } from '@/contexts/OptionsContext'
import btnSound from '../../assets/sounds/fx/14-button.mp3'
import largeBtnSound from '../../assets/sounds/fx/15-button-large.mp3'
import styles from './Link.module.scss'
import useSound from 'use-sound'

// eslint-disable-next-line react/display-name
const Link = forwardRef(
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
    } = useContext(OptionsContext)
    const sound = variant === 'huge' ? largeBtnSound : btnSound
    const [playSound] = useSound(sound, { volume: effectsVolume })

    function handleClick() {
      !hasOwnSound && playSoundEffect(playSound)
    }

    return (
      <NavLink
        to={to}
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

export default Link
