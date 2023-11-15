import { useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { useAnimation } from '@/utils/hooks/useAnimation'
import styles from './Token.module.scss'

interface Props {
  ownedTokens: number
  size?: 'small' | 'medium'
}

export const Token: React.FC<Props> = ({ ownedTokens, size = 'small' }) => {
  const t = useTranslations()
  const [animate, trigger] = useAnimation({ scale: 1.3 })

  useEffect(() => {
    trigger()
  }, [ownedTokens, trigger])

  const svgSize = () => {
    let height = 41
    let width = 43

    if (size === 'medium') {
      height = 62
      width = 64
    }
    return { width, height }
  }

  const { height, width } = svgSize()

  return (
    <>
      <motion.div
        className={`${styles.wrapper} ${styles[size]}`}
        initial={{ opacity: 0, scale: 0.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.2 }}
        transition={{ type: 'spring' }}
      >
        <div className={styles.banner}>
          <p className='sr-only'>{t('token.noOfTokens')}</p>
          <motion.span animate={animate} className={styles.tokenWrapper}>
            {ownedTokens}
          </motion.span>
        </div>
        <motion.div
          animate={animate}
          transition={{ type: 'spring', delay: 0.4 }}
          className={styles.image}
        >
          <Image
            src='/images/token.png'
            alt='Token'
            height={height}
            width={width}
          />
        </motion.div>
      </motion.div>
    </>
  )
}
