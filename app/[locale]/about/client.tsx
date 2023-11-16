'use client'

import { ICard } from '@/utils/types'
import { useEffect } from 'react'

export const AboutClient = ({ cards }: { cards: ICard[] }) => {
  useEffect(() => {
    console.log(cards)
  }, [cards])

  return (
    <>
      <h1>About</h1>
    </>
  )
}
