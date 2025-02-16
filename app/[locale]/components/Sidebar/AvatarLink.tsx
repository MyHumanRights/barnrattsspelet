import { motion } from 'motion/react'
import { useTranslations } from 'next-intl'
import { useRef } from 'react'

import { ButtonSize, ButtonVariant } from '@/utils/constants'
import { useAnimation } from '@/utils/hooks/useAnimation'

import { Avatar } from '../Avatar'
import NewPart from '../Icons/NewPart'
import { Link } from '../Link/Link'
import { animationConfig } from '.'
import styles from './Sidebar.module.scss'

type Props = {
  hasNewParts: boolean
}

export const AvatarLink = ({ hasNewParts }: Props) => {
  const [animateAvatar, triggerAvatar] = useAnimation(animationConfig)
  const t = useTranslations()
  const avatarRef = useRef<HTMLAnchorElement>(null)

  return (
    <motion.div
      className={styles.linkWrapper}
      onClick={() => avatarRef.current?.click()}
      animate={animateAvatar}
      onMouseEnter={triggerAvatar}
    >
      <div className={styles.linkContent}>
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
      </div>
    </motion.div>
  )
}
