import * as avatarPartComponents from './avatarParts'

export type AvatarPartKeys = keyof typeof avatarPartComponents

const avatarParts: Record<
  AvatarPartKeys,
  (props: { fill: string | undefined }) => JSX.Element
> = {
  ...avatarPartComponents,
}

export const AvatarPart = ({
  avatarPart,
  fill,
}: {
  avatarPart: AvatarPartKeys
  fill: string | undefined
}) => {
  const Part = avatarParts[avatarPart]

  if (!Part) {
    console.error(`Invalid avatarPart: ${avatarPart}`)
    return null
  }

  return <Part fill={fill} />
}
