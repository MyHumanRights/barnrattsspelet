'use client'
import { createContext, useContext, useEffect, useState } from 'react'

import { STAT_FLAGS, STAT_STORAGE_KEY } from '../utils/constants'

type Flags = { [key in STAT_FLAGS]: boolean }

type StatsContextProps = {
  statFlags: Flags
  setStatFlags: React.Dispatch<React.SetStateAction<Flags>>
  resetStatFlags: () => void
}

const DEFAULT_FLAGS: Flags = {
  [STAT_FLAGS.IS_FIRST_TIME_START]: true,
  [STAT_FLAGS.IS_FIRST_TIME_HOME]: true,
  [STAT_FLAGS.IS_FIRST_TIME_WIN]: true,
  [STAT_FLAGS.IS_FIRST_TIME_WIN_THREE]: true,
  [STAT_FLAGS.IS_FIRST_TIME_WIN_TEN]: true,
  [STAT_FLAGS.IS_FIRST_TIME_WIN_GAME_COMPLETE]: true,
  [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEWER]: true,
  [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEW_APP]: true,
  [STAT_FLAGS.IS_FIRST_TIME_PERSUATION]: true,
  [STAT_FLAGS.SHOULD_TRACK_DEVICE]: true,
}

const StatsContext = createContext<StatsContextProps>({} as StatsContextProps)

const loadInitialFlags = (defaultFlags: Flags, key: string): Flags => {
  try {
    const raw = localStorage.getItem(key)
    if (!raw) return defaultFlags
    const parsed = JSON.parse(raw) as Partial<Flags>
    return { ...defaultFlags, ...parsed }
  } catch {
    return defaultFlags
  }
}

export const StatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [statFlags, setStatFlags] = useState<Flags>(() =>
    loadInitialFlags(DEFAULT_FLAGS, STAT_STORAGE_KEY)
  )

  useEffect(() => {
    try {
      localStorage.setItem(STAT_STORAGE_KEY, JSON.stringify(statFlags))
    } catch {
      /* ignore */
    }
  }, [statFlags])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STAT_STORAGE_KEY || !e.newValue) return
      try {
        const next = JSON.parse(e.newValue) as Partial<Flags>
        // Merge to keep any new keys that might not be present
        setStatFlags((prev) => ({ ...prev, ...next }))
      } catch {
        /* ignore */
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const resetStatFlags = () => {
    // Re-enable all flags (treat user as first time again)
    setStatFlags(DEFAULT_FLAGS)
  }

  return (
    <StatsContext.Provider value={{ statFlags, setStatFlags, resetStatFlags }}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStatsContext = () => useContext(StatsContext)
