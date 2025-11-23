'use client'

import { collection, getDocs } from 'firebase/firestore/lite'
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react'

import { ButtonVariant, STAT_COLLECTION_NAMES } from '@/utils/constants'
import { db } from '@/utils/firebase'
import { DeviceStats, StatsData } from '@/utils/types'

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
  const [deviceStats, setDeviceStats] = useState<DeviceStats>({
    mobile: 0,
    tablet: 0,
    desktop: 0,
  })
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
      const newDeviceStats: DeviceStats = { mobile: 0, tablet: 0, desktop: 0 }

      try {
        // Use getDocs to read entire collection in one operation (1 read instead of 9+)
        const collectionRef = collection(db, dbName)
        const querySnapshot = await getDocs(collectionRef)

        querySnapshot.forEach((docSnap) => {
          const docName = docSnap.id
          const docData = docSnap.data()

          // Handle device statistics separately
          if (docName === STAT_COLLECTION_NAMES.DEVICE_MOBILE) {
            newDeviceStats.mobile = docData.count || 0
          } else if (docName === STAT_COLLECTION_NAMES.DEVICE_TABLET) {
            newDeviceStats.tablet = docData.count || 0
          } else if (docName === STAT_COLLECTION_NAMES.DEVICE_DESKTOP) {
            newDeviceStats.desktop = docData.count || 0
          } else {
            // Regular statistics with monthly breakdown
            newData[docName] = {
              totalVisits: docData.total_visits || 0,
              monthlyVisits: docData.monthly_visits || {},
            }
          }
        })

        // Initialize missing collections with zero values
        Object.values(STAT_COLLECTION_NAMES).forEach((docName) => {
          if (
            docName === STAT_COLLECTION_NAMES.DEVICE_MOBILE &&
            newDeviceStats.mobile === 0
          ) {
            // Already initialized
          } else if (
            docName === STAT_COLLECTION_NAMES.DEVICE_TABLET &&
            newDeviceStats.tablet === 0
          ) {
            // Already initialized
          } else if (
            docName === STAT_COLLECTION_NAMES.DEVICE_DESKTOP &&
            newDeviceStats.desktop === 0
          ) {
            // Already initialized
          } else if (!newData[docName]) {
            newData[docName] = {
              totalVisits: 0,
              monthlyVisits: {},
            }
          }
        })

        setData(newData)
        setDeviceStats(newDeviceStats)
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
        <>
          <section
            style={{
              marginBottom: '2rem',
              padding: '1rem',
              border: '1px solid #ccc',
              borderRadius: '8px',
            }}
          >
            <h2>Enhetsstatistik</h2>
            <p>Mobil: {deviceStats.mobile}</p>
            <p>Surfplatta: {deviceStats.tablet}</p>
            <p>Dator: {deviceStats.desktop}</p>
            <p>
              Totalt:{' '}
              {deviceStats.mobile + deviceStats.tablet + deviceStats.desktop}
            </p>
          </section>
          <StatsTable
            data={data}
            selectedYear={selectedYear}
            currentYear={currentYear}
            currentMonth={currentMonth}
          />
        </>
      )}
    </>
  )
}
