'use client'

import { AnimatePresence, motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useMemo, useState } from 'react'

import { getAntagonistsByHand, getAntagonistsByPlace } from '@/api/engine'
import { getNewAvatarParts, getNumberOfNewCards } from '@/api/engine'
import {
  getAvatarPartCollection,
  getCardCollection,
  getCardHand,
  getShownNoUndefeatedTip,
  getShownPlayTip,
  getShownSecondChallengeTip,
  getShownWelcomeTip,
  readDefeatedAntagonists,
  readTokens,
  setGameStateValue,
  setPlayFromScenario,
  setShownChangeHandTip,
  setShownPlayTip,
  setShownSecondChallengeTip,
  setShownWelcomeTip,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useRouter } from '@/navigation'
import {
  ButtonSize,
  ButtonVariant,
  STAT_COLLECTION_NAMES,
  STAT_FLAGS,
} from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import {
  IAntagonistObject,
  ICard,
  IGameAntagonist,
  IGameProgress,
  IOwlContent,
  IScenario,
} from '@/utils/types'

import { AlertBox } from '../components/AlertBox'
import { Button } from '../components/Button'
import { MapBackground } from '../components/MapBackground'
import { OwlDialogue } from '../components/OwlDialogue'
import { Progressbar } from '../components/Progressbar'
import { LeftSidebarContent } from '../components/Sidebar/LeftSidebarContent'
import { RightSidebarContent } from '../components/Sidebar/RightSidebarContent'
import styles from './Home.module.scss'

const Map = dynamic(() => import('../components/Map').then((mod) => mod.Map))

const LazySidebar = dynamic(() =>
  import('../components/Sidebar').then((mod) => mod.Sidebar)
)

interface Props {
  antagonists: IAntagonistObject
}

