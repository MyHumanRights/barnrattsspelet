'use client'

import { AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import {
  answer,
  ANSWER_TYPES,
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
import { OWLS, STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { useAddToStatistics } from '@/utils/hooks/useAddToStatistics'
import { useTokens } from '@/utils/hooks/useTokens'
import { GAME_STATES } from '@/utils/types'

import { Antagonist } from '../components/Antagonist'
import { Avatar } from '../components/Avatar/'
import { Button } from '../components/Button'
import { CardHand } from '../components/CardHand'
import { MobileCardHand } from '../components/CardHand/MobileCardHand'
import { ChatBubble } from '../components/ChatBubble'
import { Environment } from '../components/Environment'
import { FirstEntry } from '../components/FirstEntry'
import { Healthbar } from '../components/Healthbar'
import { Modal } from '../components/Modal'
import { ModalContent } from '../components/Modal/ModalContent'
import { OwlTips } from '../components/OwlTips'
import { PersuasionWin } from '../components/PersuasionWin'
import { Retry } from '../components/PersuasionWin/Retry'
import { Token } from '../components/Token'
import styles from './Persuade.module.scss'

const ANSWER_DELAY = 1500
const CARD_EXIT = 800

export const PersuadeClient = () => {
  const t = useTranslations()
  const router = useRouter()
  // TODO: send antagonist as a param from scenario
  const genericAnswers = 'persuasion.genericwrongcardanswers.'

  const {
    isMobile,
    toggleThemeSound,
    options: { soundEffectsOn, effectsVolume },
  } = useOptionsContext()
  const [activeAntagonist, setActiveAntagonist] = useState(null)
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
  const [showOwl, setShowOwl] = useState(OWLS.INTRO)
  const [currentState, setCurrentState] = useState(false)
  const [environment, setEnvironment] = useState('')
  const [antagonistComp, setAntagonistComp] = useState()
  const [bgColor, setBgColor] = useState('none')
  const [chatBubblePosition, setChatBubblePosition] = useState()
  const [arrowPosition, setArrowPosition] = useState()
  const [currentCard, setCurrentCard] = useState()
  const [showModal, setShowModal] = useState(false)
  const [boostedCards, setBoostedCards] = useState([])
  const [activeCardId, setActiveCardId] = useState()
  const [isScenarioMode, setIsScenarioMode] = useState()
  const [hasShownFlipCardTip, setHasShownFlipCardTip] = useState(true)
  const [lines, setLines] = useState([])
  const [showWinModal, setShowWinModal] = useState(false)
  const [answeredIncorrectly, setAnsweredIncorrectly] = useState(0)
  const [correctCard, setCorrectCard] = useState(null)

  const scrollableRef = useRef(null)

  const randomWrongAnswer = Math.floor(Math.random() * 6) + 1
  const [ownedTokens, removeTokens] = useTokens(showModal)

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

  useEffect(() => {
    addFirstTimePersuation()

    const init = async () => {
      const gameStateAntagonist = await readGameStateValue('activeAntagonist')
      setActiveAntagonist(gameStateAntagonist)
      const cards = await getCardHand()
      const useAntagonist = antagonists[gameStateAntagonist]

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
    }

    init()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeAntagonist])

  useEffect(() => {
    // find svg background (floor) color
    const svgBgElement = document.getElementById('ENVIRONMENT_BACKGROUND')
    const color = svgBgElement?.style?.fill
    color && setBgColor(color)
  }, [environment])

  const addDefeatedAntagonist = async (antagonist) => {
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

  async function setFirstTimePlayingToFalse() {
    const playFromScenario = await getPlayFromScenario()
    !playFromScenario && (await setFirstTimePlaying(false))
  }

  const startGame = async (i18nK) => {
    setLines([
      {
        text: i18nK,
        player: true,
      },
    ])

    setFirstTimePlayingToFalse()
    setCurrentState(setGameState({ state: GAME_STATES.GAME }))
    setTimeout(() => {
      soundEffectsOn && playChatSound()
    }, 1200)
    setTimeout(() => {
      const useAntagonist = antagonists[activeAntagonist]
      const firstAntagonistLine = {
        text: `antagonists.${useAntagonist.name}.statements.0`,
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

  const onCardSelected = (card) => {
    const { result } = answer(card)

    const state = getGameState()
    const { statement, antagonist } = state

    // Store player's answer in array
    setLines((prev) => [
      ...prev,
      {
        text: `cards.${card.id}.answerline`,
        player: true,
      },
    ])

    // We need to delay on correct
    if (result !== ANSWER_TYPES.CORRECT && result !== ANSWER_TYPES.WIN) {
      setCurrentState(state)
    }

    switch (result) {
      case ANSWER_TYPES.CORRECT:
        setActiveCardId(card.id)
        setCorrectCard(card.id)
        soundEffectsOn && playRightAnswerSound()
        setTimeout(() => {
          setActiveCardId(null)
          setCurrentState(state)
          setLines((prev) => [
            ...prev,
            {
              text: `antagonists.${antagonist.name}.statements.${statement}`,
              player: false,
            },
          ])
          soundEffectsOn && playChatSound()
        }, ANSWER_DELAY)
        break
      case ANSWER_TYPES.WRONG:
        soundEffectsOn && playWrongAnswerSound()
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
        setActiveCardId(card.id)
        setCorrectCard(card.id)
        soundEffectsOn && playRightAnswerSound()

        setTimeout(() => {
          // update part of game state to delay process
          // animate correct card & progress
          setCurrentState((prevState) => {
            return {
              ...prevState,
              cardHand: state.cardHand,
              progress: state.progress,
            }
          })

          setTimeout(() => {
            soundEffectsOn && playVictorySound()
          }, ANSWER_DELAY * 0.5)

          setTimeout(() => {
            // update game state to show win scene
            setCurrentState(state)
            setLines([
              {
                text: `antagonists.${antagonist.name}.winquote`,
                player: false,
              },
            ])
            setAntagonistComp(antagonist.components.end)
            addDefeatedAntagonist(antagonist)
          }, ANSWER_DELAY * 0.8)
        }, ANSWER_DELAY)
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

  function handleWin() {
    setShowWinModal(true)
    setLines([])
  }

  function handleCancelScenario() {
    isScenarioMode ? router.push('/scenarios') : router.push('/home')
  }

  async function handleReplay() {
    setCorrectCard(null)
    resetGameState()
    init()
  }

  function handleGotoLootBox() {
    // setCardHand([])
    setGameStateValue({ allowedLootbox: true, gameEnvironment: environment })
    router.push('/loot-box')
  }

  async function handleModal() {
    setShowModal(!showModal)
    document.querySelector('html').classList.toggle('scroll-lock')
  }

  function openBoost(card) {
    // setShowOwl(false)

    // Temp check of card.question during dev.
    if (!card.quiz) return
    setCurrentCard(card)
    handleModal()
  }

  async function onCardBoosted(card) {
    setBoostedCards([...boostedCards, card.id])
  }

  // TODO: Can probably remove this when antagonist gets set at other point
  if (!currentState.antagonist) {
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
            <div className={styles.introA}>
              <FirstEntry
                i18nKey={`antagonists.${currentState.antagonist.name}.conversationEntries.a`}
                startGame={startGame}
                arrowRight={false}
                arrowBottomLeft={true}
              />
            </div>
            <div className={styles.introB}>
              <FirstEntry
                i18nKey={`antagonists.${currentState.antagonist.name}.conversationEntries.b`}
                startGame={startGame}
                arrowRight={true}
              />
            </div>
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
                      t(`cards.${selectedCard?.id}.answerline`) ===
                        t(line.text) &&
                      selectedCard?.image
                    }
                    cta={
                      currentState.state === GAME_STATES.WIN ? (
                        <Button
                          variant='secondary'
                          size='small'
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
          variant='secondary'
          size='medium'
        >
          {t('cancel')}
        </Button>
      </div>
      {currentState.state === GAME_STATES.GAME &&
        (isMobile ? (
          <MobileCardHand
            openBoost={openBoost}
            setCurrentState={setCurrentState}
            cards={currentState.cardHand}
            onCardSelected={onCardSelected}
            cardSelectText={t('carddata.playcard')}
            boostedCards={boostedCards}
            tokens={ownedTokens}
            boostable={true}
            exitTime={CARD_EXIT}
            centeredCard={activeCardId}
            removeTokens={removeTokens}
            correctCard={correctCard}
            interactive={!activeCardId}
            isPersuade={true}
          />
        ) : (
          <CardHand
            openBoost={openBoost}
            setCurrentState={setCurrentState}
            cards={currentState.cardHand}
            onCardSelected={onCardSelected}
            cardSelectText={t('carddata.playcard')}
            boostedCards={boostedCards}
            tokens={ownedTokens}
            boostable={true}
            exitTime={CARD_EXIT}
            centeredCard={activeCardId}
            removeTokens={removeTokens}
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

      <AnimatePresence>
        {showModal && (
          <Modal onModalClose={handleModal}>
            <ModalContent
              card={currentCard}
              addCardAction={true}
              onModalClose={handleModal}
              onCardBoosted={onCardBoosted}
            />
          </Modal>
        )}
      </AnimatePresence>
    </main>
  )
}
