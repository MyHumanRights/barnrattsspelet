import { doc, setDoc, increment } from 'firebase/firestore/lite'
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

  const addToStatistics = useCallback(async () => {
    if (inFlightRef.current) return
    if (!statFlags[flagName]) return

    inFlightRef.current = true
    try {
      process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
        console.log('Adding to statistics', flagName)

      // Beräkna år/månad vid varje körning (hanterar årsskifte korrekt)
      const now = new Date()
      const year = `${now.getFullYear()}-next`
      const monthKey = `${now.getFullYear()}-${String(
        now.getMonth() + 1
      ).padStart(2, '0')}`

      const docRef = doc(db, year, docName)

      // En enda skrivning – funkar både om dokumentet finns eller inte
      await setDoc(
        docRef,
        {
          total_visits: increment(1),
          [`monthly_visits.${monthKey}`]: increment(1),
        },
        { merge: true }
      )

      // Stäng av flaggan (funktionell update för att undvika stale merges)
      setStatFlags((prev) => ({ ...prev, [flagName]: false }))
    } catch (err) {
      console.error('Error adding to statistics', err)
      // Låt en senare retry få försöka igen
      setStatFlags((prev) => ({ ...prev, [flagName]: true }))
    } finally {
      inFlightRef.current = false
    }
  }, [docName, flagName, statFlags, setStatFlags])

  return addToStatistics
}
