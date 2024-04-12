import { useTranslations } from 'next-intl'

import { Antagonist } from '@/utils/antagonistType'

import { Button } from '../Button'
import Modal from '../Modal'
import { TextWithVoiceover } from '../TextWithVoiceover'
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
        <p>
          <TextWithVoiceover
            textKey={`antagonists.${antagonist}.intro.body1`}
          />
        </p>
        <Button onClick={handleIntro}>{t('play')}</Button>
      </div>
    </Modal>
  )
}
