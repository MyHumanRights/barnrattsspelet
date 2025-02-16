import { motion, useAnimation } from 'motion/react'
import Image from 'next/image'
import { useEffect } from 'react'

import { useOptionsContext } from '@/contexts/OptionsContext'

import { TextWithVoiceover } from '../TextWithVoiceover'
import styles from './ChatBubble.module.scss'

interface Props {
  statement: string
  arrowRight?: boolean
  arrowBottomLeft?: boolean
  player?: boolean
  wrongAnswer?: boolean
  miniCard?: string | null
  cta?: React.ReactNode
}

export const ChatBubble: React.FC<Props> = ({
  statement,
  arrowRight = true,
  arrowBottomLeft,
  player,
  wrongAnswer = false,
  miniCard,
  cta = null,
}) => {
  const bubbleAnimation = useAnimation()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()
  const COLOR = player ? '#FFFF' : '#26293f'

  useEffect(() => {
    bubbleAnimation.start(() => ({
      opacity: [0, 1],
      scale: shouldReduceMotion ? 1 : [0.4, 1, 1.1, 1],
    }))
  }, [statement, bubbleAnimation, shouldReduceMotion])

  if (!statement) {
    return null
  }

  return (
    <motion.div
      className={`
        ${styles.bubble}
        ${wrongAnswer ? styles.wrongAnswer : ''}
        ${player ? styles.player : ''}
        ${!player && arrowRight ? styles.arrowRight : ''}
        ${!player && !arrowRight ? styles.arrowLeft : ''}
        ${player && arrowRight && !arrowBottomLeft ? styles.arrowLeft : ''}
        ${player && !arrowRight && !arrowBottomLeft ? styles.arrowRight : ''}
        ${arrowBottomLeft ? styles.arrowBottomLeft : ''}
        ${!!cta && styles.withCta}
      `}
      initial={{ opacity: 0 }}
      animate={bubbleAnimation}
    >
      <motion.p aria-live='assertive'>
        <TextWithVoiceover textKey={statement} color={COLOR} />
      </motion.p>
      {miniCard && (
        <Image
          height={50}
          width={33}
          src={miniCard}
          alt='mini-kort'
          className={styles.miniCard}
        />
      )}
      {cta}
    </motion.div>
  )
}

export default ChatBubble
