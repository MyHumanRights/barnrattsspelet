'use client'

import { AnimatePresence } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useTranslations } from 'next-intl'
import { useCallback, useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import {
  answer,
  ANSWER_TYPES,
  getAnswerLine,
  getGameState,
  resetGameState,
  setGameState,
} from '@/api/engine'
import {
  getCardHand,
  getPlayFromScenario,
  getShownFlipCardTip,
  getShownTokenTip,
  readDefeatedAntagonists,
  readGameStateValue,
  readWrongAnswers,
  setDefeatedAntagonists,
  setFirstTimePlaying,
  setGameStateValue,
  setShownFlipCardTip,
  setWrongAnswers,
} from '@/api/storage'
import rightAnswerSound from '@/assets/sounds/fx/01-correct-card-played.mp3'
import wrongAnswerSound from '@/assets/sounds/fx/02-incorrect-card-played.mp3'
import gameOverSound from '@/assets/sounds/fx/05-lose.mp3'
import chatSound from '@/assets/sounds/fx/08-talk.mp3'
import victorySound from '@/assets/sounds/fx/22-map-added-color.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonists from '@/data/antagonists.json'
import cards from '@/data/cards.json'
import { useRouter } from '@/navigation'
import { Antagonist as AntagonistType } from '@/utils/antagonistType'
import {
  ButtonSize,
  ButtonVariant,
  OWLS,
  STAT_COLLECTION_NAMES,
  STAT_FLAGS,
} from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useTokens } from '@/utils/hooks/useTokens'
import {
  AntagonistComps,
  Environments,
  GAME_STATES,
  ICard,
  IGameAntagonist,
  IGameState,
} from '@/utils/types'

import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { GameIntro } from '../components/GameIntro'
import { Healthbar } from '../components/Healthbar'
import styles from './Persuade.module.scss'

const Retry = dynamic(() =>
  import('../components/PersuasionWin/Retry').then((mod) => mod.Retry)
)
const PersuasionWin = dynamic(() =>
  import('../components/PersuasionWin').then((mod) => mod.PersuasionWin)
)
const OwlTips = dynamic(() =>
  import('../components/OwlTips').then((mod) => mod.OwlTips)
)
const CardHand = dynamic(() =>
  import('../components/CardHand').then((mod) => mod.CardHand)
)
const MobileCardHand = dynamic(() =>
  import('../components/CardHand/MobileCardHand').then(
    (mod) => mod.MobileCardHand
  )
)
const ChatBubble = dynamic(() =>
  import('../components/ChatBubble').then((mod) => mod.ChatBubble)
)
const Antagonist = dynamic(() =>
  import('../components/Antagonist').then((mod) => mod.Antagonist)
)
const Environment = dynamic(() =>
  import('../components/Environment').then((mod) => mod.Environment)
)
const Quiz = dynamic(() => import('../components/Quiz').then((mod) => mod.Quiz))
const Token = dynamic(() =>
  import('../components/Token').then((mod) => mod.Token)
)

const ANSWER_DELAY = 1500

type Line = {
  text: string
  player: boolean
  wrongAnswer?: boolean
}

