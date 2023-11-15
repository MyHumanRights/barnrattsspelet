import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'
import { useStatsContext } from '@/contexts/StatsContext'
import { db } from '@/utils/firebase'

const YEAR = new Date().getFullYear().toString()

export const useAddToStatistics = (docName, flagName) => {
  const { statFlags, setStatFlags } = useStatsContext()

  const addToStatistics = async () => {
    if (!statFlags[flagName]) return

    try {
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
        await setDoc(docRef, {
          total_visits: 1,
          monthly_visits: {
            [getCurrentMonth()]: 1,
          },
        })
      }
      setStatFlags({ ...statFlags, [flagName]: false })
    } catch (err) {
      // TODO: Handle error
    }
  }

  return addToStatistics
}

const getCurrentMonth = () => {
  const now = new Date()
  const year = now.getFullYear()
  const month = `${now.getMonth() + 1}`.padStart(2, '0')
  return `${year}-${month}`
}
