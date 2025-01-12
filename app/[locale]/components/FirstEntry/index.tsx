import ChatBubble from '../ChatBubble'
import styles from './FirstEntry.module.scss'

interface Props {
  i18nKey: string
  startGame: (i18nKey: string) => void
  arrowRight: boolean
  arrowBottomLeft?: boolean
  style?: string
}

export const FirstEntry: React.FC<Props> = ({
  i18nKey,
  startGame,
  arrowRight,
  arrowBottomLeft = false,
}) => {
  return (
    <button onClick={() => startGame(i18nKey)} className={styles.dialogBtn}>
      <ChatBubble
        statement={i18nKey}
        player={true}
        arrowRight={arrowRight}
        arrowBottomLeft={arrowBottomLeft}
      />
    </button>
  )
}
