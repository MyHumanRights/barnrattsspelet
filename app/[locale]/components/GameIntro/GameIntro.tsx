import { useTranslations } from 'next-intl'
import { useRef } from 'react'
import { start } from 'repl'

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
  const buttonRef = useRef<HTMLButtonElement>(null)

  if (!showModal) {
    return null
  }

  const key = `antagonists.${antagonist}.intro.body1`
  const message = t(key)

  if (message === key) {
    buttonRef.current?.click()
  }

  return (
    <Modal onModalClose={handleIntro}>
      <div className={styles.wrapper}>
        <p>
          <TextWithVoiceover
            textKey={`antagonists.${antagonist}.intro.body1`}
          />
        </p>
        <Button ref={buttonRef} onClick={handleIntro}>
          {t('play')}
        </Button>
      </div>
    </Modal>
  )
}