export const PersuadeClient = () => {
  const t = useTranslations()
  const router = useRouter()

  const genericAnswers = 'persuasion.genericwrongcardanswers.'

  const {
    isMobile,
    toggleThemeSound,
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [activeAntagonist, setActiveAntagonist] =
    useState<AntagonistType | null>(null)
  const [playChatSound] = useSound(chatSound, { volume: effectsVolume })
  const [playVictorySound] = useSound(victorySound, { volume: effectsVolume })
  const [playRightAnswerSound] = useSound(rightAnswerSound, {
    volume: effectsVolume,
  })
  const [playWrongAnswerSound] = useSound(wrongAnswerSound, {
    volume: effectsVolume,
  })
  const [playGameOverSound] = useSound(gameOverSound, { volume: effectsVolume })

  const [hasShownTokenTip, setHasShownTokenTip] = useState(true)
  const [showOwl, setShowOwl] = useState<OWLS | null>(null)
  const [currentState, setCurrentState] = useState<IGameState | null>(null)
  const [environment, setEnvironment] = useState<Environments | null>(null)
  const [antagonistComp, setAntagonistComp] = useState<AntagonistComps | null>(
    null
  )
  const [bgColor, setBgColor] = useState('none')
  const [chatBubblePosition, setChatBubblePosition] = useState('')
  const [arrowPosition, setArrowPosition] = useState('')
  const [currentCard, setCurrentCard] = useState<ICard | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [boostedCards, setBoostedCards] = useState<string[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [isScenarioMode, setIsScenarioMode] = useState(false)
  const [hasShownFlipCardTip, setHasShownFlipCardTip] = useState(true)
  const [lines, setLines] = useState<Line[]>([])
  const [showWinModal, setShowWinModal] = useState(false)
  const [answeredIncorrectly, setAnsweredIncorrectly] = useState(0)
  const [correctCard, setCorrectCard] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const [quizType, setQuizType] = useState<'boost' | 'game'>('game')

  const scrollableRef = useRef<HTMLDivElement>(null)

  const randomWrongAnswer = Math.floor(Math.random() * 6) + 1
  const [updateTokens, removeTokens, ownedTokens] = useTokens()

  const addFirstTimePersuation = useAddToStatistics(
    STAT_COLLECTION_NAMES.FIRST_TIME_PERSUATION,
    STAT_FLAGS.IS_FIRST_TIME_PERSUATION
  )

  useEffect(() => {
    toggleThemeSound(false)
  }, [toggleThemeSound])

  useEffect(() => {
    // make sure the list fo chatbubbles is scrolled to the bottom
    const scrollable = scrollableRef.current
    if (scrollable) {
      scrollable.scrollTop = scrollable.scrollHeight
    }
  }, [lines])

  const handleIntro = () => {
    setShowIntro(!showIntro)
    document.querySelector('html')?.classList.toggle('scroll-lock')
    startGame()
  }

  const handleQuizModal = () => {
    setShowModal(!showModal)
    document.querySelector('html')?.classList.toggle('scroll-lock')
  }

  const init = useCallback(async () => {
    const gameStateAntagonist = (await readGameStateValue(
      'activeAntagonist'
    )) as keyof typeof antagonists
    if (!gameStateAntagonist) {
      return
    }
    setActiveAntagonist(gameStateAntagonist)
    const cards = await getCardHand()
    const useAntagonist = antagonists[gameStateAntagonist] as IGameAntagonist

    resetGameState()
    const currentState = setGameState({
      antagonist: useAntagonist,
      cardHand: cards,
    })
    setCurrentState(currentState)
    setAntagonistComp(useAntagonist.components.start)
    setEnvironment(useAntagonist.components.background)
    setChatBubblePosition(useAntagonist.chatBubblePosition)
    setArrowPosition(useAntagonist.antagonistPosition)

    const [playFromScenario, wrongAnswers, shownFlipCardTip, shownTokenTip] =
      await Promise.all([
        getPlayFromScenario(),
        readWrongAnswers(),
        getShownFlipCardTip(),
        getShownTokenTip(),
      ])
    setIsScenarioMode(playFromScenario)
    setAnsweredIncorrectly(wrongAnswers)
    setHasShownFlipCardTip(shownFlipCardTip || false)
    setHasShownTokenTip(shownTokenTip)
  }, [])

  useEffect(() => {
    addFirstTimePersuation()
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAntagonist])

  useEffect(() => {
    // find svg background (floor) color
    const svgBgElement = document.getElementById('ENVIRONMENT_BACKGROUND')
    const color = svgBgElement?.style?.fill
    color && setBgColor(color)
  }, [environment])

  const addDefeatedAntagonist = async (antagonist: IGameAntagonist) => {
    const isScenarioMode = await getPlayFromScenario()
    if (isScenarioMode) {
      return
    }

    let defeatedAntagonists = await readDefeatedAntagonists()

    const isInDefeatedList = defeatedAntagonists.find(
      (ant) => ant === antagonist.name
    )
    if (!isInDefeatedList) {
      defeatedAntagonists.push(antagonist.name)
      await setDefeatedAntagonists(defeatedAntagonists)
    }
  }

  useEffect(() => {
    if (!hasShownTokenTip && ownedTokens > 0 && ownedTokens < 3) {
      setShowOwl(OWLS.TOKEN)
      setHasShownTokenTip(true)
    }
  }, [ownedTokens, hasShownTokenTip])

  useEffect(() => {
    if (answeredIncorrectly === 2 && !hasShownFlipCardTip) {
      const timer = setTimeout(
        () => setShowOwl(OWLS.FLIP_CARD),
        ANSWER_DELAY * 2.5
      )
      setShownFlipCardTip(true)
      return () => {
        clearTimeout(timer)
      }
    }
  }, [answeredIncorrectly, hasShownFlipCardTip])

  const setFirstTimePlayingToFalse = async () => {
    const playFromScenario = await getPlayFromScenario()
    !playFromScenario && (await setFirstTimePlaying(false))
  }

  const startGame = async () => {
    setLines([
      {
        text: `antagonists.${activeAntagonist}.conversationEntries.a`,
        player: true,
      },
    ])

    setFirstTimePlayingToFalse()
    setCurrentState(setGameState({ state: GAME_STATES.GAME }))
    setTimeout(() => {
      soundEffectsOn && playChatSound()
    }, 1200)
    setTimeout(() => {
      const useAntagonist = (
        activeAntagonist !== null ? antagonists[activeAntagonist] : null
      ) as IGameAntagonist
      const firstAntagonistLine = {
        text: useAntagonist
          ? `antagonists.${useAntagonist.name}.statements.0`
          : '',
        player: false,
        miniCard: null,
      }
      setLines((prev) => [...prev, firstAntagonistLine])
    }, 1200)

    const defeatedAntagonists = await readDefeatedAntagonists()

    defeatedAntagonists.length === 2 &&
      setTimeout(() => {
        setShowOwl(OWLS.QUIZ)
      }, 2000)
  }

  const onPlayCard = () => {
    if (!currentCard) {
      console.error('No current card')
      return
    }
    const { result } = answer(currentCard)

    const state = getGameState()
    const { statement, antagonist } = state

    if (!antagonist) {
      console.error('No antagonist found')
      return
    }

    const text = getAnswerLine()

    switch (result) {
      case ANSWER_TYPES.CORRECT:
        setActiveCardId(currentCard.id)
        setCorrectCard(currentCard.id)
        soundEffectsOn && playRightAnswerSound()

        // first delay animating exit of correct card
        setTimeout(() => {
          setActiveCardId(null)
          setCurrentState(state)
        }, ANSWER_DELAY)

        // then show player's answer
        setTimeout(() => {
          // Store player's answer in array
          setLines((prev) => [
            ...prev,
            {
              text,
              player: true,
            },
          ])
        }, ANSWER_DELAY * 1.5)

        // then show next chat bubble
        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            {
              text: `antagonists.${antagonist?.name}.statements.${statement}`,
              player: false,
            },
          ])
          soundEffectsOn && playChatSound()
        }, ANSWER_DELAY * 2.5)
        break
      case ANSWER_TYPES.WRONG:
        soundEffectsOn && playWrongAnswerSound()
        setLines((prev) => [
          ...prev,
          {
            text: `cards.${currentCard.id}.answerline`,
            player: true,
          },
        ])
        setCurrentState(state)
        setWrongAnswers()
        setAnsweredIncorrectly((prev) => prev + 1)
        setTimeout(() => {
          soundEffectsOn && playChatSound()
          setLines((prev) => [
            ...prev,
            {
              text: genericAnswers + randomWrongAnswer + '.text',
              player: false,
              wrongAnswer: true,
            },
          ])
          answeredIncorrectly === 0 && setShowOwl(OWLS.ENABLE_CARD)
        }, ANSWER_DELAY)

        setTimeout(() => {
          setLines((prev) => [
            ...prev,
            {
              text: `antagonists.${antagonist.name}.statements.${statement}`,
              player: false,
            },
          ])
          soundEffectsOn && playChatSound()
        }, ANSWER_DELAY * 2)

        break
      case ANSWER_TYPES.WIN:
        setActiveCardId(currentCard.id)
        setCorrectCard(currentCard.id)
        soundEffectsOn && playRightAnswerSound()

        setTimeout(() => {
          setCurrentState((prevState) => {
            return {
              ...(prevState as IGameState),
              cardHand: state.cardHand,
              progress: state.progress,
            }
          })
        }, ANSWER_DELAY)

        setTimeout(() => {
          soundEffectsOn && playVictorySound()
          setLines((prev) => [
            ...prev,
            {
              text,
              player: true,
            },
          ])
        }, ANSWER_DELAY * 2)

        setTimeout(() => {
          setCurrentState(state)
          setLines([
            {
              text: `antagonists.${antagonist.name}.winquote`,
              player: false,
            },
          ])
          setAntagonistComp(antagonist.components.end)
          addDefeatedAntagonist(antagonist)
        }, ANSWER_DELAY * 4)

        break
      case ANSWER_TYPES.LOSS:
        setLines([
          {
            text: `antagonists.${antagonist.name}.lossquote`,
            player: false,
          },
        ])
        // TODO: Create specific look for antagonist here
        // setAntagonistComp(antagonist.components.end.component)
        soundEffectsOn && playGameOverSound()
        break
      default:
        break
    }
  }

  const handleOpenQuiz = (type: 'boost' | 'game', card: ICard) => {
    setCurrentCard(card)
    setQuizType(type)
    handleModal()
  }

  const onCardSelected = (card: ICard) => {
    handleOpenQuiz('game', card)
  }

  const openBoost = (card: ICard) => {
    handleOpenQuiz('boost', card)
  }

  const handleWin = () => {
    setShowWinModal(true)
    setLines([])
  }

  const handleCancelScenario = () => {
    isScenarioMode ? router.push('/scenarios') : router.push('/home')
  }

  const handleReplay = () => {
    setCorrectCard(null)
    resetGameState()
    init()
  }

  const handleGotoLootBox = () => {
    setGameStateValue({ allowedLootbox: true, gameEnvironment: environment })
    router.push('/loot-box')
  }

  const handleModal = async () => {
    setShowModal(!showModal)
    document?.querySelector('html')?.classList.toggle('scroll-lock')
  }

  const handleQuizAnswer = (isCorrect: boolean) => {
    handleModal()
    if (isCorrect) {
      switch (quizType) {
        case 'game':
          onPlayCard()
          break
        case 'boost':
          updateTokens(1)
          if (currentCard) {
            setBoostedCards([...boostedCards, currentCard.id])
          }
          break
      }
    }
  }

  // TODO: Can probably remove this when antagonist gets set at other point
  if (!currentState?.antagonist) {
    return null
  }

  return (
    <main className={styles.main} style={{ backgroundColor: bgColor }}>
      <div className={styles.wrapper}>
        {environment && <Environment environment={environment} />}
        {antagonistComp && <Antagonist antagonist={antagonistComp} />}
      </div>
      <Healthbar health={currentState.progress} />
      <div className={styles.tokenWrapper}>
        <AnimatePresence>
          {ownedTokens > 0 && <Token ownedTokens={ownedTokens} />}
        </AnimatePresence>
      </div>
      <OwlTips showOwl={showOwl} setShowOwl={setShowOwl} />
      <div className={styles.playerWrapper}>
        {!isScenarioMode && (
          <div className={styles.avatarWrapper}>
            <Avatar />
          </div>
        )}
        {currentState.state === GAME_STATES.INTRO && (
          <>
            {activeAntagonist && (
              <GameIntro
                antagonist={activeAntagonist}
                showModal={showIntro}
                handleIntro={handleIntro}
              />
            )}
          </>
        )}
      </div>
      {currentState.state !== GAME_STATES.INTRO &&
        currentState.state !== GAME_STATES.RETRY && (
          <>
            <div
              ref={scrollableRef}
              className={`${styles.chatBubbleWrapper} ${styles[chatBubblePosition]}`}
            >
              {lines.map((line, index) => {
                const selectedCard = cards.find(
                  (card) => card.id === correctCard
                )

                return (
                  <ChatBubble
                    key={index}
                    statement={line.text}
                    player={line.player}
                    wrongAnswer={line.wrongAnswer || false}
                    arrowRight={arrowPosition === 'right'}
                    miniCard={
                      !isMobile &&
                      selectedCard?.id &&
                      t(`cards.${selectedCard?.id}.answerline`) === t(line.text)
                        ? selectedCard?.image
                        : null
                    }
                    cta={
                      currentState.state === GAME_STATES.WIN ? (
                        <Button
                          variant={ButtonVariant.SECONDARY}
                          size={ButtonSize.SMALL}
                          onClick={handleWin}
                        >
                          {t('continue')}
                        </Button>
                      ) : null
                    }
                  />
                )
              })}
            </div>
          </>
        )}
      <div className={styles.cancelWrapper}>
        <Button
          onClick={handleCancelScenario}
          variant={ButtonVariant.SECONDARY}
          size={ButtonSize.MEDIUM}
        >
          {t('cancel')}
        </Button>
      </div>
      {currentState.state === GAME_STATES.GAME &&
        (isMobile ? (
          <MobileCardHand
            removeTokens={removeTokens}
            openBoost={openBoost}
            setCurrentState={setCurrentState}
            cards={currentState.cardHand}
            onCardSelected={onCardSelected}
            cardSelectText={t('carddata.playcard')}
            boostedCards={boostedCards}
            tokens={ownedTokens}
            boostable={true}
            centeredCard={activeCardId}
            correctCard={correctCard}
            interactive={!activeCardId}
            isPersuade={true}
          />
        ) : (
          <CardHand
            removeTokens={removeTokens}
            openBoost={openBoost}
            setCurrentState={setCurrentState}
            cards={currentState.cardHand}
            onCardSelected={onCardSelected}
            cardSelectText={t('carddata.playcard')}
            boostedCards={boostedCards}
            tokens={ownedTokens}
            boostable={true}
            centeredCard={activeCardId}
            correctCard={correctCard}
            interactive={!activeCardId}
          />
        ))}
      {currentState.state === GAME_STATES.RETRY && (
        <Retry
          message={{
            heading: 'Owl.persuasiondone.losstext.header',
            body: 'Owl.persuasiondone.losstext.body',
          }}
          onReplay={handleReplay}
          isScenarioMode={isScenarioMode}
        />
      )}
      {showWinModal && (
        <PersuasionWin
          onLootBox={handleGotoLootBox}
          isScenarioMode={isScenarioMode}
        />
      )}

      {showModal && currentCard && (
        <Quiz
          onAnswer={handleQuizAnswer}
          card={currentCard}
          onModalClose={handleQuizModal}
        />
      )}
    </main>
  )
}
