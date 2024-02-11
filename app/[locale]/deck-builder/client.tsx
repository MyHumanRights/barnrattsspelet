'use client'

import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'

import { getCardCollection } from '@/api/storage'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { ICard } from '@/utils/types'

import { CardList } from '../components/CardList'
import { TabFilter } from '../components/Filter/TabFilter'
import { Folder } from '../components/Folder'
import { Link } from '../components/Link/Link'
import styles from './DeckBuilder.module.scss'

export const DeckBuilderClient = () => {
  const t = useTranslations()

  const [allCards, setAllCards] = useState<ICard[]>([])
  const [myCards, setMyCards] = useState<ICard[]>([])
  const [filter, setFilter] = useState<string | null>(null)

  const {
    isMobile,
    toggleThemeSound,
    options: { themeMusicOn, themeVolume },
  } = useOptionsContext()

  useEffect(() => {
    setAllCards(allCards)
  }, [filter, allCards])

  useEffect(() => {
    toggleThemeSound()
  }, [themeMusicOn, themeVolume, toggleThemeSound])

  useEffect(() => {
    async function setCardsFromStorage() {
      const cardCollection = await getCardCollection()

      setAllCards(cardCollection)
    }

    setCardsFromStorage()
  }, [])

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
          <Link
            to='/home'
            variant={ButtonVariant.SECONDARY}
            size={ButtonSize.SMALL}
          >
            {t('mainmenu.home')}
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
    </>
  )
}
