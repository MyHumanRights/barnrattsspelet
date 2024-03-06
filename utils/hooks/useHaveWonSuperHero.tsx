import { useEffect, useState } from 'react'

import { getAvatarPartCollection } from '@/api/storage'

const useHaveWonSuperHero = () => {
  const [hasSuperhero, setHasSuperhero] = useState(false)

  useEffect(() => {
    func()
  }, [])

  const func = async () => {
    const avatarPartCollection = await getAvatarPartCollection()

    Object.entries(avatarPartCollection).forEach((category) => {
      const hasSuperheroParts =
        category[1]?.some((cat) => cat.isSuperHero === true) || false
      setHasSuperhero(hasSuperheroParts)
    })
  }

  return hasSuperhero
}

export default useHaveWonSuperHero
