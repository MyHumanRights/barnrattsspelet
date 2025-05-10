import { Metadata } from 'next'

import pkg from '../../../package.json'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Barns rättigheter - Hälsa',
    description: 'Barns rättigheter',
  }
}

const Health = () => {
  return (
    <div
      style={{
        padding: '20px',
      }}
    >
      <h1>Health</h1>
      <p>Name: {pkg.name}</p>
      <p>Version: {pkg.version}</p>
    </div>
  )
}

export default Health
