import { useContext } from 'react'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore/lite'
import StatsContext from '../StatsContext'
import { db } from '../../firebase'

const YEAR = new Date().getFullYear().toString()

const useAddToStatistics = (docName, flagName) => {
  const { statFlags, setStatFlags } = useContext(StatsContext)

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

export default useAddToStatistics
