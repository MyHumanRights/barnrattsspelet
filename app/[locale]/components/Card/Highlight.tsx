import { motion } from 'framer-motion'

import styles from './Highlight.module.scss'

export const Highlight = () => (
  <div className={styles.higlightStars}>
    <motion.img
      alt='Gul stjärna'
      src='/svgs/star.svg'
      animate={{
        scale: [1.2, 0.8, 1.2, 0.8, 1.1, 0.9],
        rotate: -180,
      }}
      transition={{
        scale: { duration: 1, delay: 0.4 },
        rotate: { duration: 10 },
      }}
    />
    <motion.img
      alt='Gul stjärna'
      src='/svgs/star.svg'
      initial={{ rotate: -50 }}
      animate={{
        scale: [1.2, 0.8, 1.2, 0.8, 1.1, 0.9],
        rotate: -360,
      }}
      transition={{
        scale: { duration: 1, delay: 0.2 },
        rotate: { duration: 10 },
      }}
    />
    <motion.img
      alt='Gul stjärna'
      src='/svgs/star.svg'
      initial={{ rotate: 20 }}
      animate={{
        scale: [1.2, 0.8, 1.2, 0.8, 1.1, 0.9],
        rotate: 280,
      }}
      transition={{
        scale: { duration: 1 },
        rotate: { duration: 10 },
      }}
    />
  </div>
)