export const HomeClient: React.FC<Props> = ({ antagonists }) => {
  const t = useTranslations()
  const router = useRouter()
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
  const [currentTokens, setCurrentTokens] = useState(0)
  const [hasNewParts, setHasNewParts] = useState(false)
  const [defeatedAntagonists, setDefeatedAntagonists] = useState([''])
  const [showOwlTip, setShowOwlTip] = useState(false)
  const [owlTip, setOwlTip] = useState<IOwlContent | null>(null)
  const [multipleOwlMessages, setMultipleOwlMessages] = useState(false)
  const [owlMessageIndex, setOwlMessageIndex] = useState(0)
  const [unlockedPlaces, setUnlockedPlaces] = useState<string[]>([])
  const [playableAntagonists, setPlayableAntagonists] = useState<
    IGameAntagonist[]
  >([])
  const [cardHand, setCardHand] = useState<ICard[]>([])
  const [places, setPlaces] = useState<IScenario[]>([])
  const [showingSidebar, setShowingSidebar] = useState('left')
  const [sideBarWidth, setSideBarWidth] = useState(400)
  const [progress, setProgress] = useState({})
  const [initialized, setInitialized] = useState(false)
  const [gameProgress, setGameProgress] = useState(0)

  const toggleShowingSidebar = () => {
    setShowingSidebar(showingSidebar === 'left' ? 'right' : 'left')
  }

  const getUnbeaten = useCallback(
    (place: string) => {
      const currentPlace = places.filter((obj) => obj.place === place)

      return currentPlace[0]?.unbeaten
    },
    [places]
  )

  const showLeftSidebar = isMobile ? showingSidebar === 'left' : true
  const showRightSidebar = isMobile ? showingSidebar === 'right' : true

  const getAnyUnbeaten = useCallback(() => {
    // check if any unbeaten antagonists, all places
    let anyUnbeaten = false
    unlockedPlaces.forEach((place) => {
      const unbeaten = getUnbeaten(place)
      if (unbeaten?.length > 0) {
        anyUnbeaten = true
      }
    })

    return anyUnbeaten
  }, [getUnbeaten, unlockedPlaces])

  function getPlayable(place: string) {
    const currentPlace = places.filter((obj) => obj.place === place)
    return currentPlace[0].playable
  }

  function getMapOffset() {
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

    function getOffsetSign(val: number) {
      return showingSidebar === 'left' ? val : -val
    }

    if (isPortrait) {
      return offset
    }

    if (isMediumScreen || isSmallSize) {
      // distance between sidebar and interactive map square
      const offsetVal = (width - height) / 2 - sideBarWidth
      // convert sign before checking left/right
      const signedVal = getOffsetSign(offsetVal * -1)
      offset = signedVal
    }

    if (isSmallScreen) {
      offset = getOffsetSign((width - height) / 2)
    }
    return offset
  }

  const handleMapClick = (place: string) => {
    setPlayFromScenario(false)
    let antagonists = getUnbeaten(place)

    if (!antagonists.length) {
      antagonists = getPlayable(place)
    }

    const randomAntagonist =
      antagonists[Math.floor(Math.random() * antagonists.length)]

    //TODO: use params to pass antagonist to persuade page
    setGameStateValue({ activeAntagonist: randomAntagonist })
    router.push('/persuade')
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

      // check if player just won first challenge
      if (defeatedAntagonists.length === 1) {
        const shownSecond = await getShownSecondChallengeTip()
        if (!shownSecond) {
          setShownSecondChallengeTip(true)
          return {
            heading: 'Owl.secondchallenge.heading',
            body: 'Owl.secondchallenge.body',
          }
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
  }, [cardHand, defeatedAntagonists, getAnyUnbeaten, unlockedPlaces])

  function handleOwlClick() {
    if (multipleOwlMessages) {
      const welcomeTextsArr = [
        {
          heading: 'Owl.homewelcome.text_1.heading',
          body: 'Owl.homewelcome.text_1.body',
        },
        { heading: null, body: 'Owl.homewelcome.text_2.body' },
        { heading: null, body: 'Owl.homewelcome.text_3.body' },
        { heading: null, body: 'Owl.homewelcome.text_4.body' },
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

  const sidebarEnvironment = (place: string, newScenario: boolean) => {
    return (
      <div
        key={place}
        className={`${isMobile && styles.textWrapper}`}
        onClick={() => handleMapClick(place)}
      >
        <h3>{t('map.' + place + '.header')}</h3>
        {newScenario && (
          <p className={styles.newScenario}>{t('map.newscenario')}</p>
        )}
        <p>{t('map.' + place + '.body')}</p>
        <Button onClick={() => handleMapClick(place)}>
          {t('map.play', {
            place: t('map.' + place + '.header'),
          })}
        </Button>
      </div>
    )
  }

  useEffect(() => {
    setGameStateValue({
      allowedLootbox: false,
      gameEnvironment: null,
      isByingLootbox: false,
    })
    const init = async () => {
      const cardCollection = await getCardCollection()
      setNumberOfCards(cardCollection.length)

      // get number of new cards
      const noOfNewCards = getNumberOfNewCards(cardCollection)
      // get number of tokens
      setNumberOfNewCards(noOfNewCards)
      const noOfTokens = await readTokens()
      setCurrentTokens(noOfTokens)

      const storedPartCollection = await getAvatarPartCollection()
      const getNewParts = getNewAvatarParts(storedPartCollection).length
      setHasNewParts(!!getNewParts)

      // get playable scenarios
      const cards = await getCardHand()
      const defeated = await readDefeatedAntagonists()
      const antagonistsByHand = getAntagonistsByHand(cards, antagonists)

      if (defeated.length === 1) {
        setDefeatedAntagonists(defeated)
      }

      cards.length > 0 && setShowingSidebar('right')
      setPlayableAntagonists(antagonistsByHand)
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

  return (
    <>
      {isMobile && <MapBackground />}
      <AlertBox showingSidebar={showingSidebar} sideBarWidth={sideBarWidth} />
      {showLeftSidebar && (
        <LazySidebar
          side='left'
          isShowing={showingSidebar === 'left'}
          onToggle={toggleShowingSidebar}
          width={sideBarWidth}
          setWidth={setSideBarWidth}
        >
          <LeftSidebarContent
            cardHand={cardHand}
            toggleShowingSidebar={toggleShowingSidebar}
            numberOfCards={numberOfCards}
            numberOfNewCards={numberOfNewCards}
            currentTokens={currentTokens}
            hasNewParts={hasNewParts}
          />
        </LazySidebar>
      )}
      <motion.div
        className={styles.progressbarWrapper}
        initial={{ left: 0 }}
        animate={{
          left:
            showingSidebar === 'left'
              ? isMobile
                ? 0
                : `${leftPosOfProgressbar}px`
              : `-${leftPosOfProgressbar}px`,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <div className={styles.progressbar}>
          <Progressbar />
        </div>
      </motion.div>

      <motion.div
        className={styles.playButtonWrapper}
        initial={{ left: 0 }}
        animate={{
          left:
            showingSidebar === 'left'
              ? isMobile
                ? 0
                : `${leftPosOfProgressbar}px`
              : `-${leftPosOfProgressbar}px`,
        }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
      >
        <Button
          variant={ButtonVariant.PRIMARY}
          size={ButtonSize.XXLARGE}
          onClick={() => console.log('click')}
        >
          {t('home.play')}
        </Button>
      </motion.div>

      {!isMobile && (
        <section className={styles.map}>
          <motion.div
            className={`${styles.largerImageWrapper}`}
            initial={{ x: 0 }}
            animate={{ x: getMapOffset() }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.4 }}
          >
            <Map
              playable={playableAntagonists}
              onClick={handleMapClick}
              progress={progress}
              // highlightEnv={environment} TODO: use to highligt environments
            />
          </motion.div>
        </section>
      )}
      {showRightSidebar && (
        <LazySidebar
          side='right'
          onToggle={toggleShowingSidebar}
          isShowing={showingSidebar === 'right'}
          width={sideBarWidth}
          setWidth={setSideBarWidth}
        >
          <RightSidebarContent
            cardHand={cardHand}
            unlockedPlaces={unlockedPlaces}
            getAnyUnbeaten={getAnyUnbeaten}
            getUnbeaten={getUnbeaten}
            sidebarEnvironment={sidebarEnvironment}
            onToggle={toggleShowingSidebar}
          />
        </LazySidebar>
      )}
      {/* )} */}
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
