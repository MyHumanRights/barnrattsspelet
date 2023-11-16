import styles from './Environment.module.scss'
import * as environmentComponents from './environments'

export const environments = {
  ...environmentComponents,
}

export const Environment = ({ environment }) => {
  const Environment = environments[environment]
  return (
    <div className={styles.wrapper}>
      <Environment />
    </div>
  )
}