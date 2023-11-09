import React, { useEffect, useState } from 'react'
import { getAvatar } from '../../api/storage'
import useAvatarSVGImport from '../../utils/hooks/useAvatarSVGImport'
import styles from './Avatar.module.scss'

const Avatar = ({ choices, link }) => {
  const [avatar, setAvatar] = useState()
  const { init: bodyInit, Svg: Body } = useAvatarSVGImport()
  const { init: faceInit, Svg: Face } = useAvatarSVGImport()
  const { init: hairInit, Svg: Hair } = useAvatarSVGImport()
  const { init: accessoryInit, resetSVG, Svg: Accessory } = useAvatarSVGImport()

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

  useEffect(() => {
    if (avatar) {
      bodyInit(`body/${avatar.body.id}`)
      faceInit(`face/${avatar.face.id}`)
      hairInit(`hair/${avatar.hair.id}`)
      avatar.accessory.id
        ? accessoryInit(`accessory/${avatar.accessory.id}`)
        : resetSVG()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar])

  return (
    <div className={styles.frame}>
      <div className={`${styles.avatarWrapper} ${choices && styles.builder}`}>
        {Face && <Face fill={avatar.face.color} />}
        {Body && <Body fill={avatar.body.color} />}
        {Hair && <Hair fill={avatar.hair.color} />}
        {Accessory && <Accessory fill={avatar.face.color} />}
      </div>
      {link && <div className={styles.linkWrapper}>{link}</div>}
    </div>
  )
}

export default React.memo(Avatar)
