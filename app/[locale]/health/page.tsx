import { Metadata } from 'next'
import { setRequestLocale } from 'next-intl/server'

import { LocaleParams } from '@/utils/types'

import pkg from '../../../package.json'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Barns rättigheter - Hälsa',
    description: 'Barns rättigheter',
  }
}

const Health = async (props: LocaleParams) => {
  const params = await props.params;

  const {
    locale
  } = params;

  setRequestLocale(locale)
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
