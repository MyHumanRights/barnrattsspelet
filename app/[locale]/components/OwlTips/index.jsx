import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'

import {
  getFirstTimePlaying,
  getShownEnableCardTip,
  getShownTokenTip,
  setShownEnableCardTip,
  setShownTokenTip,
} from '@/api/storage'
import { OWLS } from '@/utils/constants'

import { OwlDialogue } from '../OwlDialogue'
import styles from './OwlTips.module.scss'

export const OwlTips = React.memo(({ showOwl, setShowOwl }) => {
  const [firstTimer, setFirstTimer] = useState()
  const [hasShownTokenTip, setHasShownTokenTip] = useState(true)
  const [hasShownIntroOwl, setHasShownIntroOwl] = useState(false)
  const [hasShownEnableCardTip, setHasShownEnableCardTip] = useState(false)

  function onHideTokenTip() {
    setHasShownTokenTip(true)
    setShownTokenTip(true)
  }

  useEffect(() => {
    ;(async function () {
      const shownTokenTip = await getShownTokenTip()
      const shownEnableCardTip = await getShownEnableCardTip()
      setHasShownEnableCardTip(shownEnableCardTip)
      setHasShownTokenTip(shownTokenTip)
      const firstTimePlaying = await getFirstTimePlaying()
      setFirstTimer(firstTimePlaying)
    })()
  }, [])

  return (
    <div aria-live='polite'>
      <AnimatePresence>
        {showOwl === OWLS.INTRO && !hasShownIntroOwl && firstTimer && (
          <motion.div
            className={styles.introOwlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.intro.heading'
              body='Owl.intro.body'
              setShowOwl={setShowOwl}
              setHasShownOwlTip={setHasShownIntroOwl}
            />
          </motion.div>
        )}

        {!hasShownEnableCardTip && showOwl === OWLS.ENABLE_CARD && (
          <motion.div
            className={styles.enableOwlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.enablecard.heading'
              body='Owl.enablecard.body'
              setShowOwl={setShowOwl}
              onClick={() => setShownEnableCardTip(true)}
            />
          </motion.div>
        )}

        {!hasShownTokenTip && showOwl === OWLS.TOKEN && (
          <motion.div
            className={styles.quizOwlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.token.heading'
              body='Owl.token.body'
              setShowOwl={setShowOwl}
              setHasShownOwlTip={onHideTokenTip}
            />
          </motion.div>
        )}

        {showOwl === OWLS.QUIZ && (
          <motion.div
            className={styles.quizOwlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.quiztip.heading'
              body='Owl.quiztip.body'
              setShowOwl={setShowOwl}
            />
          </motion.div>
        )}

        {showOwl === OWLS.FLIP_CARD && (
          <motion.div
            className={styles.enableOwlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading='Owl.flipcardtip.heading'
              body='Owl.flipcardtip.body'
              setShowOwl={setShowOwl}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

OwlTips.displayName = 'OwlTips'
