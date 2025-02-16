import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'

import { useAnimation } from '@/utils/hooks/useAnimation'

import { Close } from '../Icons/Close'
import styles from './CloseButton.module.scss'

type Props = {
  onClick: () => void
}

export const CloseButton = ({ onClick }: Props) => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ rotation: 20 })

  return (
    <button
      onClick={onClick}
      className={styles.closeButton}
      autoFocus
      aria-label={t('close')}
      onMouseEnter={trigger}
    >
      <motion.span animate={animate}>
        <Close />
      </motion.span>
    </button>
  )
}
