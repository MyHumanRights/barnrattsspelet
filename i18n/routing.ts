import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['sv'],
  defaultLocale: 'sv',
  pathnames: {
    '/': '/',
    '/avatar-builder': { sv: '/min-avatar' },
    '/collection-viewer': { sv: '/alla-rattigheter' },
    '/cookie-policy': {
      sv: '/integritetspolicy',
    },
    '/deck-builder': { sv: '/kortsamling' },
    '/guidance': {
      sv: '/handledning',
    },
    '/help': {
      sv: '/hjalp',
    },
    '/home': {
      sv: '/hem',
    },
    '/loot-box': '/loot-box',
    '/manual': '/manual',
    '/persuade': { sv: '/utmaning' },
    '/scenarios': {
      sv: '/scenarier',
    },
    '/stats': '/stats',
  },
})

export type AppPathnames = keyof typeof routing.pathnames
export type Locale = (typeof routing.locales)[number]
