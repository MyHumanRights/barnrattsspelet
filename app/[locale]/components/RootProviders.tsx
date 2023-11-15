import { OptionsProvider } from '@/contexts/OptionsContext'
import { GameStateProvider } from '@/contexts/GameStateContext'
import { StatsProvider } from '@/contexts/StatsContext'

const RootProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <OptionsProvider>
      <GameStateProvider>
        <StatsProvider>{children}</StatsProvider>
      </GameStateProvider>
    </OptionsProvider>
  )
}

export default RootProviders
