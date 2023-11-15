import { useState, useRef } from 'react'

const useAvatarSVGImport = (options = {}) => {
  const ImportedIconRef = useRef(null)
  const [importedSVG, setImportedSVG] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const { onCompleted, onError } = options

  async function init(path) {
    setLoading(true)

    try {
      const { default: namedImport } = await import(
        `/assets/svgs/avatar/${path}.svg`
      )
      ImportedIconRef.current = namedImport
      setImportedSVG(ImportedIconRef.current)

      // ImportedIconRef.current = (
      //   await import(`/assets/svgs/avatar/${path}.svg`)
      // ).ReactComponent

      // setImportedSVG(ImportedIconRef.current)
      // if (onCompleted) {
      //   onCompleted(path, ImportedIconRef.current)
      // }
    } catch (err) {
      setImportedSVG(null)
      if (onError) {
        onError(err)
      }
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  async function resetSVG() {
    setImportedSVG(null)
  }

  return { init, resetSVG, error, loading, Svg: importedSVG }
}

export default useAvatarSVGImport
