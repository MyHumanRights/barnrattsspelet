'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { STAT_FLAGS } from '../utils/constants'

interface Props {
  statFlags: {
    [key in STAT_FLAGS]: boolean
  }
  setStatFlags: React.Dispatch<
    React.SetStateAction<{
      [key in STAT_FLAGS]: boolean
    }>
  >
}

const StatsContext = createContext<Props>({} as Props)

export const StatsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const STORAGE_KEY = 'statsFlags-v1'

  const defaultFlags = useMemo(
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

  const [statFlags, setStatFlags] = useState(() => {
    try {
      const raw =
        typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)
      if (!raw) return defaultFlags
      const parsed = JSON.parse(raw) as Record<STAT_FLAGS, boolean>
      // Ensure all keys exist, defaulting to true if missing
      return { ...defaultFlags, ...parsed }
    } catch {
      return defaultFlags
    }
  })

  // Persist to localStorage whenever flags change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(statFlags))
    } catch {
      // ignore storage errors
    }
  }, [STORAGE_KEY, statFlags])

  // Cross-tab sync: listen to storage events
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const next = JSON.parse(e.newValue) as Record<STAT_FLAGS, boolean>
          // Merge to keep any new keys that might not be present
          setStatFlags((prev) => ({ ...prev, ...next }))
        } catch {
          // ignore
        }
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [STORAGE_KEY])

  return (
    <StatsContext.Provider value={{ statFlags, setStatFlags }}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStatsContext = () => useContext(StatsContext)
