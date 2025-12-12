import useSound from 'use-sound'

import { Options } from '@/contexts/OptionsContext'

const accessorySound = '/sounds/fx/18-avatar-accessory.mp3'
const faceSound = '/sounds/fx/19-avatar-face.mp3'
const hairSound = '/sounds/fx/20-avatar-hair.mp3'
const bodySound = '/sounds/fx/21-avatar-body.mp3'

export const useAvatarSounds = (options: Options) => {
  const [playFaceSound] = useSound(faceSound, { volume: options.effectsVolume })
  const [playBodySound] = useSound(bodySound, { volume: options.effectsVolume })
  const [playHairSound] = useSound(hairSound, { volume: options.effectsVolume })
  const [playAccessorySound] = useSound(accessorySound, {
    volume: options.effectsVolume,
  })

  return {
    face: playFaceSound,
    body: playBodySound,
    hair: playHairSound,
    accessory: playAccessorySound,
  }
}
