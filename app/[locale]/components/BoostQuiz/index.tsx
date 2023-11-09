'use client'

import React, { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'
import { motion } from 'framer-motion'
import useSound from 'use-sound'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useAnimation } from '@/utils/hooks/useAnimation'
import winSound from '@/assets/sounds/fx/10-correct-quiz-answer.mp3'
import loseSound from '@/assets/sounds/fx/11-incorrect-quiz-answer.mp3'
import { Button } from '../../components/Button/Button'
import ChevronRight from '../Icons/ChevronRight'
import styles from './BoostQuiz.module.scss'
import { IBoostAnswer, IBoostQuiz } from '@/utils/types'
import { ButtonSize, ButtonVariant } from '@/utils/constants'

interface Props {
  setResult: (result: string) => void
  quiz: IBoostQuiz
  resultElement: React.ReactNode
  onModalClose: () => void
  result: string
}

export const BoostQuiz: React.FC<Props> = ({
  setResult,
  quiz,
  resultElement,
  onModalClose,
  result,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<IBoostAnswer>({
    text: '',
    isCorrect: null,
    id: '',
  })
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ x: 5 })
  const {
    options: { shouldReduceMotion, soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [playWinSound] = useSound(winSound, { volume: effectsVolume })
  const [playLoseSound] = useSound(loseSound, { volume: effectsVolume })
  let timeout = 0

  const correctAnswer = quiz.answers.find((answer) => answer.isCorrect)

  function checkAnswer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (selectedAnswer.isCorrect) {
      setResult('win')
      timeout = window.setTimeout(
        () => {
          soundEffectsOn && playWinSound()
        },
        shouldReduceMotion ? 0 : 550
      )
      return
    }
    setResult('loss')
    timeout = window.setTimeout(
      () => {
        soundEffectsOn && playLoseSound()
      },
      shouldReduceMotion ? 0 : 665
    )
  }

  function renderStyle(answer: IBoostAnswer) {
    let style = styles.option
    if (selectedAnswer.text === answer.text) {
      style += ` ${styles.marked}`
    }
    if (result) {
      style += ` ${styles.disabled}`
    }
    return style
  }

  useEffect(() => {
    return () => {
      clearTimeout(timeout)
    }
  }, [timeout])

  const divVariants = {
    show: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0.1 : 0.4,
        delayChildren: shouldReduceMotion ? 0.1 : 0.8,
      },
    },
    hide: {
      transition: {
        staggerChildren: 0.1,
        staggerDirection: -1,
        delayChildren: 0.4,
      },
    },
    check: {
      padding: 0,
      margin: 0,
      transition: {
        margin: { delay: 0.7, duration: 0.2 },
        padding: { delay: 0.7, duration: 0.2 },
        staggerChildren: 0.2,
        staggerDirection: -1,
      },
    },
  }

  const buttonVariants = {
    show: {
      y: 0,
      opacity: 1,
      height: 'auto',
    },
    hide: {
      y: -20,
      opacity: 0,
      height: '1px',
    },
    check: {
      y: 0,
      x: -40,
      opacity: 0,
      height: '1px',
      padding: 0,
      margin: 0,
      border: '0px',
      transition: {
        height: { delay: 0.7, duration: 0.2 },
        margin: { delay: 0.7, duration: 0.2 },
        padding: { delay: 0.7, duration: 0.2 },
        border: { delay: 0.7, duration: 0.2 },
      },
    },
  }

  return (
    <article className={styles.wrapper}>
      <form action='' onSubmit={checkAnswer}>
        <div className={styles.quiz}>
          <h1>{quiz.question}</h1>
          {((shouldReduceMotion && !result) || !shouldReduceMotion) && (
            <motion.div
              className={styles.answers}
              variants={divVariants}
              initial='hide'
              animate={result ? 'check' : 'show'}
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
                    type='radio'
                    name='answer'
                    id={answer.text}
                    value={answer.text}
                    checked={selectedAnswer?.text === answer.text}
                  />
                </motion.label>
              ))}
            </motion.div>
          )}
          {result && (
            <div className={styles.answers}>
              <motion.p
                className={renderStyle(correctAnswer as IBoostAnswer)}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: 1,
                  scale: shouldReduceMotion ? 1 : [0.4, 0.7, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  opacity: {
                    duration: shouldReduceMotion ? 0.1 : 1,
                    delay: shouldReduceMotion ? 0 : 1,
                  },
                  scale: {
                    duration: shouldReduceMotion ? 0 : 1,
                    delay: shouldReduceMotion ? 0 : 1,
                  },
                }}
              >
                {correctAnswer!.text}
              </motion.p>
              <motion.div
                className={styles.result}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: shouldReduceMotion ? 0.1 : 1,
                  delay: shouldReduceMotion ? 0 : 1.4,
                }}
              >
                {resultElement}
              </motion.div>
            </div>
          )}
        </div>
        {result ? (
          <Button type='button' onClick={onModalClose} size={ButtonSize.LARGE}>
            {t('common:confirm')}
          </Button>
        ) : (
          <Button
            variant={ButtonVariant.PRIMARY}
            size={ButtonSize.LARGE}
            type='submit'
            disabled={!selectedAnswer}
            onMouseEnter={trigger}
          >
            {t('common:boost:answer')}
            <motion.span animate={animate}>
              <ChevronRight />
            </motion.span>
          </Button>
        )}
      </form>
    </article>
  )
}
