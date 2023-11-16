'use client'

import { useEffect } from 'react'

export const AboutClient = () => {
  useEffect(() => {
    console.log('AboutClient')
  }, [])

  return (
    <>
      <h1>About Client</h1>
    </>
  )
}
