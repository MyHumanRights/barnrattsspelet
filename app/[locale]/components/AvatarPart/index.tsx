import React, { useState, useEffect, useRef } from 'react'

interface Props {
  path: string
  fill: string
}

const AvatarPart: React.FC<Props> = ({ path, fill }) => {
  const ImportedIconRef = useRef(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)

    const importIcon = async () => {
      try {
        const { default: namedImport } = await import(
          `/assets/svgs/avatar/${path}.svg`
        )
        ImportedIconRef.current = namedImport
      } catch (err) {
        throw err
      } finally {
        setLoading(false)
      }
    }
    importIcon()
  }, [path])

  if (!loading && ImportedIconRef.current) {
    const { current: ImportedIcon } = ImportedIconRef
    // @ts-ignore
    return <ImportedIcon fill={fill} />
  }

  return null
}

export default AvatarPart
