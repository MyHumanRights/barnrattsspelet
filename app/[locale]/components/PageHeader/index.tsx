'use client'

import { motion } from 'framer-motion'

import { AppPathnames } from '@/config'
import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Link } from '../Link/Link'
import styles from './PageHeader.module.scss'

interface Props {
  buttonHref: AppPathnames
  buttonText: string
  buttonIcon?: React.ReactNode
  heading?: string
  [key: string]: any
}

export const PageHeader: React.FC<Props> = ({
  buttonText,
  buttonHref,
  buttonIcon,
  heading,
  ...linkProps
}) => {
  const [animate, trigger] = useAnimation({ y: -2 })

  return (
    <header className={styles.header}>
      <Link
        variant={ButtonVariant.SECONDARY}
        to={buttonHref}
        size={ButtonSize.SMALL}
        onMouseEnter={trigger}
        {...linkProps}
      >
        {buttonText}
        {buttonIcon && (
          <motion.span animate={animate}>{buttonIcon}</motion.span>
        )}
      </Link>
      {heading && <h1>{heading}</h1>}
    </header>
  )
}
