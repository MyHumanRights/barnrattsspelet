'use client'

import { useTranslations } from 'use-intl'
import { motion } from 'framer-motion'
import { ButtonVariant } from '@/utils/constants'
import { Link } from '../Link/Link'
import styles from './GuidanceButtons.module.scss'
import { DownloadIcon } from '../Icons/DownloadIcon'
import { useAnimation } from '@/utils/hooks/useAnimation'

export const GuidanceButtons = () => {
  const t = useTranslations('Guidance')
  const [animate, trigger] = useAnimation({ y: 2 })
  return (
    <div className={styles.buttons}>
      <a
        className={styles.link}
        href='./pdf/Handledning.pdf'
        download
        //@ts-ignore
        onMouseEnter={trigger}
      >
        {t('downloadguidance')}
        <motion.span animate={animate}>
          <DownloadIcon />
        </motion.span>
      </a>
      <p>{t('or')}</p>
      <Link to='/scenarios' variant={ButtonVariant.SECONDARY}>
        {t('specificScenario')}
      </Link>
    </div>
  )
}
