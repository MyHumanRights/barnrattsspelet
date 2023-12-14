import { CardsProvider } from '@/contexts/CardsContext'
import { OptionsProvider } from '@/contexts/OptionsContext'
import { StatsProvider } from '@/contexts/StatsContext'

const RootProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <OptionsProvider>
      <CardsProvider>
        <StatsProvider>{children}</StatsProvider>
      </CardsProvider>
    </OptionsProvider>
  )
}

export default RootProviders
