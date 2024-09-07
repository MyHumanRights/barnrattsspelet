import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useEffect, useRef } from 'react'

import {
  readDefeatedAntagonists,
  setCardHand,
  setPlayFromScenario,
  setTokens,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/navigation'
import {
  ButtonVariant,
  STAT_COLLECTION_NAMES,
  STAT_FLAGS,
} from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useAllAreDefeated } from '@/utils/hooks/useAllAreDefeated'
import useHaveWonSuperHero from '@/utils/hooks/useHaveWonSuperHero'

import { Button } from '../Button'
import { TextWithVoiceover } from '../TextWithVoiceover'
import { Token } from '../Token'
import styles from './PersuasionWin.module.scss'

const WIN_AMOUNT = 3

type Props = {
  onLootBox: () => void
  isScenarioMode: boolean
}

export const PersuasionWin = ({ onLootBox, isScenarioMode }: Props) => {
  const t = useTranslations('Owl.persuasiondone')
  const router = useRouter()
  const { clientWidth } = useOptionsContext()
  const ref = useRef<HTMLButtonElement>(null)

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

  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  // TODO: set flag in local storage when all are defeated
  // only do this hook if flag is false
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
    router.back()
  }

  function goToNextPage(e: React.MouseEvent) {
    if ((e.target as HTMLElement).getAttribute('data-click') === null) {
      ref.current?.click()
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
              <Image src='/svgs/starShadow.svg' alt='' width='74' height='72' />
            </div>
            <Image
              src='/svgs/owl.svg'
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
                      ? 'Owl.persuasiondone.winall.heading'
                      : 'Owl.persuasiondone.winscenariomode.heading'
                  }
                />
              </h2>
              {!allAreDefeated && <p>{t('winpersuasion.body')}</p>}
              <div className={styles.tokenWrapper}>
                <Token
                  ownedTokens={WIN_AMOUNT}
                  size={`${clientWidth > 600 ? 'medium' : 'small'}`}
                />
              </div>
              <Button
                ref={ref}
                variant={ButtonVariant.TEXT}
                //TODO: If user has won all cards and all avatarparts, go to home
                onClick={isScenarioMode ? goToScenarios : onLootBox}
                data-click='button'
              >
                {isScenarioMode
                  ? t('toscenarios')
                  : hasSuperhero // TODO: check if user has won all cards and all avatarparts
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
