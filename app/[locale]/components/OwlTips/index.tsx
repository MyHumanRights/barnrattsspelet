import { AnimatePresence, motion } from 'framer-motion'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'

import {
  getShownEnableCardTip,
  getShownTokenTip,
  setShownEnableCardTip,
  setShownTokenTip,
} from '@/api/storage'
import { OWLS } from '@/utils/constants'

import { OwlDialogue } from '../OwlDialogue'
import styles from './OwlTips.module.scss'

type Props = {
  showOwl: OWLS | null
  setShowOwl: Dispatch<SetStateAction<OWLS | null>>
}

export const OwlTips = React.memo(({ showOwl, setShowOwl }: Props) => {
  const [hasShownTokenTip, setHasShownTokenTip] = useState(true)
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
    })()
  }, [])

  return (
    <div aria-live='polite'>
      <AnimatePresence>
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
              setShowSpecificOwl={setShowOwl}
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
              setShowSpecificOwl={setShowOwl}
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
              setShowSpecificOwl={setShowOwl}
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
              setShowSpecificOwl={setShowOwl}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})

OwlTips.displayName = 'OwlTips'
