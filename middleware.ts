import createMiddleware from 'next-intl/middleware'
import { NextRequest } from 'next/server'

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['sv'],

  // If this locale is matched, pathnames work without a prefix (e.g. `/about`)
  defaultLocale: 'sv',
})

export const config = {
  // Skip all paths that should not be internationalized. This example skips
  // certain folders and all pathnames with a dot (e.g. favicon.ico)
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
