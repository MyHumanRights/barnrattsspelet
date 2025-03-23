'use client'

import { AnimatePresence } from 'motion/react'
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
  readWrongAnswers,
  saveProgress,
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
import { useRouter } from '@/i18n/routing'
import {
  ButtonSize,
  ButtonVariant,
  OWLS,
  STAT_COLLECTION_NAMES,
  STAT_FLAGS,
} from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useAntagonist } from '@/utils/hooks/useAntagonist'
import { useHasWonAllAvatarParts } from '@/utils/hooks/useHasWonAllAvatarParts'
import { useHasWonAllCards } from '@/utils/hooks/useHasWonAllCards'
import { useTokens } from '@/utils/hooks/useTokens'
import { GAME_STATES, ICard, IGameAntagonist, IGameState } from '@/utils/types'

import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { Environment } from '../components/Environment'
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
const Quiz = dynamic(() => import('../components/Quiz').then((mod) => mod.Quiz))
const Token = dynamic(() =>
  import('../components/Token').then((mod) => mod.Token)
)

const ANSWER_DELAY = 1500

type Line = {
  text: string
  player: boolean
  wrongAnswer?: boolean
  miniCard?: string | null
}

export const PersuadeClient = () => {
  const t = useTranslations()
  const router = useRouter()

  const { antagonist, antagonistType } = useAntagonist()

  const genericAnswers = 'persuasion.genericwrongcardanswers.'

  const {
    isMobile,
    toggleThemeSound,
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
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
  const [bgColor, setBgColor] = useState('')
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
  const hasWonAllParts = useHasWonAllAvatarParts()
  const hasWonAllCards = useHasWonAllCards()

  const hasWonAllPartsAndCards = hasWonAllParts && hasWonAllCards

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
    if (!antagonist) return null

    const cards = await getCardHand()

    resetGameState()
    const currentState = setGameState({
      cardHand: cards,
    })
    setCurrentState(currentState)

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
  }, [antagonist])

  useEffect(() => {
    addFirstTimePersuation()
    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [init])

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
        text: `antagonists.${antagonistType}.conversationEntries.a`,
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
        antagonistType !== null ? antagonists[antagonistType] : null
      ) as IGameAntagonist
      const firstAntagonistLine = {
        text: useAntagonist
          ? `antagonists.${useAntagonist.name}.statements.0`
          : '',
        player: false,
        miniCard: null,
      }
      setLines((prev) => {
        // Check if an object with the same properties as firstAntagonistLine already exists in the array
        const exists = prev.some(
          (line) => line.text === firstAntagonistLine.text
        )
        if (exists) {
          return prev
        } else {
          return [...prev, firstAntagonistLine]
        }
      })
    }, 1200)

    const defeatedAntagonists = await readDefeatedAntagonists()

    defeatedAntagonists.length === 2 &&
      setTimeout(() => {
        setShowOwl(OWLS.QUIZ)
      }, 2000)
  }

  const onPlayCard = () => {
    if (!currentCard || !antagonist) {
      console.error('No current card')
      return
    }
    const { result } = answer(currentCard, antagonist)

    const state = getGameState()

    const { statement } = state

    if (result === ANSWER_TYPES.WIN) {
      saveProgress()
    }

    const text = getAnswerLine(antagonist)

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

        setTimeout(async () => {
          setCurrentState(state)
          setLines([
            {
              text: `antagonists.${antagonist.name}.winquote`,
              player: false,
            },
          ])
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
    if (hasWonAllPartsAndCards) {
      router.push('/home')
      return
    }

    setGameStateValue({
      allowedLootbox: true,
      gameEnvironment: antagonist?.components.background ?? 'ClassRoom',
    })
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
  if (!antagonist || !currentState?.state) {
    return null
  }

  return (
    <main className={styles.main} style={{ backgroundColor: bgColor }}>
      <div className={styles.wrapper}>
        <Environment
          environment={antagonist.components.background}
          onBackgroundColorChange={setBgColor}
        />
        <Antagonist
          antagonist={
            currentState.state === GAME_STATES.WIN
              ? antagonist.components.end!
              : antagonist.components.start!
          }
        />
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
            {antagonistType && (
              <GameIntro
                antagonist={antagonistType}
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
              className={`${styles.chatBubbleWrapper} ${
                styles[antagonist.chatBubblePosition]
              }`}
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
                    arrowRight={antagonist.antagonistPosition === 'right'}
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
          hasWonAllPartsAndCards={hasWonAllPartsAndCards}
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
