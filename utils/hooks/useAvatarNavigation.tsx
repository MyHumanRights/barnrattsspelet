import { useCallback, useEffect, useState } from 'react'

import { getRandomAvatar } from '@/api/engine'
import { CATEGORIES } from '@/utils/constants'
import { IAvatar, IAvatarColors, IAvatarParts } from '@/utils/types'

interface UseAvatarNavigationProps {
  avatarCollection: IAvatarParts | null
  choices: IAvatar | null
  colors: IAvatarColors | null
  setChoices: (choices: IAvatar) => void
  sounds: Record<CATEGORIES, () => void>
  options: {
    soundEffectsOn: boolean
  }
}

export const useAvatarNavigation = ({
  avatarCollection,
  choices,
  colors,
  setChoices,
  sounds,
  options,
}: UseAvatarNavigationProps) => {
  const [index, setIndex] = useState<Record<CATEGORIES, number>>({
    [CATEGORIES.ACCESSORY]: 0,
    [CATEGORIES.BODY]: 0,
    [CATEGORIES.FACE]: 0,
    [CATEGORIES.HAIR]: 0,
  })

  // Update index when avatar collection changes
  useEffect(() => {
    if (avatarCollection && choices) {
      const newIndex = [
        CATEGORIES.ACCESSORY,
        CATEGORIES.BODY,
        CATEGORIES.FACE,
        CATEGORIES.HAIR,
      ].reduce(
        (acc: Record<CATEGORIES, number>, category) => {
          const idx =
            avatarCollection[category]?.findIndex(
              (svg) => svg.id === choices?.[category]?.id
            ) ?? 0
          acc[category] = idx + 1
          return acc
        },
        {
          [CATEGORIES.ACCESSORY]: 0,
          [CATEGORIES.BODY]: 0,
          [CATEGORIES.FACE]: 0,
          [CATEGORIES.HAIR]: 0,
        }
      )
      setIndex(newIndex)
    }
  }, [avatarCollection, choices])

  const handleClick = useCallback(
    (category: CATEGORIES, direction: number) => {
      if (!avatarCollection || !choices) return

      const categoryCollection = avatarCollection[category]
      const collectionLength = categoryCollection?.length ?? 0
      if (collectionLength === 0) return

      const currentIndex =
        categoryCollection?.findIndex(
          (svg) => svg.id === choices?.[category]?.id
        ) ?? 0
      const newIndex =
        (currentIndex + direction + collectionLength) % collectionLength

      // Play sound if enabled
      if (options.soundEffectsOn) sounds[category]()

      const newChoices = {
        ...choices,
        [category]: {
          ...choices[category],
          id: categoryCollection?.[newIndex].id,
        },
      }

      setChoices(newChoices)
      setIndex({ ...index, [category]: newIndex + 1 })
    },
    [avatarCollection, choices, index, options, sounds, setChoices]
  )

  const handleColorClick = useCallback(
    (category: CATEGORIES, color: string) => {
      if (!choices) return

      window.scrollTo(0, 0)

      // Create a new choices object with the updated color
      const newChoices = {
        ...choices,
        [category]: {
          ...choices[category],
          color,
        },
      }

      setChoices(newChoices)
    },
    [choices, setChoices]
  )

  const handleClickRandom = useCallback(() => {
    if (!avatarCollection || !colors) return

    const randomAvatar = getRandomAvatar(avatarCollection, colors)
    setChoices(randomAvatar)
  }, [avatarCollection, colors, setChoices])

  return {
    index,
    handleClick,
    handleColorClick,
    handleClickRandom,
  }
}
