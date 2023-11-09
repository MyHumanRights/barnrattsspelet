import React, { useEffect, useState } from 'react'
import useAvatarSVGImport from '../../utils/hooks/useAvatarSVGImport'
import styles from './LootItemCard.module.scss'

const LootItemCard = ({ lootItem }) => {
  const [faceColor, setFaceColor] = useState()
  const [bodyColor, setBodyColor] = useState()
  const [hairColor, setHairColor] = useState()

  const {init: bodyInit, Svg: Body} = useAvatarSVGImport()
  const {init: faceInit, Svg: Face} = useAvatarSVGImport()
  const {init: hairInit, Svg: Hair} = useAvatarSVGImport()
  const {init: accessoryInit, Svg: Accessory} = useAvatarSVGImport()
  const { init: initBaseSVG, Svg: BaseSVG } = useAvatarSVGImport()

  useEffect(() => {
    initBaseSVG('base/avatar-base01')

    lootItem.map((item) => {
      if (item.category === 'face') {
        faceInit(`face/${item.id}`)
        setFaceColor(item.color)
      }
      if (item.category === 'body') {
        bodyInit(`body/${item.id}`)
        setBodyColor(item.color)
      }
      if (item.category === 'hair') {
        hairInit(`hair/${item.id}`)
        setHairColor(item.color)
      }
      if (item.category === 'accessory') {
        accessoryInit(`accessory/${item.id}`)
      }
      return null
    })
  }, [accessoryInit, bodyInit, faceInit, hairInit, initBaseSVG, lootItem])

  return (
    <article className={styles.wrapper}>
      <div className={styles.cardContainer}>
        <div
          className={styles.card}
        >
          <div
            className={styles.innerContainer}
            style={{
              backgroundColor: 'white'
            }}
          >
            {BaseSVG && <BaseSVG fill="gray" />}
            {Face && <Face fill={faceColor} />}
            {Body && <Body fill={bodyColor} />}
            {Hair && <Hair fill={hairColor} />}
            {Accessory && <Accessory fill="" />}
          </div>
        </div>
      </div>
    </article>
  )
}

export default LootItemCard