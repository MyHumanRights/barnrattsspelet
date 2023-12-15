import { useCallback, useEffect, useState } from 'react'
import useSound from 'use-sound'

import { readTokens, resetTokens, setTokens } from '@/api/storage'
import tokenSound from '@/assets/sounds/fx/12-added-token.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'

const UNLOCK_COST = -1

type UseTokensReturn = [number, () => void]

export const useTokens = (dependency: boolean): UseTokensReturn => {
  const {
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [playTokenSound] = useSound(tokenSound, { volume: effectsVolume })

  const [ownedTokens, setOwnedTokens] = useState(0)

  const updateTokens = useCallback(async () => {
    const tokens = await readTokens()
    if (tokens > ownedTokens && soundEffectsOn) {
      soundEffectsOn && playTokenSound()
    }
    setOwnedTokens(tokens)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playTokenSound, soundEffectsOn])

  function removeTokens() {
    const updated = ownedTokens + UNLOCK_COST
    if (updated >= 0) {
      setOwnedTokens(updated)
      setTokens(UNLOCK_COST)
    } else {
      setOwnedTokens(0)
      resetTokens()
    }
  }

  useEffect(() => {
    updateTokens()
  }, [dependency, updateTokens])

  return [ownedTokens, removeTokens]
}
