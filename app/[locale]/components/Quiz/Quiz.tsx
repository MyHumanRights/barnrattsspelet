import { set } from 'firebase/database'
import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { FormEvent, ReactNode, useEffect, useState } from 'react'
import useSound from 'use-sound'

import winSound from '@/assets/sounds/fx/10-correct-quiz-answer.mp3'
import loseSound from '@/assets/sounds/fx/11-incorrect-quiz-answer.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { IBoostAnswer, ICard } from '@/utils/types'

import { Button } from '../Button'
import { CloseButton } from '../CloseButton'
import { ChevronRight } from '../Icons/ChevronRight'
import Modal from '../Modal'
import { buttonVariants, divVariants } from './animations'
import styles from './Quiz.module.scss'

type Props = {
  onAnswer: (isCorrect: boolean) => void
  card: ICard
  onModalClose: () => void
}

export const Quiz = ({ onAnswer, card, onModalClose }: Props) => {
  const t = useTranslations()
  const {
    options: { shouldReduceMotion, soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [animate, trigger] = useAnimation({ x: 5 })
  const [result, setResult] = useState('')
  const [error, setError] = useState(false)
  const [resultElement, setResultElement] = useState<ReactNode>(null)
  const [selectedAnswer, setSelectedAnswer] = useState<IBoostAnswer | null>(
    null
  )
  const [playWinSound] = useSound(winSound, { volume: effectsVolume })
  const [playLoseSound] = useSound(loseSound, { volume: effectsVolume })

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

  const renderStyle = (answer: IBoostAnswer) => {
    let style = styles.option
    if (selectedAnswer?.text === answer.text) {
      style += ` ${styles.marked}`
    }
    if (result) {
      style += ` ${styles.disabled}`
    }
    return style
  }

  const checkAnswer = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!selectedAnswer) {
      setError(true)
      return
    }

    if (selectedAnswer?.isCorrect) {
      setResult('win')
      setResultElement(<p>{quiz.infoCorrect}</p>)

      soundEffectsOn && playWinSound()
      // Notify the parent component about the answer
      return
    }
    setResult('loss')
    setResultElement(<p>{quiz.infoIncorrect}</p>)
    soundEffectsOn && playLoseSound()
  }

  const Div = shouldReduceMotion ? 'div' : motion.div
  const correctAnswer = quiz.answers.find((answer) => answer.isCorrect)

  return (
    <Modal onModalClose={onModalClose}>
      <div className={styles.wrapper}>
        <CloseButton onClick={onModalClose} />
        <article className={styles.quizWrapper}>
          <form onSubmit={checkAnswer}>
            <div className={styles.quiz}>
              <h1>{quiz.question}</h1>
              {!result ? (
                <Div
                  className={styles.answers}
                  variants={divVariants}
                  initial='hide'
                  animate={'show'}
                  exit='hide'
                >
                  {quiz.answers.map((answer) => (
                    <motion.label
                      variants={buttonVariants}
                      key={answer.text}
                      className={renderStyle(answer)}
                      htmlFor={answer.text}
                    >
                      {answer.text}
                      <input
                        className='sr-only'
                        onChange={() => setSelectedAnswer(answer)}
                        onBlur={() => setError(false)}
                        type='radio'
                        name='answer'
                        id={answer.text}
                        value={answer.text}
                        checked={selectedAnswer?.text === answer.text}
                      />
                    </motion.label>
                  ))}
                </Div>
              ) : (
                <div className={styles.answers}>
                  <motion.p
                    className={renderStyle(correctAnswer as IBoostAnswer)}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: 1,
                      scale: shouldReduceMotion
                        ? 1
                        : [0.4, 0.7, 1.1, 1, 1.1, 1],
                    }}
                    transition={{
                      opacity: {
                        duration: shouldReduceMotion ? 0.1 : 0.5,
                      },
                      scale: {
                        duration: shouldReduceMotion ? 0.1 : 0.5,
                      },
                    }}
                  >
                    {correctAnswer?.text}
                  </motion.p>
                  <motion.div
                    className={styles.result}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: shouldReduceMotion ? 0.1 : 0.5,
                      delay: shouldReduceMotion ? 0.1 : 0.4,
                    }}
                  >
                    {resultElement}
                  </motion.div>
                </div>
              )}
            </div>
            {error && (
              <p className={styles.error} role='alert' aria-live='assertive'>
                {t('error.chooseOne')}
              </p>
            )}

            {result ? (
              <Button
                type='button'
                onClick={() => onAnswer(result === 'win')}
                size={ButtonSize.LARGE}
              >
                {t('confirm')}
              </Button>
            ) : (
              <Button
                variant={ButtonVariant.PRIMARY}
                size={ButtonSize.LARGE}
                type='submit'
                onMouseEnter={trigger}
              >
                {t('boost.answer')}
                <motion.span animate={animate}>
                  <ChevronRight />
                </motion.span>
              </Button>
            )}
          </form>
        </article>
      </div>
    </Modal>
  )
}
