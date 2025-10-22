import Image from 'next/image'

import styles from './MapBackground.module.scss'

interface Props {
  opacity?: number
}

export const MapBackground: React.FC<Props> = ({ opacity }) => {
  return (
    <Image
      priority
      className={styles.imageMap}
      src='/images/start/map-large.svg'
      alt='Karta'
      style={{ opacity: opacity || 0.25 }}
      width={1189}
      height={690}
    />
  )
}
