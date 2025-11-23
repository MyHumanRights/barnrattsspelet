'use client'

import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import useSound from 'use-sound'

import { Highlight } from '@/app/[locale]/components/Card/Highlight'
import flipSound from '@/assets/sounds/fx/09-flip-card.mp3'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import getIsBrightColor from '@/utils/getIsBrightColor'
import { useAnimation } from '@/utils/hooks/useAnimation'
import { IAnimation, ICard } from '@/utils/types'

import Repeat from '../Icons/Repeat'
import { Link } from '../Link/Link'
import { TextWithVoiceover } from '../TextWithVoiceover'
import styles from './Card.module.scss'

interface Props {
  which: ICard
  onClick?: () => void
  animation?: IAnimation
  disabledCard?: boolean
  size: 'small' | 'large' | 'medium' | 'appCard' | 'xsmall'
  isOpen?: boolean
  id?: string
  cardIndex?: string
  nonInteractive?: boolean
  highlight?: boolean
  isApp?: boolean
}

export const Card: React.FC<Props> = ({
  which,
  onClick,
  animation,
  disabledCard,
  size,
  isOpen,
  id,
  cardIndex,
  nonInteractive,
  highlight,
  isApp,
}) => {
  const t = useTranslations()
  const [isFocused, setIsFocused] = useState(false)
  const [hasTabFocus, setHasTabFocus] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const [animateFlip, triggerFlip] = useAnimation({ scale: 1.22 })

  const {
    options: {
      shouldReduceMotion,
      highContrast,
      soundEffectsOn,
      effectsVolume,
    },
  } = useOptionsContext()
  const [playActive] = useSound(flipSound, { volume: effectsVolume })

  const ref = useRef<HTMLButtonElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const cardBackRef = useRef<HTMLDivElement>(null)
  const cardBackTextRef = useRef<HTMLDivElement>(null)

  const transition = shouldReduceMotion
    ? {
        duration: 0.01,
      }
    : {
        type: 'spring' as const,
        mass: 2,
        stiffness: 40,
      }

  const renderAnimation = () => {
    if (!animation) return
    if (animation && isFocused && cardIndex !== id) {
      return animation.animate
    }
    return animation.initial
  }

  const handleClickOnCard = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if ((e.target as Element).getAttribute('data-button') === null) {
      // Don't trigger click if info button is clicked
      ref.current?.click()
    }
  }

  const flipCard = () => {
    soundEffectsOn && playActive()
    setIsFlipped(!isFlipped)
  }

  const handleTabKey = useCallback(
    (event: Event) => {
      const e = event as KeyboardEvent
      if (e.key !== 'Tab' || nonInteractive) return

      const isCardBackText = e.target === cardBackTextRef.current

      const focusableElements =
        cardBackRef.current!.querySelectorAll('a[href], button')
      const shouldFlip = Array.from(focusableElements).some(
        (el) => el === document.activeElement
      )
      setIsFlipped(shouldFlip || isCardBackText)

      const cardFocusableElements = cardRef.current!.querySelectorAll(
        'a[href], button, .cardBackText'
      )
      const tabFocusWithinCard = document.activeElement
        ? Array.from(cardFocusableElements).includes(document.activeElement)
        : false
      setHasTabFocus(tabFocusWithinCard)
    },
    [nonInteractive]
  )

  useEffect(() => {
    document.addEventListener('keyup', handleTabKey)
    return () => {
      document.removeEventListener('keyup', handleTabKey)
    }
  }, [handleTabKey])

  useEffect(() => {
    const el = cardBackTextRef.current
    if (el) {
      const curOverflow = el.style.overflow
      const shouldHideOverflow = !curOverflow || curOverflow === 'visible'
      const newOverflow = shouldHideOverflow ? 'hidden' : curOverflow
      el.style.overflow = newOverflow
      const isOverflowing = el.clientHeight < el.scrollHeight
      el.style.overflow = curOverflow
      if (isOverflowing) {
        el.setAttribute('tabIndex', '0')
        return
      }
      el.removeAttribute('tabIndex')
    }
  }, [isOpen])
  return (
    <motion.article
      layout
      id={id}
      className={`${
        disabledCard
          ? `${styles.disabledCardBorder} ${styles.wrapper} ${
              highContrast ? styles.highContrast : ''
            }`
          : `${styles.wrapper} ${highContrast ? styles.highContrast : ''}`
      }`}
      animate={renderAnimation()}
      onClick={onClick ? (e) => handleClickOnCard(e) : undefined}
      onMouseEnter={() => setIsFocused(true)}
      onMouseLeave={() => setIsFocused(false)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <div
        className={`${styles.cardContainer} ${styles[size]} ${
          disabledCard ? styles.disabledCard : ''
        }`}
      >
        <div
          className={`${styles.card} ${hasTabFocus && styles.tabFocus}`}
          style={{
            color: `${which.textColor}`,
            cursor: `${onClick ? 'cursor' : 'auto'}`,
          }}
          ref={cardRef}
        >
          {onClick && (
            <button className='sr-only' ref={ref} onClick={onClick}>
              {isOpen ? t('closeCard') : t('openCard')}
            </button>
          )}
          <motion.div
            className={`${styles.front} ${which.isNewCard && styles.newCard} ${
              highlight && styles.highlight
            }`}
            initial={{ rotateY: '0deg' }}
            animate={{ rotateY: isFlipped ? '180deg' : '0deg' }}
            transition={transition}
          >
            <div
              className={styles.frontInner}
              style={{
                backgroundImage: `url(${which.image})`,
              }}
            >
              <div className={styles.article}>{which.article}</div>
              {!nonInteractive && (
                <button
                  className={styles.flipButton}
                  onClick={flipCard}
                  onMouseEnter={triggerFlip}
                  data-button='info'
                  aria-label={t('carddata.showmoreinfo')}
                  style={{
                    color: which.iconColor ? which.iconColor : 'currentColor',
                  }}
                >
                  <motion.span
                    style={{
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                    animate={animateFlip}
                  >
                    <Repeat />
                  </motion.span>
                </button>
              )}
              {!nonInteractive && (
                <h1 className={styles.heading}>
                  <TextWithVoiceover
                    textKey={`cards.${which.id}.front`}
                    color={highContrast ? '#000' : which.textColor}
                  />
                </h1>
              )}
            </div>
            {highlight && <Highlight />}
          </motion.div>
          <motion.div
            className={`${styles.back} ${which.isNewCard && styles.newCard}`}
            initial={{ rotateY: '-180deg' }}
            animate={{ rotateY: isFlipped ? '0deg' : '-180deg' }}
            transition={transition}
            ref={cardBackRef}
          >
            <div
              className={styles.headerBack}
              style={{
                backgroundColor: highContrast ? 'black' : which.color,
                color:
                  !highContrast && getIsBrightColor(which.color)
                    ? 'black'
                    : 'white',
              }}
            >
              <p>
                {t('article')} {which.article}
              </p>
              {!nonInteractive && (
                <button
                  className={styles.flipButton}
                  style={{
                    backgroundColor: highContrast ? 'black' : which.color,
                    color:
                      !highContrast && getIsBrightColor(which.color)
                        ? 'black'
                        : 'white',
                  }}
                  onClick={flipCard}
                  onMouseEnter={triggerFlip}
                  data-button='flip-back'
                  aria-label={t('carddata.flipback')}
                >
                  <motion.span
                    style={{
                      display: 'block',
                      pointerEvents: 'none',
                    }}
                    animate={animateFlip}
                  >
                    <Repeat />
                  </motion.span>
                </button>
              )}
            </div>
            <section className={styles.mainBack}>
              <div
                className={`${styles.text} cardBackText`}
                ref={cardBackTextRef}
              >
                <h1 className={styles.headingBack}>
                  <TextWithVoiceover
                    textKey={`cards.${which.id}.back.heading`}
                  />
                </h1>
                <p className={styles.infoText}>
                  {t(`cards.${which.id}.back.body`)}
                </p>
              </div>
            </section>
            <div className={styles.footerBack}>
              <hr
                className={styles.divider}
                style={{ color: highContrast ? 'black' : which.color }}
              />
              <div className={styles.helpButton}>
                {!nonInteractive && !isApp && (
                  <Link
                    to={which.linkPath ? which.linkPath : '/help'}
                    variant={ButtonVariant.TEXT}
                    size={ButtonSize.LARGE}
                    aria-label={t('readmoreonhelp')}
                    target='_blank'
                    data-button='help'
                  >
                    {t('carddata.moreinfo')}
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.article>
  )
}
