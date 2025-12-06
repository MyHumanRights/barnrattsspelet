'use client'

import { AnimatePresence } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useEffect, useMemo, useRef, useState } from 'react'
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
  getPlayFromScenario,
  readDefeatedAntagonists,
  readWrongAnswers,
  saveProgress,
  setDefeatedAntagonists,
  setFirstTimePlaying,
  setGameStateValue,
  setWrongAnswers,
} from '@/api/storage'
import { OwlTips } from '@/app/[locale]/components/OwlTips'
import { PersuasionWin } from '@/app/[locale]/components/PersuasionWin'
import Retry from '@/app/[locale]/components/PersuasionWin/Retry'
import rightAnswerSound from '@/assets/sounds/fx/01-correct-card-played.mp3'
import wrongAnswerSound from '@/assets/sounds/fx/02-incorrect-card-played.mp3'
import gameOverSound from '@/assets/sounds/fx/05-lose.mp3'
import chatSound from '@/assets/sounds/fx/08-talk.mp3'
import victorySound from '@/assets/sounds/fx/22-map-added-color.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonists from '@/data/antagonists.json'
import cards from '@/data/cards.json'
import { useRouter } from '@/i18n/navigation'
import {
  ANSWER_DELAY,
  ButtonSize,
  ButtonVariant,
  OWLS,
} from '@/utils/constants'
import { useAntagonist } from '@/utils/hooks/useAntagonist'
import useGameInit from '@/utils/hooks/useGameInit'
import { useHasWonAllAvatarParts } from '@/utils/hooks/useHasWonAllAvatarParts'
import { useHasWonAllCards } from '@/utils/hooks/useHasWonAllCards'
import useOwlTips from '@/utils/hooks/useOwlTips'
import useScrollLockModal from '@/utils/hooks/useScrollLockModal'
import { useTokens } from '@/utils/hooks/useTokens'
import { GAME_STATES, ICard, IGameAntagonist, IGameState } from '@/utils/types'

import { Antagonist } from '../components/Antagonist'
import { Avatar } from '../components/Avatar'
import { Button } from '../components/Button'
import { CardHand } from '../components/CardHand'
import { MobileCardHand } from '../components/CardHand/MobileCardHand'
import { ChatBubble } from '../components/ChatBubble'
import { Environment } from '../components/Environment'
import { GameIntro } from '../components/GameIntro'
import { Healthbar } from '../components/Healthbar'
import { Quiz } from '../components/Quiz'
import { Token } from '../components/Token'
import styles from './Persuade.module.scss'

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
  const [showOwl, setShowOwl] = useOwlTips()

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

  const [currentState, setCurrentState] = useState<IGameState | null>(null)
  const [bgColor, setBgColor] = useState('')
  const [currentCard, setCurrentCard] = useState<ICard | null>(null)
  const [boostedCards, setBoostedCards] = useState<string[]>([])
  const [activeCardId, setActiveCardId] = useState<string | null>(null)
  const [lines, setLines] = useState<Line[]>([])
  const [showWinModal, setShowWinModal] = useState(false)
  const [correctCard, setCorrectCard] = useState<string | null>(null)
  // manage scroll-lock for intro and quiz modals
  const [quizType, setQuizType] = useState<'boost' | 'game'>('game')
  const [isIntroOpen, toggleIntro] = useScrollLockModal(true)
  const [isQuizOpen, toggleQuiz] = useScrollLockModal(false)

  const scrollableRef = useRef<HTMLDivElement>(null)
  const [updateTokens, removeTokens, ownedTokens] = useTokens()
  const hasWonAllParts = useHasWonAllAvatarParts()
  const hasWonAllCards = useHasWonAllCards()

  const hasWonAllPartsAndCards = hasWonAllParts && hasWonAllCards
  const [isScenarioMode] = useState<boolean>(() => getPlayFromScenario())
  const answeredIncorrectly = useMemo<number>(() => readWrongAnswers(), [])

  // initialize game state and record first-time play
  useGameInit(antagonistType, setCurrentState)

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
    toggleIntro()
    startGame()
  }

  const addDefeatedAntagonist = (antagonist: IGameAntagonist) => {
    if (isScenarioMode) {
      return
    }

    let defeatedAntagonists = readDefeatedAntagonists()

    const isInDefeatedList = defeatedAntagonists?.find(
      (ant) => ant === antagonist.name
    )
    if (!isInDefeatedList) {
      defeatedAntagonists?.push(antagonist.name)
      setDefeatedAntagonists(defeatedAntagonists || [])
    }
  }

  const startGame = () => {
    setLines([
      {
        text: `antagonists.${antagonistType}.conversationEntries.a`,
        player: true,
      },
    ])

    !isScenarioMode && setFirstTimePlaying(false)
    setGameState({ state: GAME_STATES.GAME })
    setCurrentState(getGameState())
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

    const defeatedAntagonists = readDefeatedAntagonists()

    defeatedAntagonists?.length === 2 &&
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
          // Get the updated state after answer() has modified it
          const updatedState = getGameState()
          setCurrentState(updatedState)
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
          const currentGameState = getGameState()
          setLines((prev) => [
            ...prev,
            {
              text: `antagonists.${antagonist?.name}.statements.${currentGameState.statement}`,
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
        setCurrentState(getGameState())
        setWrongAnswers()
        setTimeout(() => {
          soundEffectsOn && playChatSound()
          setLines((prev) => [
            ...prev,
            {
              text:
                genericAnswers + (Math.floor(Math.random() * 6) + 1) + '.text',
              player: false,
              wrongAnswer: true,
            },
          ])
          answeredIncorrectly === 0 && setShowOwl(OWLS.ENABLE_CARD)
        }, ANSWER_DELAY)

        setTimeout(() => {
          const currentGameState = getGameState()
          setLines((prev) => [
            ...prev,
            {
              text: `antagonists.${antagonist.name}.statements.${currentGameState.statement}`,
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
          const updatedState = getGameState()
          setCurrentState((prevState) => {
            return {
              ...(prevState as IGameState),
              cardHand: updatedState.cardHand,
              progress: updatedState.progress,
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
          setCurrentState(getGameState())
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
    toggleQuiz()
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
    const state = getGameState()
    setCurrentState(state)
    setLines([])
    setBoostedCards([])
    setActiveCardId(null)
    setShowWinModal(false)
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

  const handleQuizAnswer = (isCorrect: boolean) => {
    toggleQuiz()
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

  // Show loading state while data is initializing
  if (!antagonist || !currentState) {
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
                showModal={isIntroOpen}
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

      {isQuizOpen && currentCard && (
        <Quiz
          onAnswer={handleQuizAnswer}
          card={currentCard}
          onModalClose={toggleQuiz}
        />
      )}
    </main>
  )
}
