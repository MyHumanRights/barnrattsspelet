'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useOptionsContext } from '@/contexts/OptionsContext'
import useAddToStatistics from '@/utils/hooks/useAddToStatistics'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import {
  getCardCollection,
  setCardHand,
  setPlayFromScenario,
} from '../../api/storage'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ChatBubbleSimple } from './components/ChatBubble/ChatBubbleSimple'
import { Footer } from './components/Footer'
import { Link } from './components/Link/Link'
import { Loader } from './components/Loader'
import { MobileWarning } from './components/MobileWarning'
import { Modal } from './components/Modal/Modal'
import { OwlDialogue } from './components/OwlDialogue'
import ArrowRight from './components/Icons/ArrowRight'
import styles from './page.module.scss'

const TIME = 10000

const Start = () => {
  const t = useTranslations('Start')

  const {
    options: { shouldReduceMotion },
    toggleThemeSound,
    isMobile,
  } = useOptionsContext()
  const [firstTimer, setFirstTimer] = useState(true)
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [showModal, setShowModal] = useState(isMobile)
  const [bgLoaded, setBgLoaded] = useState(false)

  const [animateArrow, triggerArrow] = useAnimation({ x: 5 })
  // const addToStatistics = useAddToStatistics(
  //   STAT_COLLECTION_NAMES.FIRST_TIME_START,
  //   STAT_FLAGS.IS_FIRST_TIME_START
  // )

  useEffect(() => {
    const img = new Image()
    img.onload = () => {
      setBgLoaded(true)
    }
    img.src = '/images/start/map-large.svg'
  }, [])

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
      const cardCollection = await getCardCollection()
      cardCollection?.length > 0 ? setFirstTimer(false) : setFirstTimer(true)
    })()
  })

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOwlTip(true)
    }, TIME)

    return () => clearTimeout(timer)
  }, [])

  // useEffect(() => {
  //   addToStatistics()
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])

  async function handleModal() {
    setShowModal(!showModal)
    document.querySelector('html')?.classList.toggle('scroll-lock')
  }

  !bgLoaded && <Loader />

  return (
    <div className={styles.wrapper}>
      <main className={styles.start}>
        {showModal && (
          <Modal onModalClose={handleModal}>
            <MobileWarning handleClick={handleModal} />
          </Modal>
        )}
        <div
          className={styles.mapBkgd}
          style={{
            backgroundImage: 'url("/images/start/map-large.svg")',
          }}
        />
        <div className={styles.headerList}>
          <Link
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            to='/guidance'
          >
            {t('guidance')}
          </Link>
          <Link
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
            to='/manual'
          >
            {t('manual')}
          </Link>
        </div>
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
                  body='startplaytip:body'
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
        <nav className={styles.secondaryMenu} aria-label={t('secondaryMenu')}>
          <ChatBubbleSimple>
            <p className={styles.text}>{t('descriptionThree')}</p>
            <div className={styles.linkWrapper}>
              <Link to='/collection-viewer' variant={ButtonVariant.SECONDARY}>
                {t('seeCards')}
              </Link>
            </div>
          </ChatBubbleSimple>
        </nav>
        <div
          className={styles.avatars}
          style={{
            backgroundImage: 'url("/images/start/avatarer-startsida.svg")',
          }}
        />
      </main>
      <Footer />
    </div>
  )
}

export default Start
