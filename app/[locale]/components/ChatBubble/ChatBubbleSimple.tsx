import React, { PropsWithChildren } from 'react'
import styles from './ChatBubbleSimple.module.scss'

interface Props {
  arrow?: boolean
}

export const ChatBubbleSimple: React.FC<PropsWithChildren<Props>> = ({
  arrow = true,
  children,
}) => {
  return (
    <div
      className={`
        ${styles.bubble}
        ${arrow && styles.arrowDown}
      `}
    >
      {children}
    </div>
  )
}
