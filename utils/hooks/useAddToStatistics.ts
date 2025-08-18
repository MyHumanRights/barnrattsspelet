import { doc, setDoc, getDoc, increment } from 'firebase/firestore/lite'
import { useCallback, useRef } from 'react'
import { useStatsContext } from '@/contexts/StatsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { db } from '@/utils/firebase'

export const useAddToStatistics = (
  docName: STAT_COLLECTION_NAMES,
  flagName: STAT_FLAGS
) => {
  const { statFlags, setStatFlags } = useStatsContext()
  // guard against concurrent calls from rapid re-renders or multiple triggers
  const inFlightRef = useRef(false)
  // track which year docs we've attempted to seed this session (avoid redundant reads)
  const seededYearsRef = useRef<Set<string>>(new Set())

  const buildYearSeed = (yearNum: number) => {
    const months: Record<string, number> = {}
    for (let m = 1; m <= 12; m++) {
      const k = `${yearNum}-${String(m).padStart(2, '0')}`
      months[k] = 0
    }
    return months
  }

  const addToStatistics = useCallback(async () => {
    if (inFlightRef.current) return
    if (!statFlags[flagName]) return

    inFlightRef.current = true
    try {
      process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
        console.log('Adding to statistics', flagName)

      // Calculate year/month on each run (handles year transitions correctly)
      const now = new Date()
      const year = `${now.getFullYear()}-next`
      const monthKey = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, '0')}`

      const docRef = doc(db, year, docName)

      // If we haven't seeded this year yet in this session, check existence once.
      if (!seededYearsRef.current.has(year)) {
        const snap = await getDoc(docRef)
        if (!snap.exists()) {
          // Seed all months with 0 so historical queries always find keys.
          await setDoc(docRef, {
            total_visits: 0, // will be incremented immediately after
            monthly_visits: buildYearSeed(now.getFullYear()),
          })
        }
        seededYearsRef.current.add(year)
      }

      // Increment totals (merge so we don't overwrite seeded structure)
      await setDoc(
        docRef,
        {
          total_visits: increment(1),
          monthly_visits: { [monthKey]: increment(1) },
        },
        { merge: true }
      )

      // Turn off the flag (functional update to avoid stale merges)
      setStatFlags((prev) => ({ ...prev, [flagName]: false }))
    } catch (err) {
      console.error('Error adding to statistics', err)
    } finally {
      inFlightRef.current = false
    }
  }, [docName, flagName, statFlags, setStatFlags])

  return addToStatistics
}
