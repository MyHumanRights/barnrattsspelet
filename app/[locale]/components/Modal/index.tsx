import { motion } from 'motion/react'
import { PropsWithChildren, useCallback, useEffect, useRef } from 'react'

import Portal from '../Portal/Portal'
import styles from './Modal.module.scss'

interface Props {
  [key: string]: any
}

export const Modal: React.FC<PropsWithChildren<Props>> = ({
  children,
  onModalClose,
}) => {
  // Element that was focused when opening the modal
  const activeElement = document.activeElement as HTMLElement
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current) {
      const focusableModalElements = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select'
      )
      const firstElement = focusableModalElements[0] as HTMLElement
      if (firstElement) {
        firstElement.focus()
      }
    }
  }, [])

  const handleTabKey = useCallback(
    (e: KeyboardEvent) => {
      const focusableModalElements = modalRef.current!.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], input[type="submit"], select'
      )
      const firstElement = focusableModalElements[0] as HTMLElement
      const lastElement = focusableModalElements[
        focusableModalElements.length - 1
      ] as HTMLElement

      if (!e.shiftKey && document.activeElement === lastElement) {
        firstElement.focus()
        return e.preventDefault()
      }

      if (e.shiftKey && document.activeElement === firstElement) {
        lastElement.focus()
        e.preventDefault()
      }
    },
    [modalRef]
  )

  useEffect(() => {
    const keyListenersMap = new Map([
      ['Escape', onModalClose],
      ['Tab', handleTabKey],
    ])

    const keyListener = (e: KeyboardEvent) => {
      const listener = keyListenersMap.get(e.key)
      return listener && listener(e)
    }
    document.addEventListener('keydown', keyListener)
    return () => {
      document.removeEventListener('keydown', keyListener)
      // Return focus to the previously focused element
      activeElement.focus()
    }
  }, [activeElement, handleTabKey, onModalClose])

  function onClickOutside(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    if ((e.target as HTMLElement).getAttribute('data-click') === 'outside') {
      onModalClose()
    }
  }

  const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
  }

  const modal = {
    hidden: { translateY: '-100%', opacity: 0 },
    visible: {
      translateY: 0,
      opacity: 1,
      transition: { delay: 0.3 },
    },
  }

  return (
    <>
      <motion.div
        variants={backdrop}
        initial='hidden'
        animate='visible'
        exit='hidden'
        className={styles.modal}
        role='dialog'
        aria-modal='true'
        onClick={(e) => onClickOutside(e)}
        data-click='outside'
      >
        <motion.div variants={modal} className={styles.content} ref={modalRef}>
          {children}
        </motion.div>
      </motion.div>
    </>
  )
}

export default Portal(Modal)
