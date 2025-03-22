import { useEffect, useRef } from 'react'

import { Environments } from '@/utils/types'

import styles from './Environment.module.scss'
import * as environmentComponents from './environments'

export const environments = {
  ...environmentComponents,
}

type Props = {
  environment: Environments
  onBackgroundColorChange?: (color: string) => void
}

export const Environment = ({
  environment,
  onBackgroundColorChange,
}: Props) => {
  const Environment = environments[environment]
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (wrapperRef.current && onBackgroundColorChange) {
      // Give React time to render the SVG
      setTimeout(() => {
        const svgBgElement = wrapperRef.current?.querySelector(
          '#ENVIRONMENT_BACKGROUND'
        )
        if (svgBgElement) {
          const computedColor = window.getComputedStyle(svgBgElement).fill
          onBackgroundColorChange(computedColor)
        }
      }, 0)
    }
  }, [environment, onBackgroundColorChange])

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <Environment />
    </div>
  )
}
