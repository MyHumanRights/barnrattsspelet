import { Environments } from '@/utils/types'

import styles from './Environment.module.scss'
import * as environmentComponents from './environments'

export const environments = {
  ...environmentComponents,
}

type Props = {
  environment: Environments
}

export const Environment = ({ environment }: Props) => {
  const Environment = environments[environment]
  return (
    <div className={styles.wrapper}>
      <Environment />
    </div>
  )
}
