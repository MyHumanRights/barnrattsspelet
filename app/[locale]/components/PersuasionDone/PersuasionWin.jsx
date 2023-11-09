import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useContext, useRef } from 'react'
import { useTranslations } from 'next-intl'
import { useNavigate } from 'react-router-dom'
import { Button, TextWithVoiceover, Token } from '../'
import {
  setPlayFromScenario,
  setCardHand,
  setTokens,
  readDefeatedAntagonists,
} from '../../api/storage'
import useWindowSize from '../../utils/hooks/useWindowSize'
import { useOptionsContext } from '@/contexts/OptionsContext'
import styles from './PersuasionWin.module.scss'
import star from '../../assets/svgs/starShadow.svg'
import owl from '../../assets/svgs/owl.svg'
import useAllAreDefeated from '../../utils/hooks/useAllAreDefeated'
import useHaveWonSuperHero from '../../utils/hooks/useHaveWonSuperHero'
import useAddToStatistics from '../../utils/hooks/useAddToStatistics'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '../../utils/constants'

const WIN_AMOUNT = 3

const PersuasionWin = ({ onLootBox, isScenarioMode }) => {
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const { t } = useTranslation('common', { keyPrefix: 'owl.persuasiondone' })
  const ref = useRef()

  const addFirstTimeWin = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_WIN,
    STAT_FLAGS.IS_FIRST_TIME_WIN
  )
  const addFirstTimeWinThree = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_WIN_THREE,
    STAT_FLAGS.IS_FIRST_TIME_WIN_THREE
  )
  const addFirstTimeWinTen = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_WIN_TEN,
    STAT_FLAGS.IS_FIRST_TIME_WIN_TEN
  )
  const addFirstTimeGameComplete = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_WIN_GAME_COMPLETE,
    STAT_FLAGS.IS_FIRST_TIME_WIN_GAME_COMPLETE
  )

  const { shouldReduceMotion } = useContext(OptionsContext).options

  const allAreDefeated = useAllAreDefeated()
  const hasSuperhero = useHaveWonSuperHero()

  useEffect(() => {
    setTokens(WIN_AMOUNT)
  }, [])

  useEffect(() => {
    ;(async () => {
      const defeatedAntagonists = await readDefeatedAntagonists()
      if (defeatedAntagonists.length === 1) {
        addFirstTimeWin()
      }
      if (defeatedAntagonists.length === 3) {
        addFirstTimeWinThree()
      }
      if (defeatedAntagonists.length === 10) {
        addFirstTimeWinTen()
      }
    })()

    if (allAreDefeated) {
      addFirstTimeGameComplete()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function goToScenarios() {
    // reset game mode in case user goes to play standard game
    setPlayFromScenario(false)
    setCardHand([])
    navigate(-1)
  }

  function goToHome() {
    setCardHand([])
    navigate('/home')
  }

  function goToNextPage(e) {
    if (e.target.getAttribute('data-click') === null) {
      ref.current.click()
    }
  }

  return (
    <div className={styles.wrapper} onClick={goToNextPage}>
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
          }}
          transition={{
            duration: shouldReduceMotion ? 0.01 : 0.4,
            type: shouldReduceMotion ? 'tween' : 'spring',
          }}
          exit={{ scale: 0.5, opacity: 0 }}
        >
          <div className={styles.winWrapper}>
            <div className={styles.top}>
              <img src={star} alt='' width='74' height='72' />
            </div>
            <img
              src={owl}
              alt=''
              width='117'
              height='120'
              className={styles.owl}
            />
            <div className={styles.content}>
              <h2 className={styles.heading}>
                <TextWithVoiceover
                  textKey={
                    allAreDefeated
                      ? 'common:owl:persuasiondone:winall:heading'
                      : 'common:owl:persuasiondone:winscenariomode:heading'
                  }
                />
              </h2>
              {!allAreDefeated && <p>{t('winpersuasion.body')}</p>}
              <div className={styles.tokenWrapper}>
                <Token
                  ownedTokens={`+${WIN_AMOUNT}`}
                  size={`${width > 600 ? 'medium' : 'small'}`}
                />
              </div>
              <Button
                ref={ref}
                variant='text'
                onClick={
                  isScenarioMode
                    ? goToScenarios
                    : hasSuperhero
                    ? goToHome
                    : onLootBox
                }
                data-click='button'
              >
                {isScenarioMode
                  ? t('toscenarios')
                  : hasSuperhero
                  ? t('tohome')
                  : t('getlootbox')}
              </Button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default PersuasionWin
