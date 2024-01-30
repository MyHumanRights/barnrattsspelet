import { motion } from 'framer-motion'
import { useTranslations } from 'next-intl'

import { useOptionsContext } from '@/contexts/OptionsContext'

import { OwlDialogue } from '../OwlDialogue'
import styles from './LootBoxOwl.module.scss'

interface Props {
  lootItemOnly?: boolean
  showLootItem?: boolean
  isBuyingLootbox?: boolean | null
  fullLootAmount: number
  fullLoot?: boolean
  saveLootToStorage?: () => void
  saveCardsToStorage?: () => void
  hasLootItem?: boolean
  noCardsToWinFromHand: boolean
}

export const LootBoxOwl = ({
  lootItemOnly,
  showLootItem,
  isBuyingLootbox,
  fullLootAmount,
  fullLoot,
  saveLootToStorage,
  saveCardsToStorage,
  hasLootItem,
  noCardsToWinFromHand,
}: Props) => {
  const t = useTranslations()
  const {
    options: { shouldReduceMotion },
  } = useOptionsContext()

  const getOwlHeading = () => {
    if (isBuyingLootbox) {
      return !hasLootItem && fullLootAmount === 0
        ? `Owl.lootbox.boughtEmptyBox.heading`
        : `Owl.lootbox.bought${fullLootAmount}.heading`
    }
    if (lootItemOnly) {
      return 'Owl.lootbox.itemonly.heading'
    }
    if (showLootItem) {
      return null
    }
    return `Owl.lootbox.won1.heading`
  }

  const getOwlBody = () => {
    if (isBuyingLootbox) {
      return !hasLootItem && fullLootAmount === 0
        ? `Owl.lootbox.boughtEmptyBox.body`
        : `Owl.lootbox.bought${fullLootAmount}.body`
    }
    if (lootItemOnly) {
      return noCardsToWinFromHand
        ? 'Owl.lootbox.noCardsToWin.body'
        : 'Owl.lootbox.itemonly.body'
    }
    if (showLootItem) {
      return 'Owl.lootbox.item.body'
    }
    // return `Owl.lootbox.won${fullLootAmount}.body`
    return `Owl.lootbox.wonCardHand.body`
  }

  return (
    <motion.div
      key='carddialog'
      className={styles.owlWrapper}
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        opacity: 1,
        transition: {
          type: shouldReduceMotion ? 'tween' : 'spring',
          stiffness: 200,
          delay: shouldReduceMotion ? 0.01 : 2.5,
          duration: shouldReduceMotion ? 0.01 : 2.5,
        },
      }}
      exit={{
        scale: 0,
        opacity: 0,
        transition: {
          type: 'spring',
          stiffness: 200,
          duration: shouldReduceMotion ? 0.01 : 1,
        },
      }}
    >
      <OwlDialogue
        heading={getOwlHeading()}
        body={getOwlBody()}
        // cta={showLootItem || !hasLootItem ? t('done') : t('confirm')}
        cta={t('confirm')}
        onClick={showLootItem ? saveLootToStorage : saveCardsToStorage}
        hasOwnSound
        buttonHasOwnSound={showLootItem ? false : true}
      />
    </motion.div>
  )
}
