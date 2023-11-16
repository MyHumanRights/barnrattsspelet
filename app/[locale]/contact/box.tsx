'use client'

import { useEffect } from 'react'

export const Box = () => {
  useEffect(() => {
    console.log('useEffect')
  }, [])
  return (
    <div>
      <h1>Box</h1>
      <p>HEJ</p>
    </div>
  )
}
