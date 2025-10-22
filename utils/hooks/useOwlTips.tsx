import { useEffect, useState } from 'react'

import {
  getShownFlipCardTip,
  getShownTokenTip,
  readWrongAnswers,
  setShownFlipCardTip,
  setShownTokenTip,
} from '@/api/storage'
import { ANSWER_DELAY, OWLS } from '@/utils/constants'

import { useTokens } from './useTokens'

type UseOwlTipsReturn = readonly [
  OWLS | null,
  React.Dispatch<React.SetStateAction<OWLS | null>>
]

export default function useOwlTips(): UseOwlTipsReturn {
  const answeredIncorrectly = readWrongAnswers()
  const [, , ownedTokens] = useTokens()

  const hasShownTokenTip = getShownTokenTip()
  const hasShownFlipCardTip = getShownFlipCardTip()
  const [showOwl, setShowOwl] = useState<OWLS | null>(null)

  useEffect(() => {
    if (!hasShownTokenTip && ownedTokens > 0 && ownedTokens < 3) {
      setShowOwl(OWLS.TOKEN)
      setShownTokenTip(true)
    }
  }, [ownedTokens, hasShownTokenTip])

  useEffect(() => {
    if (answeredIncorrectly === 2 && !hasShownFlipCardTip) {
      const timer = setTimeout(
        () => setShowOwl(OWLS.FLIP_CARD),
        ANSWER_DELAY * 2.5
      )
      setShownFlipCardTip(true)
      return () => clearTimeout(timer)
    }
  }, [answeredIncorrectly, hasShownFlipCardTip])

  return [showOwl, setShowOwl] as const
}
