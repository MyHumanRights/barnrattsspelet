import { useTranslations } from 'next-intl'

import { ButtonSize, ButtonVariant } from '@/utils/constants'

import { Button } from '../Button'
import styles from './MobileWarning.module.scss'

interface Props {
  handleClick: () => void
}

export const MobileWarning: React.FC<Props> = ({ handleClick }) => {
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
