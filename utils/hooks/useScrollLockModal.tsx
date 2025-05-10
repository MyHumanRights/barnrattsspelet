import { useEffect, useState } from 'react'

type Toggle = () => void

/**
 * Manages an open/close boolean and toggles html.scroll-lock class.
 * Returns [isOpen, toggleOpen]
 */
export default function useScrollLockModal(
  defaultOpen = false
): readonly [boolean, Toggle] {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  useEffect(() => {
    document.querySelector('html')?.classList.toggle('scroll-lock', isOpen)
  }, [isOpen])

  const toggleOpen: Toggle = () => setIsOpen((prev) => !prev)

  return [isOpen, toggleOpen] as const
}
