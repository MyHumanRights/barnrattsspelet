import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'

import { useStatsContext } from '@/contexts/StatsContext'
import { STAT_COLLECTION_NAMES, STAT_FLAGS } from '@/utils/constants'
import { db } from '@/utils/firebase'

import { createYearlyCollections } from '../createYearlyCollection'

// import { createYearlyCollections } from '../createYearlyCollection'

const YEAR = new Date().getFullYear().toString() + '-next'

export const useAddToStatistics = (
  docName: STAT_COLLECTION_NAMES,
  flagName: STAT_FLAGS
) => {
  const { statFlags, setStatFlags } = useStatsContext()

  const addToStatistics = async () => {
    if (!statFlags[flagName]) return

    try {
      process.env.NEXT_PUBLIC_APP_ENV !== 'production' &&
        console.log('Adding to statistics', flagName)

      // Ensure the yearly collections and monthly documents are created
      await createYearlyCollections(YEAR)

      // Proceed with adding statistics
      const docRef = doc(db, YEAR, docName)
      const docSnap = await getDoc(docRef)

      if (docSnap.exists()) {
        const { total_visits, monthly_visits } = docSnap.data()
        const currentMonth = getCurrentMonth()

        await updateDoc(docRef, {
          total_visits: total_visits + 1,
          [`monthly_visits.${getCurrentMonth()}`]:
            (monthly_visits[currentMonth] || 0) + 1,
        })
      } else {
        // This case should not occur if createYearlyCollections works correctly,
        // but we handle it just in case.
        await setDoc(docRef, {
          total_visits: 1,
          monthly_visits: {
            [getCurrentMonth()]: 1,
          },
        })
      }
      // Update the context flag to prevent multiple increments
      setStatFlags({ ...statFlags, [flagName]: false })
    } catch (err) {
      console.error('Error adding to statistics', err)
    }
  }

  return addToStatistics
}

const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  return `${year}-${month}` // e.g. 2024-01
}
