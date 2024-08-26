'use client'

import { doc, getDoc } from 'firebase/firestore/lite'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'

import { STAT_COLLECTION_NAMES } from '@/utils/constants'
import { db } from '@/utils/firebase'

import { Loader } from '../components/Loader'
import { LogInForm } from './logInForm'
import styles from './Stats.module.scss'

const FRIEND = 'mellon'
const currentYear = new Date().getFullYear()

type StatsData = {
  [key: string]: { totalVisits: number; monthlyVisits: number }
}

export const StatsClient: React.FC = () => {
  const [data, setData] = useState<StatsData>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasError, setHasError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [isLoading, setIsLoading] = useState(false)

  const t = useTranslations()

  const years = Array.from({ length: currentYear - 2023 }, (_, i) => 2024 + i)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (inputValue === FRIEND) {
      setIsLoggedIn(true)
      fetchCounts(selectedYear.toString())
    }
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(+e.target.value)
    fetchCounts(e.target.value)
  }

  const fetchCounts = async (year: string) => {
    setIsLoading(true)
    const newData: StatsData = {}

    const dbName = year + '-beta'

    try {
      for (const docName of Object.values(STAT_COLLECTION_NAMES)) {
        const docRef = doc(db, dbName, docName)
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
    } finally {
      setIsLoading(false)
    }
  }

  if (!isLoggedIn) {
    return (
      <LogInForm
        handleLogin={handleLogin}
        inputValue={inputValue}
        setInputValue={setInputValue}
      />
    )
  }

  if (hasError !== '') {
    return (
      <>
        <h1>Hoppsan! Nu har något gått helt åt fanders!</h1>
        <p>Servern svarade: {hasError}</p>
      </>
    )
  }

  if (isLoggedIn && (!data || Object.keys(data).length === 0)) {
    return <Loader />
  }

  return (
    <>
      <h1>Statistik</h1>
      <section className={styles.container}>
        <label htmlFor='yearSelect' className={styles.label}>
          Välj år
        </label>
        <select
          id='yearSelect'
          className={styles.dropdown}
          value={selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </section>
      {isLoading ? (
        <Loader />
      ) : (
        Object.keys(data).map((collection) => (
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
        ))
      )}
    </>
  )
}
