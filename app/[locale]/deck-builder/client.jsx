'use client'

import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { getHandSuggestion, resetNewCards } from '@/api/engine'
import {
  getCardCollection,
  getCardHand,
  getShownChangeHandTip,
  getShownNoUndefeatedTip,
  readDefeatedAntagonists,
  setCardCollection,
  setCardHand,
  setShownChangeHandTip,
  setShownNoUndefeatedTip,
} from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import antagonists from '@/data/antagonists.json'
import { useRouter } from '@/navigation'
import { MAX_CARDS } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Button } from '../components/Button'
import { CardHand } from '../components/CardHand'
import { MobileCardHand } from '../components/CardHand/MobileCardHand'
import { CardList } from '../components/CardList'
import { TabFilter } from '../components/Filter/TabFilter'
import { Folder } from '../components/Folder'
import { Trashbin } from '../components/Icons/Trashbin'
import { Link } from '../components/Link/Link'
import { OwlDialogue } from '../components/OwlDialogue'
import styles from './DeckBuilder.module.scss'

const CHANGE_HAND_SUGGESTIONS = 0

export const DeckBuilderClient = () => {
  const t = useTranslations()

  const [allCards, setAllCards] = useState([])
  const [myCards, setMyCards] = useState([])
  const [suggestHandError, setSuggestHandError] = useState(null)
  const [showHandError, setShowHandError] = useState(true)
  const [filter, setFilter] = useState(null)

  const [animate, trigger] = useAnimation({ scale: 1.2 })
  const router = useRouter()

  const {
    isMobile,
    toggleThemeSound,
    options: { themeMusicOn, themeVolume },
  } = useOptionsContext()
  const FULL_HAND = myCards.length === MAX_CARDS

  useEffect(() => {
    setAllCards(allCards)
  }, [filter, allCards])

  useEffect(() => {
    trigger()
  }, [myCards, trigger])

  useEffect(() => {
    toggleThemeSound()
  }, [themeMusicOn, themeVolume, toggleThemeSound])

  useEffect(() => {
    async function setCardsFromStorage() {
      const [cardCollection, cardHand] = await Promise.all([
        getCardCollection(),
        getCardHand(),
      ])
      setMyCards(cardHand)

      if (cardHand.length > 0) {
        const newAllCards = cardCollection.filter(
          (card) => !cardHand.some((c) => c.id === card.id)
        )
        setAllCards(newAllCards)
      } else {
        setAllCards(cardCollection)
      }
    }

    setCardsFromStorage()
  }, [])

  async function getSuggestedHand() {
    // get a random hand with playable scenario
    // if no new scenario, save error owl
    const [cardCollection, shownChangeHandTip, defeated, shownNoUndefeatedTip] =
      await Promise.all([
        getCardCollection(),
        getShownChangeHandTip(),
        readDefeatedAntagonists(),
        getShownNoUndefeatedTip(),
      ])

    try {
      const result = getHandSuggestion(cardCollection, antagonists, defeated)
      if (
        cardCollection.length >= MAX_CARDS &&
        shownChangeHandTip >= CHANGE_HAND_SUGGESTIONS
      ) {
        addSuggestedHand(result.playableHand)
      }
      if (result.error && !shownNoUndefeatedTip) {
        setShownNoUndefeatedTip(true)
        setSuggestHandError({
          heading: `Owl.${result.error}.heading`,
          body: `Owl.${result.error}.body`,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function addSuggestedHand(suggestedHand) {
    // new Set improves the performance of the filter method
    const suggestedIds = new Set(suggestedHand.map((s) => s.id))
    const cardsGoingBack = myCards.filter((c) => !suggestedIds.has(c.id))
    const cardsLeft = allCards.filter((c) => !suggestedIds.has(c.id))

    setAllCards([...cardsLeft, ...cardsGoingBack])
    const hand = await resetNewCards(suggestedHand)
    setMyCards(hand)
    setShownChangeHandTip(0)
  }

  function moveCardBack(card) {
    const newMyCards = [...myCards]
    newMyCards.splice(
      newMyCards.findIndex((newCard) => newCard.id === card.id),
      1
    )
    setMyCards(newMyCards)
    const newAllCards = [...allCards, card]
    newAllCards.sort((a, b) => (a.id > b.id ? 1 : -1))
    setAllCards(newAllCards)
  }

  async function saveToStorage() {
    const cardCollection = (await getCardCollection()) || []
    const updatedCardCollection = resetNewCards(cardCollection)
    setCardCollection(updatedCardCollection)

    if (FULL_HAND) {
      await setCardHand(myCards)
      router.push('/home')
      return
    }
  }

  function clearCardHand() {
    const newAllCards = [...allCards, ...myCards]
    newAllCards.sort((a, b) => (a.id > b.id ? 1 : -1))
    setAllCards(newAllCards)
    setMyCards([])
  }

  return (
    <>
      {!isMobile && <div className={styles.blurBkgd} />}
      <div className={styles.opacityBkgd} />
      <div className={styles.wrapper}>
        <TabFilter
          filter={filter}
          setFilter={setFilter}
          JSONsource={allCards}
        />

        {/* We are not using filter on mobile for now */}
        {/* 
              <ButtonFilter
                filter={filter}
                setFilter={setFilter}
                JSONsource={allCards}
              /> 
             */}
        <div className={styles.headerLink}>
          <Link to='/home' variant='secondary' size='small'>
            {t('cancel')}
          </Link>
        </div>
        <div className={styles.folderTop}>
          <div>
            <h1 className={styles.title}>{t('deckbuilder.heading')}</h1>
            {!isMobile && (
              <p className={styles.title}>{t('deckbuilder.preamble')}</p>
            )}
          </div>
        </div>
        <div className={styles.handOwl}>
          <OwlDialogue
            heading={!isMobile && 'Owl.suggesthand.heading'}
            body={
              isMobile ? 'Owl.suggesthand.bodymobile' : 'Owl.suggesthand.body'
            }
            setShowOwl={() => {}}
            cta={t('Owl.suggesthand.cta')}
            onClick={getSuggestedHand}
            small
            vertical
          />
        </div>
        {suggestHandError && showHandError && (
          <motion.div
            className={styles.owlWrapper}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
          >
            <OwlDialogue
              heading={suggestHandError.heading}
              body={suggestHandError.body}
              setShowOwl={() => {
                setSuggestHandError(null)
                setShowHandError(false)
              }}
            />
          </motion.div>
        )}
        <div className={styles.folder}>
          {isMobile ? (
            <CardList
              setMyCards={setMyCards}
              myCards={myCards}
              allCards={allCards}
              setAllCards={setAllCards}
              filter={filter}
              filterType='category'
            />
          ) : (
            <Folder>
              <CardList
                setMyCards={setMyCards}
                myCards={myCards}
                allCards={allCards}
                setAllCards={setAllCards}
                filter={filter}
                filterType='category'
              />
            </Folder>
          )}
        </div>
      </div>
      <div
        className={`${isMobile ? styles.playWrapperMobile : ''} ${
          styles.playWrapper
        }`}
      >
        <Button
          onClick={saveToStorage}
          variant='huge'
          data-click='start-button'
          disabled={myCards.length < MAX_CARDS}
        >
          {t('play')}
        </Button>
        <div className={styles.infoWrapper}>
          <p className={`${styles.infoText} noRightLeft`} aria-live='polite'>
            <motion.span animate={animate}>{myCards.length}</motion.span>
            {isMobile
              ? t('deckbuilder.cardsselectedmobile', {
                  maxcards: MAX_CARDS,
                })
              : t('deckbuilder.cardsselected', {
                  maxcards: MAX_CARDS,
                })}
          </p>
        </div>
      </div>
      {!!myCards.length &&
        (isMobile ? (
          <MobileCardHand
            onCardSelected={moveCardBack}
            cardSelectText={t('carddata.remove')}
            cards={myCards}
            isDeckBuilder={true}
          />
        ) : (
          <CardHand
            onCardSelected={moveCardBack}
            cardSelectText={t('carddata.remove')}
            cards={myCards}
            isDeckBuilder={true}
          />
        ))}
      <div className={`${styles.btnEmpty} ${!myCards.length ? 'sr-only' : ''}`}>
        <Button
          // variant={isMobile ? 'secondary' : 'simple'}
          variant='secondary'
          size='small'
          disabled={!myCards.length}
          onClick={clearCardHand}
        >
          {!isMobile && t('deckbuilder.emptyhand')}
          <Trashbin />
        </Button>
      </div>
    </>
  )
}
