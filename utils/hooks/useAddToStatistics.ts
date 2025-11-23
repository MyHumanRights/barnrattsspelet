import { doc, setDoc, updateDoc, increment } from 'firebase/firestore/lite'
import { useCallback, useRef } from 'react'
import { useStatsContext } from '@/contexts/StatsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { db } from '@/utils/firebase'

const DEVICE_COLLECTIONS = [
  STAT_COLLECTION_NAMES.DEVICE_MOBILE,
  STAT_COLLECTION_NAMES.DEVICE_TABLET,
  STAT_COLLECTION_NAMES.DEVICE_DESKTOP,
]

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

      const now = new Date()
      const year = `${now.getFullYear()}-next`
      const isDeviceTracking = DEVICE_COLLECTIONS.includes(docName)
      const docRef = doc(db, year, docName)

      // Use setDoc with merge behavior simulation via updateDoc for existing docs
      // This optimizes by using increment which doesn't require reading first
      try {
        if (isDeviceTracking) {
          // Device tracking: only store total count
          await updateDoc(docRef, {
            count: increment(1),
          })
        } else {
          // Regular tracking: store total + monthly breakdown
          const monthKey = `${now.getFullYear()}-${String(
            now.getMonth() + 1
          ).padStart(2, '0')}`

          await updateDoc(docRef, {
            total_visits: increment(1),
            [`monthly_visits.${monthKey}`]: increment(1),
          })
        }
      } catch (updateError: any) {
        // Document doesn't exist, create it
        if (updateError.code === 'not-found') {
          if (isDeviceTracking) {
            await setDoc(docRef, { count: 1 })
          } else {
            const monthKey = `${now.getFullYear()}-${String(
              now.getMonth() + 1
            ).padStart(2, '0')}`
            await setDoc(docRef, {
              total_visits: 1,
              monthly_visits: { [monthKey]: 1 },
            })
          }
        } else {
          throw updateError
        }
      }

      setStatFlags((prev) => ({ ...prev, [flagName]: false }))
    } catch (err) {
      console.error('Error adding to statistics', err)
    } finally {
      inFlightRef.current = false
    }
  }, [docName, flagName, statFlags, setStatFlags])

  return addToStatistics
}
