import React, { useEffect, useState } from 'react'
import AvatarPart from '../AvatarPart'
import { getAvatar } from '@/api/storage'
import styles from './Avatar.module.scss'

export const Avatar = ({ choices, link }) => {
  const [avatar, setAvatar] = useState()

  useEffect(() => {
    ;(async function () {
      if (!choices) {
        const storedAvatar = await getAvatar()
        setAvatar(storedAvatar)
      } else {
        setAvatar(choices)
      }
    })()
  }, [choices])

  return (
    <div className={styles.frame}>
      <div className={`${styles.avatarWrapper} ${choices && styles.builder}`}>
        {avatar && (
          <>
            <AvatarPart
              path={`face/${avatar.face.id}`}
              fill={avatar.face.color}
            />
            <AvatarPart
              path={`body/${avatar.body.id}`}
              fill={avatar.body.color}
            />
            <AvatarPart
              path={`hair/${avatar.hair.id}`}
              fill={avatar.hair.color}
            />
            {avatar.accessory.id && (
              <AvatarPart
                path={`accessory/${avatar.accessory.id}`}
                fill={avatar.accessory.color}
              />
            )}
          </>
        )}
      </div>
      {link && <div className={styles.linkWrapper}>{link}</div>}
    </div>
  )
}
