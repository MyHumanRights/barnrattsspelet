import { OptionsProvider } from '@/contexts/OptionsContext'
import { StatsProvider } from '@/contexts/StatsContext'

const RootProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <OptionsProvider>
      <StatsProvider>{children}</StatsProvider>
    </OptionsProvider>
  )
}

export default RootProviders
