import { useEffect, useState } from 'react'
import useSound from 'use-sound'

import { readTokens, resetTokens, setTokens } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'

const UNLOCK_COST = -1
const tokenSound = '/sounds/fx/12-added-token.mp3'

export const useTokens = (): [
  updateTokens: (token: number) => void,
  removeTokens: () => void,
  ownedTokens: number
] => {
  const {
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [playTokenSound] = useSound(tokenSound, { volume: effectsVolume })
  const [ownedTokens, setOwnedTokens] = useState<number>(() => readTokens())

  const updateTokens = (token: number) => {
    soundEffectsOn && playTokenSound()
    setTokens(token)
    setOwnedTokens((prev) => prev + token)
  }

  const removeTokens = () => {
    const updated = ownedTokens + UNLOCK_COST
    if (updated >= 0) {
      setTokens(UNLOCK_COST)
      setOwnedTokens(updated)
    } else {
      resetTokens()
      setOwnedTokens(0)
    }
  }

  return [updateTokens, removeTokens, ownedTokens]
}
