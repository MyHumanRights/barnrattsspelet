import { useCallback, useState } from 'react'

import { getAvatar, getAvatarPartCollection } from '@/api/storage'
import avatarJson from '@/data/avatar.json'
import { IAvatar, IAvatarColors, IAvatarParts } from '@/utils/types'

export const useAvatarData = () => {
  const [avatarCollection, setAvatarCollection] = useState<IAvatarParts | null>(
    null
  )
  const [choices, setChoices] = useState<IAvatar | null>(null)
  const [colors, setColors] = useState<IAvatarColors | null>(null)
  const activeColors: {
    hair: string | null
    face: string | null
    body: string | null
  } = choices
    ? {
        hair: choices.hair.color,
        face: choices.face.color,
        body: choices.body.color,
      }
    : {
        hair: null,
        face: null,
        body: null,
      }

  const loadAvatarData = useCallback(() => {
    // Set colors from avatar JSON
    setColors(avatarJson.colors)

    // Get stored avatar and part collection
    const storedAvatar = getAvatar()
    const storedPartCollection = getAvatarPartCollection()

    // Set choices and avatar collection
    setChoices(storedAvatar)
    if (storedPartCollection) setAvatarCollection(storedPartCollection)
  }, [])

  // Custom setter for choices that also updates active colors
  const updateChoices = useCallback((newChoices: IAvatar) => {
    setChoices(newChoices)
  }, [])

  return {
    avatarCollection,
    choices,
    colors,
    activeColors,
    setChoices: updateChoices,
    loadAvatarData,
  }
}
