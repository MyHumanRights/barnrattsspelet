'use client'

import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getAntagonistsByHand, getAntagonistsByPlace } from '@/api/engine'
import { getNewAvatarParts, getNumberOfNewCards } from '@/api/engine'
import {
  getAvatarPartCollection,
  getCardCollection,
  getCardHand,
  getShownNoUndefeatedTip,
  getShownPlayTip,
  getShownWelcomeTip,
  readDefeatedAntagonists,
  setGameStateValue,
  setShownChangeHandTip,
  setShownPlayTip,
  setShownWelcomeTip,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import {
  IAntagonistObject,
  ICard,
  IGameProgress,
  IOwlContent,
  IScenario,
} from '@/utils/types'

import { Map } from '../components/Map'
import { Progressbar } from '../components/Progressbar'
import { Sidebar } from '../components/Sidebar'
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
    clientHeight: height,
    clientWidth: width,
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
  const [unlockedPlaces, setUnlockedPlaces] = useState<string[]>([])
  const [cardHand, setCardHand] = useState<ICard[]>([])
  const [places, setPlaces] = useState<IScenario[]>([])
  const [progress, setProgress] = useState({})
  const [initialized, setInitialized] = useState(false)

  const sideBarWidth = 310

  const getUnbeaten = useCallback(
    (place: string) => {
      const currentPlace = places.filter((obj) => obj.place === place)

      return currentPlace[0]?.unbeaten
    },
    [places]
  )

  const getAnyUnbeaten = useCallback(() => {
    // check if any unbeaten antagonists, all places
    return unlockedPlaces.some((place) => {
      const unbeaten = getUnbeaten(place)
      return unbeaten?.length > 0
    })
  }, [getUnbeaten, unlockedPlaces])

  const getMapOffset = () => {
    let offset = 0

    // current aspect ratio except sidebar
    const aspectRatio = (width - sideBarWidth) / height

    // map fits in space outside sidebar
    const wideScreen = (height + sideBarWidth) / height
    const smallScreen = 1

    const isPortrait = width < height
    const isSmallSize = width < sideBarWidth * 3

    const isMediumScreen = aspectRatio < wideScreen && aspectRatio > smallScreen
    const isSmallScreen = aspectRatio < smallScreen

    if (isPortrait) {
      return offset
    }

    if (isMediumScreen || isSmallSize) {
      // distance between sidebar and interactive map square
      const offsetVal = (width - height) / 2 - sideBarWidth
      // convert sign before checking left/right
      const signedVal = offsetVal * -1
      offset = signedVal
    }

    if (isSmallScreen) {
      offset = (width - height) / 2
    }
    return offset
  }

  const getOwlTip = useCallback(async () => {
    if (!cardHand.length) {
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
    } else {
      // check if no playable or no unplayed available, set owl tip
      // Skip if player has already been notified that
      // their card deck has no new scenarios in it (deckbuilder)
      const shownNoUndefeatedTip = await getShownNoUndefeatedTip()
      if (!shownNoUndefeatedTip) {
        setShownChangeHandTip(1)
        const anyUnbeaten = getAnyUnbeaten()
        const anyUnlocked = unlockedPlaces?.length > 0
        if (!anyUnbeaten || !anyUnlocked) {
          const heading = `Owl.${
            !anyUnlocked
              ? 'noplayablescenarios.heading'
              : 'nounplayedscenarios.heading'
          }`
          const body = `Owl.${
            !anyUnlocked
              ? 'noplayablescenarios.body'
              : 'nounplayedscenarios.body'
          }`
          return { heading, body }
        }
      }
      // first time play tip
      const shownPlayTip = await getShownPlayTip()
      if (!shownPlayTip) {
        setShownPlayTip(true)
        return {
          heading: 'Owl.play.heading',
          body: 'Owl.play.body',
        }
      }
    }
    return false
  }, [cardHand, getAnyUnbeaten, unlockedPlaces])

  function handleOwlClick() {
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

      setCardHand(cards)

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

      setUnlockedPlaces(tempUnlockedPlaces)

      tempUnlockedPlaces.map((place) => {
        let allAntagonists = getAntagonistsByPlace(place, antagonists)
        let playable: string[] = []

        antagonistsByHand.map((a) => {
          if (allAntagonists.some((antagonist) => antagonist.name === a.name)) {
            playable.push(a.name)
          }
          return null
        })

        let unbeaten = playable.filter((x) => !defeated.includes(x))
        let scenario = { place: place, playable: playable, unbeaten: unbeaten }

        setPlaces((prevArray) => [...prevArray, scenario])
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

  const leftPosOfProgressbar = useMemo(() => {
    return isMobile ? sideBarWidth : sideBarWidth / 2
  }, [sideBarWidth, isMobile])

  const getLeftPosition = () => (isMobile ? '0' : `${leftPosOfProgressbar}px`)

  return (
    <>
      {isMobile && <MapBackground />}
      <Sidebar
        cardHand={cardHand}
        numberOfCards={numberOfCards}
        numberOfNewCards={numberOfNewCards}
        hasNewParts={hasNewParts}
      />
      <motion.div
        className={styles.progressbarWrapper}
        // initial={{ left: 0 }}
        // animate={{
        //   left: getLeftPosition(),
        // }}
        // transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div className={styles.progressbar}>
          <Progressbar />
        </div>
      </motion.div>

      <SlimPlay left={getLeftPosition()} />

      {!isMobile && (
        <section className={styles.map}>
          <motion.div
            className={`${styles.largerImageWrapper}`}
            initial={{ x: 0 }}
            animate={{ x: getMapOffset() }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          >
            <Map
              progress={progress}
              // highlightEnv={environment} TODO: use to highligt environments
            />
          </motion.div>
        </section>
      )}
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
