import Image from 'next/image'
import { useTranslations } from 'next-intl'

import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Link } from '../Link/Link'
import styles from './Footer.module.scss'

export const Footer: React.FC = () => {
  const t = useTranslations('Start')
  return (
    <footer className={styles.footer}>
      <div className={styles.leftCol}>
        <Link
          variant={ButtonVariant.SIMPLE}
          size={ButtonSize.SMALL}
          to='/cookie-policy'
        >
          {t('cookiepolicy')}
        </Link>
      </div>
      <div>
        <a href='https://www.arvsfonden.se/' target='_blank' rel='noreferrer'>
          <Image
            src='/images/arvsfonden-logo.png'
            alt={t('arvsfondenlogoalttext')}
            width='206'
            height='50'
            className={styles.arvsfondenLogo}
          />
        </a>
        <a href='https://myhumanrights.se/' target='_blank' rel='noreferrer'>
          <Image
            src={`/images/mhr-logo.png`}
            alt={t('logoalttext')}
            width='78'
            height='50'
            className={styles.mhrLogo}
          />
        </a>
      </div>
    </footer>
  )
}

export default Footer
