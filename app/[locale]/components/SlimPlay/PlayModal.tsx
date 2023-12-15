import { useTranslations } from 'next-intl'

import { Close } from '../Icons/Close'
import styles from './SlimPlay.module.scss'

interface Props {
  handleModal: () => void
}

export const PlayModal = ({ handleModal }: Props) => {
  const t = useTranslations()
  return (
    <div className={styles.wrapper}>
      <button
        onClick={handleModal}
        className={styles.closeButton}
        autoFocus
        aria-label={t('close')}
      >
        <Close />
      </button>
    </div>
  )
}
