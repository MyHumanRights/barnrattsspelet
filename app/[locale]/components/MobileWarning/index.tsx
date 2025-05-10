import { useTranslations } from 'next-intl'

import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import styles from './MobileWarning.module.scss'

type MobileWarningProps = {
  handleClick: () => void
}

export const MobileWarning = ({ handleClick }: MobileWarningProps) => {
  const t = useTranslations()
  return (
    <div className={styles.wrapper}>
      <p>{t('mobilewarning.text')}</p>
      <Button
        onClick={handleClick}
        variant={ButtonVariant.SECONDARY}
        size={ButtonSize.SMALL}
        style={{ margin: '1rem auto 0 auto' }}
      >
        {t('confirm')}
      </Button>
    </div>
  )
}
