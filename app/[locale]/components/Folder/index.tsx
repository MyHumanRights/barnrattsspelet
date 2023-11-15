import { PropsWithChildren } from 'react'
import styles from './Folder.module.scss'
import Image from 'next/image'

export const Folder: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className={styles.folder}>
      <div className={styles.top}>
        <Image
          src='/svgs/folder/topp.svg'
          alt='topp'
          width={2144}
          height={47}
        />
      </div>
      <div
        className={styles.mainContent}
        style={{
          background: 'url("/images/folder/mitt.svg")',
        }}
      >
        {children}
      </div>
      <div className={styles.bottom}>
        <Image
          src='/svgs/folder/botten.svg'
          alt='bottom'
          height={51}
          width={2144}
          priority
        />
      </div>
      <div className={styles.bottom} />
    </div>
  )
}
