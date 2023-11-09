import React, { useContext, useEffect } from 'react'
import { useAnimation, motion } from 'framer-motion'
import styles from './ChatBubble.module.scss'
import { useOptionsContext } from '@/contexts/OptionsContext'
import scssVariables from '../../_export.module.scss'
import { TextWithVoiceover } from '../../components'

const ChatBubble = ({
  statement,
  arrowRight = true,
  arrowBottomLeft,
  player,
  wrongAnswer = false,
  miniCard,
  cta = null,
}) => {
  const bubbleAnimation = useAnimation()
  const { shouldReduceMotion } = useContext(OptionsContext).options
  const COLOR = player ? '#FFFF' : scssVariables.cornflowerBlue

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
        <img src={miniCard} alt='mini-kort' className={styles.miniCard} />
      )}
      {cta}
    </motion.div>
  )
}

export default ChatBubble
