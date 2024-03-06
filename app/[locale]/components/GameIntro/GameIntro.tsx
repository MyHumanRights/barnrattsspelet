import { useTranslations } from 'next-intl'

import { Antagonist } from '@/utils/antagonistType'

import { Button } from '../Button'
import Modal from '../Modal'
import styles from './GameIntro.module.scss'

type Props = {
  antagonist: Antagonist
  showModal: boolean
  handleIntro: () => void
}

export const GameIntro = ({ antagonist, showModal, handleIntro }: Props) => {
  const t = useTranslations()

  if (!showModal) {
    return null
  }

  return (
    <Modal onModalClose={handleIntro}>
      <div className={styles.wrapper}>
        <h1>{t(`antagonists.${antagonist}.intro.title`)}</h1>
        <p>{t(`antagonists.${antagonist}.intro.body1`)}</p>
        <p>{t(`antagonists.${antagonist}.intro.body2`)}</p>
        <Button onClick={handleIntro}>{t('play')}</Button>
      </div>
    </Modal>
  )
}
