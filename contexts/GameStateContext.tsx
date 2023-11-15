'use client'

import { createContext, useContext, useState } from 'react'

interface Props {
  isByingLootbox: boolean
  setIsByingLootbox: React.Dispatch<React.SetStateAction<boolean>>
  allowedLootbox: boolean
  setAllowedLootbox: React.Dispatch<React.SetStateAction<boolean>>
  activeAntagonist: string
  setActiveAntagonist: React.Dispatch<React.SetStateAction<string>>
  gameEnvironment: string
  setGameEnvironment: React.Dispatch<React.SetStateAction<string>>
}

const GameStateContext = createContext<Props>({} as Props)

export const GameStateProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isByingLootbox, setIsByingLootbox] = useState<boolean>(false)
  const [allowedLootbox, setAllowedLootbox] = useState<boolean>(false)
  const [activeAntagonist, setActiveAntagonist] = useState<string>('')
  const [gameEnvironment, setGameEnvironment] = useState<string>('')

  return (
    <GameStateContext.Provider
      value={{
        isByingLootbox,
        setIsByingLootbox,
        allowedLootbox,
        setAllowedLootbox,
        activeAntagonist,
        setActiveAntagonist,
        gameEnvironment,
        setGameEnvironment,
      }}
    >
      {children}
    </GameStateContext.Provider>
  )
}

export const useGameStateContext = () => useContext(GameStateContext)
