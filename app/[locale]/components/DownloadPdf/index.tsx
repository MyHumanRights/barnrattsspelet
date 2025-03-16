'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { useAnimation } from '@/utils/hooks/useAnimation'

import { DownloadIcon } from '../Icons/DownloadIcon'
import styles from './DownloadPdf.module.scss'

export const DownloadPdf = () => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ y: 2 })
  return (
    <a
      className={styles.link}
      href='./pdf/Handledning.pdf'
      download
      onMouseEnter={trigger}
    >
      {t('Guidance.downloadguidance')}
      <motion.span animate={animate}>
        <DownloadIcon />
      </motion.span>
    </a>
  )
}
