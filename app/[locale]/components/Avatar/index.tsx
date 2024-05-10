import React, { useEffect, useState } from 'react'

import { getAvatar } from '@/api/storage'
import { IAvatar } from '@/utils/types'

import { AvatarPart } from '../AvatarPart'
import styles from './Avatar.module.scss'

interface Props {
  choices?: IAvatar
  link?: JSX.Element
}

export const Avatar = ({ choices, link }: Props) => {
  const [avatar, setAvatar] = useState<IAvatar | null>(null)

  useEffect(() => {
    const fetchAvatar = async () => {
      const avatar = choices ? choices : await getAvatar()
      setAvatar(avatar)
    }

    fetchAvatar()
  }, [choices])

  return (
    <div className={styles.frame}>
      <div className={`${styles.avatarWrapper} ${choices && styles.builder}`}>
        {avatar && (
          <>
            <AvatarPart avatarPart={avatar.face.id} fill={avatar.face.color} />
            <AvatarPart avatarPart={avatar.body.id} fill={avatar.body.color} />
            <AvatarPart avatarPart={avatar.hair.id} fill={avatar.hair.color} />
            {avatar.accessory.id && (
              <AvatarPart
                avatarPart={avatar.accessory.id}
                fill={avatar.face.color}
              />
            )}
          </>
        )}
      </div>
      {link && <div className={styles.linkWrapper}>{link}</div>}
    </div>
  )
}
