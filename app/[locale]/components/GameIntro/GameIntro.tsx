import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

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

  const key = `antagonists.${antagonist}.intro.body1`
  const hasBody1 = t.has(key)

  const key2 = `antagonists.${antagonist}.intro.body2`

  // Only render body2 if the translation exists
  const hasBody2 = t.has(key2)

  useEffect(() => {
    if (showModal && !hasBody1) {
      buttonRef.current?.click()
    }
  }, [showModal, hasBody1])

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
        {hasBody2 && (
          <p>
            <TextWithVoiceover
              textKey={`antagonists.${antagonist}.intro.body2`}
            />
          </p>
        )}
        <Button ref={buttonRef} onClick={handleIntro}>
          {t('play')}
        </Button>
      </div>
    </Modal>
  )
}
