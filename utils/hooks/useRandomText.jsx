import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

const useRandomText = (i18nPath, dependency = null) => {
  const { i18n } = useTranslation()
  const textObject = i18n.getResource(i18n.language, 'common', i18nPath)
  const textArray = Object.keys(textObject)
  const [randomText, setRandomText] = useState('')

  const randomFunc = () => {
    let randomlySelectedElement =
      textArray[Math.floor(Math.random() * textArray.length)]
    setRandomText(randomlySelectedElement)
  }

  useEffect(randomFunc, [textArray, dependency])

  return randomText
}

export default useRandomText
