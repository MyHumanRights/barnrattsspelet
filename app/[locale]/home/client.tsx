'use client'

import { AnimatePresence, motion } from 'motion/react'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useState } from 'react'

import { getAntagonistsByHand, getAntagonistsByPlace } from '@/api/engine'
import { getNewAvatarParts, getNumberOfNewCards } from '@/api/engine'
import {
  getAvatarPartCollection,
  getCardCollection,
  getCardHand,
  getShownWelcomeTip,
  readDefeatedAntagonists,
  setGameStateValue,
  setShownWelcomeTip,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { IAntagonistObject, IGameProgress, IOwlContent } from '@/utils/types'

import { AvatarLink } from '../components/AvatarLink'
import { CardCollectionLink } from '../components/CardCollectionLink'
import { HelpBox } from '../components/HelpBox'
import { Map } from '../components/Map'
import { Progressbar } from '../components/Progressbar'
import { SlimPlay } from '../components/SlimPlay'
import styles from './Home.module.scss'

const OwlDialogue = dynamic(() =>
  import('../components/OwlDialogue').then((mod) => mod.OwlDialogue)
)
const MapBackground = dynamic(() =>
  import('../components/MapBackground').then((mod) => mod.MapBackground)
)

interface Props {
  antagonists: IAntagonistObject
}

export const HomeClient: React.FC<Props> = ({ antagonists }) => {
  const {
    isMobile,
    toggleThemeSound,
    options: { shouldReduceMotion, themeMusicOn, themeVolume },
  } = useOptionsContext()
  const addToStatistics = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_HOME,
    STAT_FLAGS.IS_FIRST_TIME_HOME
  )

  const [numberOfCards, setNumberOfCards] = useState(0)
  const [numberOfNewCards, setNumberOfNewCards] = useState(0)
  const [hasNewParts, setHasNewParts] = useState(false)
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [owlTip, setOwlTip] = useState<IOwlContent | null>(null)
  const [multipleOwlMessages, setMultipleOwlMessages] = useState(false)
  const [owlMessageIndex, setOwlMessageIndex] = useState(0)
  const [progress, setProgress] = useState({})
  const [initialized, setInitialized] = useState(false)

  const getOwlTip = useCallback(async () => {
    // show welcome tip
    const shownWelcomeTip = await getShownWelcomeTip()
    if (!shownWelcomeTip) {
      setShownWelcomeTip(true)
      setMultipleOwlMessages(true)
      return {
        heading: 'Owl.homewelcome.text_1.heading',
        body: 'Owl.homewelcome.text_1.body',
      }
    }

    return false
  }, [])

  const handleOwlClick = () => {
    if (multipleOwlMessages) {
      const welcomeTextsArr = [
        {
          heading: 'Owl.homewelcome.text_1.heading',
          body: 'Owl.homewelcome.text_1.body',
        },
        { heading: null, body: 'Owl.homewelcome.text_2.body' },
        { heading: null, body: 'Owl.homewelcome.text_3.body' },
      ]

      if (owlMessageIndex + 1 === welcomeTextsArr.length) {
        setMultipleOwlMessages(false)
        return
      }

      const currentWelcomeText = welcomeTextsArr[owlMessageIndex + 1]

      setOwlTip(currentWelcomeText)
      setShowOwlTip(true)
      setOwlMessageIndex((prevIndex) => prevIndex + 1)
    }
  }

  useEffect(() => {
    setGameStateValue({
      allowedLootbox: false,
      gameEnvironment: null,
      isBuyingLootbox: false,
    })
    const init = async () => {
      const cardCollection = (await getCardCollection()) || []
      setNumberOfCards(cardCollection.length)

      // get number of new cards
      const noOfNewCards = getNumberOfNewCards(cardCollection)
      setNumberOfNewCards(noOfNewCards)

      const storedPartCollection = await getAvatarPartCollection()
      const getNewParts = getNewAvatarParts(storedPartCollection).length
      setHasNewParts(!!getNewParts)

      // get playable scenarios
      const cards = await getCardHand()
      const defeated = await readDefeatedAntagonists()
      const antagonistsByHand = getAntagonistsByHand(cards, antagonists)

      // make progress object
      const tempProgress: IGameProgress = {}
      Object.values(antagonists).map((a) => {
        tempProgress[a.environment] = tempProgress[a.environment] || {
          total: 0,
          defeated: 0,
        }
        tempProgress[a.environment] = {
          ...tempProgress[a.environment],
          total: tempProgress[a.environment].total + 1,
          defeated: defeated.includes(a.name)
            ? tempProgress[a.environment].defeated + 1
            : tempProgress[a.environment].defeated,
        }
        return null
      })
      setProgress(tempProgress)

      let tempUnlockedPlaces: string[] = []

      antagonistsByHand.map((a) => tempUnlockedPlaces.push(a.environment))
      tempUnlockedPlaces = [...new Set(tempUnlockedPlaces)]

      tempUnlockedPlaces.map((place) => {
        let allAntagonists = getAntagonistsByPlace(place, antagonists)
        let playable: string[] = []

        antagonistsByHand.map((a) => {
          if (allAntagonists.some((antagonist) => antagonist.name === a.name)) {
            playable.push(a.name)
          }
          return null
        })

        return null
      })
      setInitialized(true)
    }

    init()
  }, [antagonists])

  useEffect(() => {
    toggleThemeSound()
  }, [themeMusicOn, themeVolume, toggleThemeSound])

  useEffect(() => {
    ;(async () => {
      if (initialized) {
        const tip = await getOwlTip()
        if (tip) {
          setOwlTip(tip)
          setShowOwlTip(true)
        }
      }
    })()
  }, [initialized, getOwlTip])

  useEffect(() => {
    addToStatistics()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {isMobile && <MapBackground />}
      <div className={styles.progressbarWrapper}>
        <div className={styles.progressbar}>
          <Progressbar />
        </div>
      </div>

      <SlimPlay />

      {!isMobile && (
        <section className={styles.map}>
          <div className={`${styles.largerImageWrapper}`}>
            <Map
              progress={progress}
              // highlightEnv={environment} TODO: use to highligt environments
            />
          </div>
        </section>
      )}
      <CardCollectionLink
        numberOfCards={numberOfCards}
        numberOfNewCards={numberOfNewCards}
      />
      <AvatarLink hasNewParts={hasNewParts} />
      <HelpBox />
      <AnimatePresence>
        {showOwlTip && (
          <motion.div
            className={styles.owlWrapper}
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: shouldReduceMotion ? 'tween' : 'spring',
                duration: shouldReduceMotion ? 0.01 : 0.4,
              },
            }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading={owlTip?.heading}
              body={owlTip?.body}
              setShowOwl={setShowOwlTip}
              onClick={handleOwlClick}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
