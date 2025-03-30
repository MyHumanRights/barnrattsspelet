import { RefObject, useEffect } from 'react'

export const useTabKeyHandler = (
  formRef: RefObject<HTMLFormElement | null>
) => {
  useEffect(() => {
    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return

      const focusableElements = formRef.current?.querySelectorAll('input') || []
      focusableElements.forEach((el) => {
        const label = el.parentNode as HTMLElement
        label.style.outline = 'none'
      })

      const activeEl = Array.from(focusableElements).filter(
        (el) => el === document.activeElement
      )
      if (activeEl.length) {
        window.scrollTo(0, 0)
        const focussedLabel = activeEl[0]?.parentNode as HTMLElement
        focussedLabel.style.outline = '3px dashed black'
      }
    }

    document.addEventListener('keyup', handleTabKey)
    document.addEventListener('keydown', handleTabKey)

    return () => {
      document.removeEventListener('keyup', handleTabKey)
      document.removeEventListener('keydown', handleTabKey)
    }
  }, [formRef])
}
