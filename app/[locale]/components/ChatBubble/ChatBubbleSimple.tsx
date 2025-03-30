import styles from './ChatBubbleSimple.module.scss'

type ChatBubbleSimpleProps = {
  arrow?: boolean
  children: React.ReactNode
}

export const ChatBubbleSimple = ({
  arrow = true,
  children,
}: ChatBubbleSimpleProps) => {
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
