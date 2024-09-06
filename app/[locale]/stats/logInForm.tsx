import { Dispatch, SetStateAction } from 'react'

import { Button } from '../components/Button'
import styles from './Stats.module.scss'

interface Props {
  handleLogin: (e: React.FormEvent) => void
  inputValue: string
  setInputValue: Dispatch<SetStateAction<string>>
}

export const LogInForm: React.FC<Props> = ({
  handleLogin,
  inputValue,
  setInputValue,
}) => {
  return (
    <main className={styles.wrapper}>
      <form onSubmit={handleLogin} className={styles.formWrapper}>
        <input
          type='password'
          placeholder='Skriv in lösenordet'
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
        <Button type='submit'>Logga in</Button>
      </form>
    </main>
  )
}
