import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { ICard } from '@/utils/types'
import { setTokens } from '@/api/storage'
import { BoostQuiz } from '../BoostQuiz'
import { Plus } from '../Icons/Plus'
import styles from './Boost.module.scss'

const WIN_AMOUNT = 1

interface Props {
  onModalClose: () => void
  card: ICard
  onCardBoosted: (card: any) => void
}

export const Boost: React.FC<Props> = ({
  onModalClose,
  card,
  onCardBoosted,
}) => {
  const [result, setResult] = useState('')
  const [resultElement, setResultElement] = useState<React.ReactNode>(null)
  const [animate, trigger] = useAnimation({ scale: 1.2 })

  const t = useTranslations()

  const answers = card.quiz.answers.map((answer) => {
    return { ...answer, text: t(`cards.${card.id}.quiz.answers.${answer.id}`) }
  })

  const quiz = {
    ...card.quiz,
    question: t(`cards.${card.id}.quiz.question`),
    infoCorrect: t(`cards.${card.id}.quiz.infocorrect`),
    infoIncorrect: t(`cards.${card.id}.quiz.infoincorrect`),
    answers: answers,
  }

  useEffect(() => {
    ;(async function () {
      if (result === 'win') {
        setTokens(WIN_AMOUNT)
        setResultElement(<p>{quiz.infoCorrect}</p>)
        onCardBoosted(card)
      } else if (result === 'loss') {
        setResultElement(<p>{quiz.infoIncorrect}</p>)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result, quiz.infoCorrect, quiz.infoIncorrect, card])

  return (
    <section className={styles.wrapper}>
      <motion.button
        className={styles.modalClose}
        onClick={onModalClose}
        aria-label={t('close')}
        autoFocus
        onMouseEnter={trigger}
      >
        <motion.span animate={animate} style={{ display: 'block' }}>
          <Plus
            style={{
              width: '2rem',
              height: '2rem',
              transform: 'rotate(45deg)',
            }}
          />
        </motion.span>
      </motion.button>
      <BoostQuiz
        setResult={setResult}
        quiz={quiz}
        resultElement={resultElement}
        onModalClose={onModalClose}
        result={result}
      />
    </section>
  )
}
