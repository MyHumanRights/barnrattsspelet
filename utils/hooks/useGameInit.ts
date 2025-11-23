import { useCallback, useEffect, useRef } from 'react'

import { resetGameState, setGameState } from '@/api/engine'
import { getCardHand, resetWrongAnswers } from '@/api/storage'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { IGameState } from '@/utils/types'

import { useAddToStatistics } from './useAddToStatistics'

type SetState<T> = React.Dispatch<React.SetStateAction<T>>

export default function useGameInit(
  antagonistType: string | null,
  setCurrentState: SetState<IGameState | null>
) {
  const addFirstTimePersuation = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_PERSUATION,
    STAT_FLAGS.IS_FIRST_TIME_PERSUATION
  )

  const hasInitialized = useRef(false)

  const init = useCallback(() => {
    if (!antagonistType) return

    const cards = getCardHand()
    resetGameState()
    resetWrongAnswers()
    const state = setGameState({ cardHand: cards })
    setCurrentState(state)
  }, [antagonistType, setCurrentState])

  useEffect(() => {
    if (!antagonistType || hasInitialized.current) return

    addFirstTimePersuation()
    init()
    hasInitialized.current = true
  }, [antagonistType, addFirstTimePersuation, init])
}
