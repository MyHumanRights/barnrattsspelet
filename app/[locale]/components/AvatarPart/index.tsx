import { forwardRef } from 'react'

import * as avatarPartComponents from './avatarParts'

export type AvatarPartKeys = keyof typeof avatarPartComponents

const avatarParts: Record<
  AvatarPartKeys,
  (props: { fill: string | undefined }) => React.JSX.Element
> = {
  ...avatarPartComponents,
}

export const AvatarPart = forwardRef<
  HTMLDivElement,
  { avatarPart: AvatarPartKeys; fill: string | undefined }
>(({ avatarPart, fill }, ref) => {
  const Part = avatarParts[avatarPart]

  if (!Part) {
    console.error(`Invalid avatarPart: ${avatarPart}`)
    return null
  }

  return (
    <div ref={ref}>
      <Part fill={fill} />
    </div>
  )
})

AvatarPart.displayName = 'AvatarPart'
