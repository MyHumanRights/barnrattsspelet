'use client'

import { useEffect, useState } from 'react'

import { readGameStateValue } from '@/api/storage'
import antagonists from '@/data/antagonists.json'
import type { Antagonist as AntagonistType } from '@/utils/antagonistType'
import type { IGameAntagonist } from '@/utils/types'

type UseAntagonistReturn = {
  antagonist: IGameAntagonist | null
  antagonistType: AntagonistType | null
  isLoading: boolean
  error: Error | null
}

export const useAntagonist = (): UseAntagonistReturn => {
  const [antagonistType, setAntagonistType] = useState<AntagonistType | null>(
    null
  )
  const [antagonist, setAntagonist] = useState<IGameAntagonist | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    try {
      setIsLoading(true)
      const gameStateAntagonist = readGameStateValue('activeAntagonist')

      if (!gameStateAntagonist) {
        throw new Error('No active antagonist found in game state')
      }

      setAntagonistType(gameStateAntagonist)

      if (!antagonists[gameStateAntagonist]) {
        throw new Error(`Antagonist data not found for: ${gameStateAntagonist}`)
      }

      setAntagonist(antagonists[gameStateAntagonist] as IGameAntagonist)
    } catch (err) {
      console.error('Failed to load antagonist:', err)
      setError(
        err instanceof Error
          ? err
          : new Error('Unknown error loading antagonist')
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { antagonist, antagonistType, isLoading, error }
}
