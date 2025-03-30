import useSound from 'use-sound'

import accessorySound from '@/assets/sounds/fx/18-avatar-accessory.mp3'
import faceSound from '@/assets/sounds/fx/19-avatar-face.mp3'
import hairSound from '@/assets/sounds/fx/20-avatar-hair.mp3'
import bodySound from '@/assets/sounds/fx/21-avatar-body.mp3'
import { Options } from '@/contexts/OptionsContext'

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
