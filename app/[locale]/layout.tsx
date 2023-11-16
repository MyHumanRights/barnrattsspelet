import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { NextIntlClientProvider } from 'next-intl'
import { Quicksand, Bangers } from 'next/font/google'
import RootProviders from './components/RootProviders'
import { Settings } from './components/Settings'
import { getAvatarColors, getAvatarParts } from '@/utils/getData'
import { IAvatarColors, IAvatarParts } from '@/utils/types'
import 'react-loading-skeleton/dist/skeleton.css'
import styles from './layout.module.scss'
import '../global.scss'
import '../index.scss'

const quicksand = Quicksand({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-quicksand',
})
const bangers = Bangers({
  subsets: ['latin'],
  variable: '--font-bangers',
  display: 'swap',
  weight: '400',
})

const locales = ['sv']

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

const RootLayout = async ({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) => {
  // Validate that the incoming `locale` parameter is valid
  const isValidLocale = locales.some((cur) => cur === locale)
  const timeZone = 'Europe/Stockholm'
  if (!isValidLocale) notFound()

  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }

  const avatarParts: IAvatarParts = await getAvatarParts()
  const avatarColors: IAvatarColors = await getAvatarColors()

  return (
    <html lang={locale}>
      <body className={`${quicksand.variable} ${bangers.variable}`}>
        <div
          className={styles.App}
          // style={{ height: height }}
        >
          <div className={styles.wrapper}>
            <RootProviders>
              <NextIntlClientProvider
                locale={locale}
                timeZone={timeZone}
                messages={messages}
              >
                <Settings
                  defaultAvatarParts={avatarParts}
                  avatarColors={avatarColors}
                />
                {children}
              </NextIntlClientProvider>
            </RootProviders>
          </div>
        </div>
        <div id='modal'></div>
      </body>
    </html>
  )
}

export default RootLayout
