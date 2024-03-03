import { useTranslations } from 'next-intl'

import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Link } from '../Link/Link'
import styles from './HelpBox.module.scss'

export const HelpBox = () => {
  const t = useTranslations()
  return (
    <div className={styles.box}>
      <h2>{t('home.moreinfoheading')}</h2>
      <p>{t('home.moreinfotext')}</p>
      <Link
        to='/help'
        variant={ButtonVariant.PRIMARY}
        size={ButtonSize.MEDIUM}
        aria-label={t('readmoreonhelp')}
      >
        {t('readmore')}
      </Link>
    </div>
  )
}
