import { createContext, useContext, useState } from 'react'
import { STAT_FLAGS } from '../utils/constants'

const StatsContext = createContext<any | undefined>(undefined)

export const StatsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [statFlags, setStatFlags] = useState({
    [STAT_FLAGS.IS_FIRST_TIME_START]: true,
    [STAT_FLAGS.IS_FIRST_TIME_HOME]: true,
    [STAT_FLAGS.IS_FIRST_TIME_WIN]: true,
    [STAT_FLAGS.IS_FIRST_TIME_WIN_THREE]: true,
    [STAT_FLAGS.IS_FIRST_TIME_WIN_TEN]: true,
    [STAT_FLAGS.IS_FIRST_TIME_WIN_GAME_COMPLETE]: true,
    [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEWER]: true,
    [STAT_FLAGS.IS_FIRST_TIME_COLLECTION_VIEW_APP]: true,
    [STAT_FLAGS.IS_FIRST_TIME_PERSUATION]: true,
  })

  return (
    <StatsContext.Provider value={{ statFlags, setStatFlags }}>
      {children}
    </StatsContext.Provider>
  )
}

export const useStatsContext = () => useContext(StatsContext)
