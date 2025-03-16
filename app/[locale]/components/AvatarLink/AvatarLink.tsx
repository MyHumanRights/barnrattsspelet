import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Avatar } from '../Avatar'
import NewPart from '../Icons/NewPart'
import { Link } from '../Link/Link'
import styles from './AvatarLink.module.scss'

type Props = {
  hasNewParts: boolean
}

export const animationConfig = {
  rotation: 1,
  config: {
    type: 'spring',
    damping: 5,
    stiffness: 600,
  },
}

export const AvatarLink = ({ hasNewParts }: Props) => {
  const [animateAvatar, triggerAvatar] = useAnimation(animationConfig)
  const t = useTranslations()
  const avatarRef = useRef<HTMLAnchorElement>(null)

  return (
    <div className={styles.avatarLink}>
      <motion.div
        className={styles.linkWrapper}
        onClick={() => avatarRef.current?.click()}
        animate={animateAvatar}
        onMouseEnter={triggerAvatar}
      >
        <div className={styles.avatarWrapper}>
          {hasNewParts && (
            <div className={styles.newPart}>
              <NewPart />
              <p className='sr-only'>{t('home.newpart')}</p>
            </div>
          )}
          <Avatar
            link={
              <Link
                to='/avatar-builder'
                variant={ButtonVariant.TEXT}
                size={ButtonSize.MEDIUM}
                ref={avatarRef}
                fullWidth
              >
                {t('home.createavatar')}
              </Link>
            }
          />
        </div>
      </motion.div>
    </div>
  )
}
