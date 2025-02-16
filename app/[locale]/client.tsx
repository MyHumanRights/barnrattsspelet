'use client'

import { AnimatePresence, motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import {
  getCardCollection,
  setCardHand,
  setPlayFromScenario,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import {
  ButtonSize,
  STAT_COLLECTION_NAMES,
  STAT_FLAGS,
} from '@/utils/constants'
import { ButtonVariant } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { ChatBubbleSimple } from './components/ChatBubble/ChatBubbleSimple'
import { ArrowRight } from './components/Icons/ArrowRight'
import { Link } from './components/Link/Link'
import { MobileWarning } from './components/MobileWarning'
import { Modal } from './components/Modal'
import { OwlDialogue } from './components/OwlDialogue'
import styles from './page.module.scss'

const TIME = 10000

export const Client = () => {
  const t = useTranslations('Start')

  const {
    options: { shouldReduceMotion },
    toggleThemeSound,
    isMobile,
  } = useOptionsContext()
  const [firstTimer, setFirstTimer] = useState(true)
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [showModal, setShowModal] = useState(isMobile)

  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  const addToStatistics = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_START,
    STAT_FLAGS.IS_FIRST_TIME_START
  )

  useEffect(() => {
    setShowModal(isMobile)
  }, [isMobile])

  useEffect(() => {
    toggleThemeSound(false)
  }, [toggleThemeSound])

  useEffect(() => {
    ;(async function () {
      await setPlayFromScenario(false)
      await setCardHand([])
    })()
  }, [])

  useEffect(() => {
    ;(async function () {
      const cardCollection = (await getCardCollection()) || []
      cardCollection?.length > 0 ? setFirstTimer(false) : setFirstTimer(true)
    })()
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOwlTip(true)
    }, TIME)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    addToStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleModal = () => {
    setShowModal(!showModal)
    document.querySelector('html')?.classList.toggle('scroll-lock')
  }

  return (
    <>
      {showModal && (
        <Modal onModalClose={handleModal}>
          <MobileWarning handleClick={handleModal} />
        </Modal>
      )}
      <div aria-live='polite'>
        <AnimatePresence>
          {showOwlTip && !isMobile && (
            <motion.div
              className={styles.owlWrapper}
              initial={{ scale: 0 }}
              animate={{
                scale: 1,
                transition: {
                  type: shouldReduceMotion ? 'tween' : 'spring',
                },
              }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <OwlDialogue
                body='Owl.startplaytip.body'
                setShowOwl={setShowOwlTip}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <nav className={styles.menu} aria-label={t('primaryMenu')}>
        <ChatBubbleSimple>
          <h1 className={styles.heading}>{t('heading')}</h1>
          <div className={styles.chatBubbleContent}>
            <div>
              <p className={styles.text}>{t('descriptionOne')}</p>
              <p className={styles.text}>{t('descriptionTwo')}</p>
            </div>
            <div>
              <Link
                to={firstTimer ? '/avatar-builder' : '/home'}
                variant={ButtonVariant.HUGE}
                size={ButtonSize.XLARGE}
                onMouseEnter={triggerArrow}
              >
                {t('play')}
                <motion.div animate={animateArrow}>
                  <ArrowRight />
                </motion.div>
              </Link>
            </div>
          </div>
        </ChatBubbleSimple>
      </nav>
    </>
  )
}
