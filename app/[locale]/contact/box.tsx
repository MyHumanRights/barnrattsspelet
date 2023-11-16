'use client'

import { useEffect } from 'react'

export const Box = () => {
  useEffect(() => {
    console.log('Box')
  }, [])
  return (
    <div>
      <h1>Box</h1>
      <p>HEJ</p>
    </div>
  )
}
