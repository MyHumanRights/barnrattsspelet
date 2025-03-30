import { useCallback, useEffect, useState } from 'react'

import { getAvatar, getAvatarPartCollection } from '@/api/storage'
import avatarJson from '@/data/avatar.json'
import { IAvatar, IAvatarColors, IAvatarParts } from '@/utils/types'

export const useAvatarData = () => {
  const [avatarCollection, setAvatarCollection] = useState<IAvatarParts | null>(
    null
  )
  const [choices, setChoices] = useState<IAvatar | null>(null)
  const [colors, setColors] = useState<IAvatarColors | null>(null)
  const [activeColors, setActiveColors] = useState<{
    hair: string | null
    face: string | null
    body: string | null
  }>({
    hair: null,
    face: null,
    body: null,
  })

  // Update active colors whenever choices change
  useEffect(() => {
    if (choices) {
      setActiveColors({
        hair: choices.hair.color,
        face: choices.face.color,
        body: choices.body.color,
      })
    }
  }, [choices])

  const loadAvatarData = useCallback(() => {
    // Set colors from avatar JSON
    setColors(avatarJson.colors)

    // Get stored avatar and part collection
    const storedAvatar = getAvatar()
    const storedPartCollection = getAvatarPartCollection()

    // Set choices and avatar collection
    setChoices(storedAvatar)
    if (storedPartCollection) setAvatarCollection(storedPartCollection)

    // Initial active colors are set via the useEffect above
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
