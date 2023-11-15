import Image from 'next/image'
import styles from './MapBackground.module.scss'

interface Props {
  opacity?: number
}

export const MapBackground: React.FC<Props> = ({ opacity }) => {
  return (
    <Image
      className={styles.imageMap}
      src='/images/start/map-large.svg'
      alt='Karta'
      fill
      style={{ opacity: opacity || 0.25 }}
    />
  )
}
