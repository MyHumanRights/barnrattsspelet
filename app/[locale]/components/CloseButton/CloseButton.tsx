import { useTranslations } from 'next-intl'

import { Close } from '../Icons/Close'
import styles from './CloseButton.module.scss'

type Props = {
  onClick: () => void
}

export const CloseButton = ({ onClick }: Props) => {
  const t = useTranslations()

  return (
    <button
      onClick={onClick}
      className={styles.closeButton}
      autoFocus
      aria-label={t('close')}
    >
      <Close />
    </button>
  )
}
