'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import useSound from 'use-sound'
import titleTrack from '../assets/sounds/fx/00-title.mp3'

interface Options {
  shouldReduceMotion: boolean
  highContrast: boolean
  themeVolume: number
  effectsVolume: number
  themeMusicOn: boolean
  soundEffectsOn: boolean
  voiceover: boolean
  language: string
}

interface OptionsContextProps {
  clientHeight: number
  clientWidth: number
  isMobile: boolean
  hasVoiceover: (path: string) => Promise<boolean>
  options: Options
  playSoundEffect: (playSound: () => void, delay?: number) => void
  playVoiceover: (path: string) => Promise<HTMLAudioElement | undefined>
  setOptions: React.Dispatch<React.SetStateAction<Options>>
  setShouldShowAlertBox: React.Dispatch<React.SetStateAction<boolean>>
  shouldShowAlertBox: boolean
  toggleThemeSound: (soundOn?: boolean) => void
}

const OptionsContext = createContext<OptionsContextProps>(
  {} as OptionsContextProps
)

export const OptionsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [shouldShowAlertBox, setShouldShowAlertBox] = useState(true)
  const [currentVoiceover, setCurrentVoiceover] =
    useState<HTMLAudioElement | null>(null)
  const [options, setOptions] = useState({
    shouldReduceMotion: false,
    highContrast: false,
    themeVolume: 0.5,
    effectsVolume: 0.5,
    themeMusicOn: false,
    soundEffectsOn: false,
    voiceover: true,
    language: 'sv',
  })

  const [, { sound }] = useSound(titleTrack, {
    loop: true,
    volume: 0,
    interrupt: true,
    autoplay: true,
  })

  const toggleThemeSound = (soundOn = options.themeMusicOn) => {
    const currentVolume: number = sound?._volume
    // if sound on and not playing / muted
    if (sound && soundOn && currentVolume !== options.themeVolume) {
      sound.fade(currentVolume || 0, options.themeVolume, 400)
      // if sound off and not muted
    } else if (sound && !soundOn && currentVolume > 0) {
      sound.fade(currentVolume || 0, 0, 400)
    }
  }

  const playSoundEffect = async (playSound: () => void, delay = 0) => {
    setTimeout(() => {
      options.soundEffectsOn && playSound()
    }, delay)
  }

  const hasVoiceover = async (path: string): Promise<boolean> => {
    try {
      const imported = (
        await import(
          '/assets/sounds/voiceover/' + options.language + '/' + path + '.mp3'
        )
      ).default
      return imported
    } catch (error) {
      return false
    }
  }

  const playVoiceover = async (path: string) => {
    try {
      const imported = (
        await import(
          '/assets/sounds/voiceover/' + options.language + '/' + path + '.mp3'
        )
      ).default
      const audio = new Audio(imported)
      audio.volume = options.effectsVolume || 0.5
      // pause currently playing voiceover, replace with new audio
      currentVoiceover?.pause()
      setCurrentVoiceover(audio)
      audio.play()
      return audio
    } catch (error) {
      console.log(error)
    }
  }

  const getVh = useCallback(() => {
    if (typeof window === 'undefined') return 0
    return window.innerHeight || 0
  }, [])

  const getVw = useCallback(() => {
    if (typeof window === 'undefined') return 0
    return window.innerWidth || 0
  }, [])

  const [clientHeight, setVh] = useState<number>(getVh())
  const [clientWidth, setVw] = useState<number>(getVw())
  useEffect(() => {
    const handleResize = () => {
      setVh(getVh())
      setVw(getVw())
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [getVh, getVw])

  const [isMobile, setIsMobile] = useState<boolean>(false)
  useEffect(() => {
    setIsMobile(clientWidth < 768)
  }, [clientWidth])

  return (
    <OptionsContext.Provider
      value={{
        options,
        setOptions,
        toggleThemeSound,
        playSoundEffect,
        hasVoiceover,
        playVoiceover,
        clientHeight,
        clientWidth,
        isMobile,
        shouldShowAlertBox,
        setShouldShowAlertBox,
      }}
    >
      {children}
    </OptionsContext.Provider>
  )
}

export const useOptionsContext = () => useContext(OptionsContext)
