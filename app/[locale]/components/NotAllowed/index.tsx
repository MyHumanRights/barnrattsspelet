import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { HomeIcon } from '../Icons/HomeIcon'
import { Link } from '../Link/Link'
import styles from './NotAllowed.module.scss'

export const NotAllowed = () => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ y: -2 })

  return (
    <>
      <div
        className={styles.wrapper}
        style={{ backgroundImage: 'url("/images/start/map-large.svg")' }}
      >
        <div className={styles.blurBkgd} />
        <div className={styles.opacityBkgd} />
        <div className={styles.content}>
          <h1>{t('notallowed.title')}</h1>
          <p>{t('notallowed.description1')}</p>
          <p>{t('notallowed.description2')}</p>
          <Link
            variant={ButtonVariant.PRIMARY}
            to='/home'
            onMouseEnter={trigger}
          >
            {t('mainmenu.home')}
            <motion.span animate={animate}>
              <HomeIcon />
            </motion.span>
          </Link>
        </div>
      </div>
    </>
  )
}
