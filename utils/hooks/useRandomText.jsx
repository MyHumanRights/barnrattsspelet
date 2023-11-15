import { useEffect, useState } from 'react'
import { useTranslations } from 'next-intl'

export const useRandomText = (i18nPath, dependency = null) => {
  const i18n = useTranslations()
  const textObject = i18n(i18nPath)
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
