import * as React from 'react'

import { OptionsProvider } from '../../../contexts/OptionsContext'

const RootProviders: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <OptionsProvider>{children}</OptionsProvider>
}

export default RootProviders
