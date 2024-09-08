'use client'

import { doc, getDoc } from 'firebase/firestore/lite'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { ButtonVariant, STAT_COLLECTION_NAMES } from '@/utils/constants'
import { db } from '@/utils/firebase'
import { StatsData } from '@/utils/types'

import { Button } from '../components/Button'
import { Loader } from '../components/Loader'
import { StatsTable } from '../components/StatsTable'
import { YearSelector } from '../components/YearSelector'
import { LogInForm } from './logInForm'

const FRIEND = 'mellon'
const currentYear = new Date().getFullYear()
const currentMonth = new Date().getMonth() + 1 // getMonth() returns 0-11
const years = Array.from({ length: currentYear - 2023 + 1 }, (_, i) => 2023 + i) // [2023, 2024, ...]

export const StatsClient = () => {
  const [data, setData] = useState<StatsData>({})
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [hasError, setHasError] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [selectedYear, setSelectedYear] = useState(currentYear)
  const [isLoading, setIsLoading] = useState(false)
  const [seeOldStats, setSeeOldStats] = useState(false)

  const fetchCounts = useCallback(
    async (year: string) => {
      setIsLoading(true)
      const newData: StatsData = {}
      const dbName = seeOldStats ? year : year + '-next'

      try {
        const fetchPromises = Object.values(STAT_COLLECTION_NAMES).map(
          async (docName) => {
            const docRef = doc(db, dbName, docName)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
              const docData = docSnap.data()
              newData[docName] = {
                totalVisits: docData.total_visits,
                monthlyVisits: docData.monthly_visits,
              }
            } else {
              console.warn(`Document ${docName} does not exist in ${dbName}`)
              newData[docName] = {
                totalVisits: 0,
                monthlyVisits: {},
              }
            }
          }
        )

        await Promise.all(fetchPromises)
        setData(newData)
      } catch (e) {
        if (e instanceof Error) {
          setHasError(e.message)
        }
        console.error('An error occurred: ', e)
      } finally {
        setIsLoading(false)
      }
    },
    [seeOldStats, setIsLoading, setData, setHasError]
  )

  useEffect(() => {
    fetchCounts(selectedYear.toString())
  }, [selectedYear, fetchCounts, seeOldStats])

  const handleLogin = (e: FormEvent) => {
    e.preventDefault()
    if (inputValue === FRIEND) {
      setIsLoggedIn(true)
      fetchCounts(selectedYear.toString())
    }
  }

  const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const year = e.target.value
    setSelectedYear(+year)
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
        <h1>Hoppsan! Nu har något gått fel!</h1>
        <p>Servern svarade: {hasError}</p>
      </>
    )
  }

  if (isLoggedIn && (!data || Object.keys(data).length === 0)) {
    return <Loader />
  }

  const handleSelectStatsToView = () => {
    setSeeOldStats((prevState) => !prevState)
  }

  return (
    <>
      <h1>Statistik</h1>
      <Button onClick={handleSelectStatsToView} variant={ButtonVariant.SIMPLE}>
        {seeOldStats ? 'Se nuvarande statistik' : 'Statistik från gamla spelet'}
      </Button>
      <YearSelector
        years={years}
        selectedYear={selectedYear}
        handleYearChange={handleYearChange}
      />
      {isLoading ? (
        <Loader />
      ) : (
        <StatsTable
          data={data}
          selectedYear={selectedYear}
          currentYear={currentYear}
          currentMonth={currentMonth}
        />
      )}
    </>
  )
}
