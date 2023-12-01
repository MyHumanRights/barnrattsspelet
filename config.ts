import { Pathnames } from 'next-intl/navigation'

export const locales = ['sv'] as const

export const pathnames = {
  '/': '/',
  '/avatar-builder': '/avatar-builder',
  '/collection-viewer': '/collection-viewer',
  '/cookie-policy': '/cookie-policy',
  '/deck-builder': '/deck-builder',
  '/guidance': '/guidance',
  '/help': '/help',
  '/home': '/home',
  '/loot-box': '/loot-box',
  '/manual': '/manual',
  '/persuade': '/persuade',
  '/scenarios': '/scenarios',
  '/stats': '/stats',
} satisfies Pathnames<typeof locales>

// Use the default: `always`
export const localePrefix = undefined

export type AppPathnames = keyof typeof pathnames
