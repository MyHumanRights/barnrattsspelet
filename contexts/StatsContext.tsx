'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { STAT_FLAGS } from '../utils/constants'

const STORAGE_KEY = 'statsFlags-v1'

type Flags = { [key in STAT_FLAGS]: boolean }

type StatsContextProps = {
  statFlags: Flags
  setStatFlags: React.Dispatch<React.SetStateAction<Flags>>
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
  const defaultFlags = useMemo<Flags>(
    () => ({
      [STAT_FLAGS.IS_FIRST_TIME_START]: true,
      [STAT_FLAGS.IS_FIRST_TIME_HOME]: true,
      [STAT_FLAGS.IS_FIRST_TIME_WIN]: true,
      [STAT_FLAGS.IS_FIRST_TIME_WIN_THREE]: true,
      [STAT_FLAGS.IS_FIRST_TIME_WIN_TEN]: true,
      [STAT_FLAGS.IS_FIRST_TIME_WIN_GAME_COMPLETE]: true,
      [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEWER]: true,
      [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEW_APP]: true,
      [STAT_FLAGS.IS_FIRST_TIME_PERSUATION]: true,
    }),
    []
  )

  const [statFlags, setStatFlags] = useState<Flags>(() =>
    loadInitialFlags(defaultFlags, STORAGE_KEY)
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statFlags))
    } catch {
      /* ignore */
    }
  }, [statFlags])

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY || !e.newValue) return
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

  return (
    <StatsContext.Provider value={{ statFlags, setStatFlags }}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStatsContext = () => useContext(StatsContext)
