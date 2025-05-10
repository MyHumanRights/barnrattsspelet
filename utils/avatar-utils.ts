import { AvatarPartKeys } from '@/app/[locale]/components/AvatarPart'

import { AvatarPart, IAvatar, IAvatarColors, IAvatarParts } from './types'

export const getRandomAvatar = (
  parts: IAvatarParts,
  colors: IAvatarColors
): IAvatar => {
  // Helper to get a random element from an array
  const getRandom = <T>(arr: T[]): T =>
    arr[Math.floor(Math.random() * arr.length)]

  // For each part, pick a random id and color (if available)
  const faceParts = parts.face ?? []
  const bodyParts = parts.body ?? []
  const hairParts = parts.hair ?? []
  const accessoryParts = parts.accessory ?? []

  const face = faceParts.length > 0 ? getRandom(faceParts).id : 'Face01'
  const body = bodyParts.length > 0 ? getRandom(bodyParts).id : 'Body01'
  const hair = hairParts.length > 0 ? getRandom(hairParts).id : 'Hair01'
  const accessory =
    accessoryParts.length > 0 ? getRandom(accessoryParts).id : 'Accessory01'

  return {
    face: {
      id: face as AvatarPartKeys,
      color:
        colors.face && colors.face.length > 0 ? getRandom(colors.face) : '',
    },
    body: {
      id: body as AvatarPartKeys,
      color:
        colors.body && colors.body.length > 0 ? getRandom(colors.body) : '',
    },
    hair: {
      id: hair as AvatarPartKeys,
      color:
        colors.hair && colors.hair.length > 0 ? getRandom(colors.hair) : '',
    },
    accessory: {
      id: accessory as AvatarPartKeys,
      // accessory color is not in IAvatarColors, so leave undefined
    },
  }
}

export const getDefaultAvatorParts = (parts: IAvatarParts) => {
  return Object.entries(parts).reduce((defaultParts, [key, value]) => {
    defaultParts[key] = value?.filter((svg) => svg.isDefault)
    return defaultParts
  }, {} as IAvatarParts)
}

const findCategoryById = (
  id: AvatarPartKeys,
  parts: IAvatarParts
): string | null => {
  for (const category in parts) {
    if (parts.hasOwnProperty(category) && Array.isArray(parts[category])) {
      const part = parts[category]?.find((part) => part.id === id)
      if (part) {
        return category
      }
    }
  }
  return null
}

export const getAvatarPartById = (
  id: AvatarPartKeys,
  parts: IAvatarParts,
  storedAvatar: IAvatar
) => {
  const key = findCategoryById(id, parts)

  if (!key) {
    console.error(`Part with id ${id} not found in any category`)
    return []
  }

  const avatarPart = {
    category: key,
    id: id,
    color: storedAvatar[key as keyof IAvatar].color,
  }

  return [avatarPart]
}

export const resetNewAvatarParts = (collectedParts: IAvatarParts | null) => {
  if (!collectedParts) return null
  let avatarPartsObject = {}

  Object.entries(collectedParts).forEach((category) => {
    const partsArray = category[1]?.map((c) => {
      return {
        ...c,
        isNewPart: false,
      }
    })

    avatarPartsObject = {
      ...avatarPartsObject,
      [category[0]]: partsArray,
    }
  })

  return avatarPartsObject
}

export const getNewAvatarParts = (
  collectedParts: IAvatarParts | null
): Array<{ category: string; id: AvatarPart['id'] }> => {
  if (!collectedParts) return []
  const newParts: Array<{ category: string; id: AvatarPart['id'] }> = []
  Object.entries(collectedParts).forEach(([category, items]) => {
    if (Array.isArray(items)) {
      items.forEach((item) => {
        if (item.isNewPart === true) {
          newParts.push({
            category,
            id: item.id,
          })
        }
      })
    }
  })
  return newParts
}
