'use client'

import { useState } from 'react'
import { doc, getDoc } from 'firebase/firestore/lite'
import { useTranslations } from 'next-intl'
import { db } from '@/utils/firebase'
import { STAT_COLLECTION_NAMES } from '@/utils/constants'
import styles from './Stats.module.scss'
import { unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'
import { Button } from '../components/Button'
import { Loader } from '../components/Loader'

const FRIEND = 'mellon'
type StatsData = {
  [key: string]: { totalVisits: number; monthlyVisits: number }
}
// TODO: Don't index this page

const Stats: React.FC = () => {
  const [data, setData] = useState<StatsData>({})

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasError, setHasError] = useState('')

  const t = useTranslations()

  const [inputValue, setInputValue] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (inputValue === FRIEND) {
      setIsLoggedIn(true)
      fetchCounts()
    }
  }

  const fetchCounts = async () => {
    const year = new Date().getFullYear().toString()
    const newData: StatsData = {}

    try {
      for (const docName of Object.values(STAT_COLLECTION_NAMES)) {
        const docRef = doc(db, year, docName)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const docData = docSnap.data()
          const totalVisits = docData.total_visits
          const monthlyVisits = docData.monthly_visits

          newData[docName] = { totalVisits, monthlyVisits }
        }
      }
      setData(newData)
    } catch (e) {
      if (e instanceof Error) {
        setHasError(e.message)
      }
      console.error('An error occurred: ', e)
    }
  }

  if (!isLoggedIn) {
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

  if (hasError !== '') {
    return (
      <main className={styles.wrapper}>
        <h1>Hoppsan! Nu har något gått helt åt fanders!</h1>
        <p>Servern svarade: {hasError}</p>
      </main>
    )
  }

  if (isLoggedIn && (!data || Object.keys(data).length === 0)) {
    return (
      <main className={styles.wrapper}>
        <Loader />
      </main>
    )
  }

  return (
    <>
      <main className={styles.wrapper}>
        <h1>Statistik</h1>
        {Object.keys(data).map((collection) => (
          <section key={collection} className={styles.container}>
            <h2>{t(`statistics.${collection}`)}</h2>
            <p>Totalt antal under året: {data[collection].totalVisits}</p>
            <h3>Månadsvis</h3>
            <table>
              <tbody>
                <tr>
                  <th>Månad</th>
                  {Object.keys(data[collection].monthlyVisits).map((month) => (
                    <td key={`${collection}-${month}`}>
                      {t(`statistics.${month.split('-')[1]}`)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Antal</th>
                  {Object.values(data[collection].monthlyVisits).map(
                    (visits, index) => (
                      <td key={`${index}-${visits}`}>{visits}</td>
                    )
                  )}
                </tr>
              </tbody>
            </table>
          </section>
        ))}
      </main>
    </>
  )
}
export default Stats
