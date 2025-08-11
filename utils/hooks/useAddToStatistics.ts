import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
} from 'firebase/firestore/lite'
import { useCallback, useRef } from 'react'

import { useStatsContext } from '@/contexts/StatsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { db } from '@/utils/firebase'

const YEAR = new Date().getFullYear().toString() + '-next'

export const useAddToStatistics = (
  docName: STAT_COLLECTION_NAMES,
  flagName: STAT_FLAGS
) => {
  const { statFlags, setStatFlags } = useStatsContext()
  // guard against concurrent calls from rapid re-renders or multiple triggers
  const inFlightRef = useRef(false)

  const addToStatistics = useCallback(async () => {
    if (inFlightRef.current) return
    if (!statFlags[flagName]) return
    inFlightRef.current = true

    try {
      process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
        console.log('Adding to statistics', flagName)

      // Ensure the yearly collections and monthly documents are created
      // await createYearlyCollections(YEAR)

      // Proceed with adding statistics
      const docRef = doc(db, YEAR, docName)
      const docSnap = await getDoc(docRef)
      const currentMonth = getCurrentMonth()

      if (docSnap.exists()) {
        // Atomic increments to avoid race conditions
        await updateDoc(docRef, {
          total_visits: increment(1),
          [`monthly_visits.${currentMonth}`]: increment(1),
        })
      } else {
        // Create with initial counts
        await setDoc(
          docRef,
          {
            total_visits: 1,
            monthly_visits: {
              [currentMonth]: 1,
            },
          },
          { merge: true }
        )
      }
      // Update the context flag to prevent multiple increments (persisted via context)
      setStatFlags({ ...statFlags, [flagName]: false })
    } catch (err) {
      console.error('Error adding to statistics', err)
      // Optional: if the write failed, roll back the flag so a later attempt can retry
      setStatFlags((prev) => ({ ...prev, [flagName]: true }))
    }
    inFlightRef.current = false
  }, [docName, flagName, statFlags, setStatFlags])

  return addToStatistics
}

const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  return `${year}-${month}` // e.g. 2024-01
}
